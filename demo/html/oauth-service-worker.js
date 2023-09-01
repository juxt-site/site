function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// to immediately install the service worker
addEventListener("install", (event) => {
  // install on all site tabs without waiting for them to be opened
  skipWaiting();
});

// to immediately activate the service worker
addEventListener("activate", (event) => {
  // activate on all tabs without waiting for them to be opened
  event.waitUntil(clients.claim());
});

// These Maps are indexed by the origin of the protected resource URLs.
// There will be one entry in each Map for each protected resource URL,
// which is provided by the user when calling the authenticate({...}) method.
const tokenExpirationStore = new Map();
const refreshTokenStore = new Map();
const tokenStore = new Map();
const configStore = new Map();

self.addEventListener("message", (event) => {
  console.log("EVENT", event);

  const type = event.data.type;

  switch (type) {
    case "storeConfig":
      configStore.set(event.data.config.origin, event.data.config);
      break;
    default:
      console.log("type:", type, "not handled");
  }
});

function refreshToken(configItem) {
  const refreshToken = refreshTokenStore.get(configItem.origin);

  const headers = new Headers();
  headers.set("Content-Type", "application/x-www-form-urlencoded");
  const body = new URLSearchParams();
  body.set("grant_type", "refresh_token");
  body.set("refresh_token", refreshToken);

  return fetch(configItem.token_endpoint, {
    method: "POST",
    headers,
    body,
  });
}

function createHeaders(headers, accessToken) {
  const newHeaders = new Headers(headers);
  // Only add the Authorization header if the user hasn't added a custom one for a given protected resource URL.
  if (!newHeaders.has("Authorization")) {
    newHeaders.set("Authorization", `Bearer ${accessToken}`);
    newHeaders.set("Accept", "text/html,application/json;q=0.4");
  }
  return newHeaders;
}

function getTimestampInSeconds() {
  return Math.floor(Date.now() / 1000);
}

async function handleTokenResponse(response, configItem) {

  const { access_token, refresh_token, expires_in } = await response.json();
  const { aud } = parseJwt(access_token);

  tokenStore.set(aud, access_token);

  refreshTokenStore.set(aud, refresh_token);

  tokenExpirationStore.set(aud, {
    expires_in,
    date: getTimestampInSeconds(),
  });
}

// This function intercepts all requests, but only handles those directed to the protected resource URLs.
// Particularly, it adds the Authorization header to the protected resource requests, a Bearer Token,
// and asks for a new token if the current one has expired before sending the request.
async function attachBearerToken(request, _clientId) {
  const { origin } = new URL(request.url);

  console.log("origin of request is ", origin);
  console.log("request is ", request);

  const referrer_origin = new URL(request.referrer).origin;

  const configItem = configStore.get(referrer_origin);

  console.log(configStore);

  if (!configItem || configItem.token_endpoint === request.url) {
    return request;
  }

  if (tokenStore.get(origin)) {
    const { expires_in, date } = tokenExpirationStore.get(origin);

    if (getTimestampInSeconds() - date > expires_in) {
      try {
        const response = await refreshToken(configItem);
        await handleTokenResponse(response, configItem);
      } catch (e) {
        console.err(
          "Something went wrong while trying to refetch the access token:",
          e
        );
      }
    }

    const headers = createHeaders(
      request.headers,
      tokenStore.get(origin)
    );

    return new Request(request, { headers });
  } else {
    return request;
  }
}

function isTokenEndpoint(url) {
  for (const [_, value] of configStore) {
    if (value.token_endpoint === url) {
      return value;
    }
  }
  return false;
}

// This function intercepts all responses, but only handles the ones from the token endpoint.
// It stores the access token, refresh token, and expiration date in the corresponding Maps in memory,
// and returns a new Response to the client without the body to avoid exposing the access token.
async function storeBearerToken(response) {
  const url = response.url;
  const configItem = isTokenEndpoint(url);

  if (!configItem) {
    return response;
  }

  await handleTokenResponse(response, configItem);

  return new Response({
    headers: response.headers,
    status: response.status,
    statusText: response.statusText,
  });
}

async function fetchWithBearerToken({ request, clientId }) {
  const newRequest =
    request instanceof Request ? request : new Request(request);
  const attachBearerTokenFn = await attachBearerToken(newRequest, clientId);
  return fetch(attachBearerTokenFn).then(storeBearerToken);
}

addEventListener("fetch", (event) => {
  try {
    event.respondWith(fetchWithBearerToken(event));
    console.log(tokenStore);
  } catch (error) {
    console.log(error);
  }
});

console.log("Adding event listener");
