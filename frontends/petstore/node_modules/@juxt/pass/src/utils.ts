// Generate a secure random string using the browser crypto functions
export function generateRandomString(): string {
  const array = new Uint32Array(14);
  self.crypto.getRandomValues(array);
  return Array.from(array, (dec) =>
    ("0" + dec.toString(16)).substring(-2)
  ).join("");
}

// Calculate the SHA256 hash of the input text.
// Returns a promise that resolves to an ArrayBuffer
function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return self.crypto.subtle.digest("SHA-256", data);
}

// Base64-urlencodes the input string
function base64UrlEncode(str: ArrayBuffer): string {
  let bytes = Array.from(new Uint8Array(str));
  let base64 = window.btoa(String.fromCharCode.apply(null, bytes));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Return the base64-urlencoded sha256 hash for the PKCE
// challenge
export async function pkceChallengeFromVerifier(v: string) {
  const hashed = await sha256(v);
  return base64UrlEncode(hashed);
}
