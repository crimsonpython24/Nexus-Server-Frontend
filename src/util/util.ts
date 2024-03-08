export async function getHash(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const buffer = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-512', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const uint8Array = new Uint8Array(hashArray);
  const numbersArray = Array.from(uint8Array);
  const base64String = btoa(String.fromCharCode.apply(null, numbersArray));

  const base64url = base64String
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  return base64url;
}

export async function sign(
  content: string,
  secretKey: string
): Promise<string> {
  const enc = new TextEncoder();
  const encoded = enc.encode(content);
  const encodedKey = enc.encode(secretKey);

  const key: CryptoKey = await crypto.subtle.importKey(
    'raw',
    encodedKey,
    { name: 'HMAC', hash: { name: 'SHA-512' } },
    true,
    ['sign', 'verify']
  );

  const hashBuffer = await crypto.subtle.sign('HMAC', key, encoded);
  const hashArray = new Uint8Array(hashBuffer);

  const hexString = Array.from(hashArray)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

  return hexString;
}
