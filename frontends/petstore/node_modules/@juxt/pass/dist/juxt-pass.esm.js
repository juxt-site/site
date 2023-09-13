// Generate a secure random string using the browser crypto functions
function generateRandomString() {
  const array = new Uint32Array(14);
  self.crypto.getRandomValues(array);
  return Array.from(array, dec => ("0" + dec.toString(16)).substring(-2)).join("");
}

// Calculate the SHA256 hash of the input text.
// Returns a promise that resolves to an ArrayBuffer
function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return self.crypto.subtle.digest("SHA-256", data);
}

// Base64-urlencodes the input string
function base64UrlEncode(str) {
  let bytes = Array.from(new Uint8Array(str));
  let base64 = window.btoa(String.fromCharCode.apply(null, bytes));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Return the base64-urlencoded sha256 hash for the PKCE
// challenge
async function pkceChallengeFromVerifier(v) {
  const hashed = await sha256(v);
  return base64UrlEncode(hashed);
}

async function authorizationCodeRequestInfo({
  authorization_endpoint,
  client_id,
  redirect_uri,
  requested_scopes
}) {
  const state = generateRandomString();
  const code_verifier = generateRandomString();
  const code_challenge = await pkceChallengeFromVerifier(code_verifier);
  const query_params = new URLSearchParams({
    response_type: "code",
    client_id,
    state,
    redirect_uri,
    code_challenge,
    code_challenge_method: "S256",
    ...(requested_scopes && requested_scopes.length && {
      scope: requested_scopes.join(" ")
    })
  });
  return {
    url: `${authorization_endpoint}?${query_params.toString()}`,
    state,
    code_verifier
  };
}
async function postMessageToWorker(obj) {
  const registration = await navigator.serviceWorker.ready;
  const serviceWorker = registration.active;
  serviceWorker?.postMessage(obj);
}
function exchangeCodeForAccessToken({
  query_params
}) {
  const storedState = localStorage.getItem("pkce_state");
  const queryParamState = query_params.get("state");
  const code = query_params.get("code");
  if (!code || !queryParamState) {
    console.log("No code or state in query params");
    return;
  }
  if (storedState !== queryParamState) {
    throw new Error("exchangeCodeForAccessToken mismatch between stored state and query param state");
  }
  const redirect_uri = localStorage.getItem("oauth2_redirect_uri") || "";
  const client_id = localStorage.getItem("oauth2_client_id") || "";
  const code_verifier = localStorage.getItem("pkce_code_verifier") || "";
  const payload_params = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirect_uri,
    client_id: client_id,
    code_verifier: code_verifier
  });
  const token_endpoint = localStorage.getItem("oauth2_token_endpoint") || "";
  fetch(token_endpoint, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    }),
    body: payload_params,
    credentials: "include"
  });
  window.close();
}
async function authorize(config) {
  // store config in service worker
  postMessageToWorker({
    type: "storeConfig",
    config
  });
  const {
    url,
    state,
    code_verifier
  } = await authorizationCodeRequestInfo(config);
  localStorage.setItem("pkce_state", state);
  localStorage.setItem("pkce_code_verifier", code_verifier);
  localStorage.setItem("oauth2_client_id", config.client_id);
  localStorage.setItem("oauth2_token_endpoint", config.token_endpoint);
  localStorage.setItem("oauth2_redirect_uri", config.redirect_uri);
  window.open(url);
}
async function registerOAuth2Worker() {
  await navigator.serviceWorker.register("/oauth-service-worker.js").then(() => {
    console.log("Service worker registered");
    // we need this as a workaround to the fact that the service worker doesn't kick in with a hard refresh
    !navigator.serviceWorker.controller && location.reload();
  }).catch(error => console.log("Service worker registration failed: ", error));
}

export { authorize, exchangeCodeForAccessToken, registerOAuth2Worker };
