import crypto from 'crypto-js';
export function parseUrlComment(inputString) {
  const urlRegex = /(https?:\/\/[-\]_.~!*'();:@&=+$,/?%#[A-z0-9]+)/;
  const commentRegex = /[ ,](\/\/.*)/;

  // Extract URL
  const urlMatch = inputString.match(urlRegex);
  const url = urlMatch ? urlMatch[1] : '';

  // Extract comment
  const commentMatch = inputString.match(commentRegex);
  const comment = commentMatch ? commentMatch[1] : '';

  return { url, comment };
}

// Example usage:

async function getResourceContent(url) {
  const response = await fetch(url);
  const text = await response.text();
  return text;
}

function getHash(type, content) {
  let hash;
  if(type === 'sha256'){
    hash = crypto.SHA256(content, { outputLength: 256 });
  }
  if(type === 'sha384'){
    hash = crypto.SHA384(content, { outputLength: 384 });
  }
  if(type === 'sha512'){
    hash = crypto.SHA512(content, { outputLength: 512 });
  }
  return hash.toString(crypto.enc.Base64);
}

export async function getBase64HashFromUrl(types, url) {
  const content = await getResourceContent(url);
  return types.map(type => `${type}-${getHash(type, content)}`).join(' ');
}

function isStylesheet(url) {
  return url.indexOf('.css') > 0;
}

export function getResourceHTML(url, hash) {
  if (isStylesheet(url)) {
    return `<link href="${url}" rel="stylesheet" integrity="${hash}" crossorigin="anonymous" />`;
  } else {
    return `<script type="text/javascript" src="${url}" integrity="${hash}" crossorigin="anonymous"></script>`;
  }
}
export function getResourceIncludesHTML(url, hash) {
  const cf = "https://cdnjs.cloudflare.com/ajax/libs/";
  const maxcdn = "https://maxcdn.bootstrapcdn.com/";
  const jsdelivr = "https://cdn.jsdelivr.net/";
  const google = "https://maps.googleapis.com/";
  url = url.replace(cf,'{cf}').replace(maxcdn,'{maxcdn}').replace(jsdelivr,'{jsdelivr}').replace(google,'{google}');
  return `new []{$"${url}","${hash}"},`;
}

function readContentFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = reject;
    reader.onabort = reject;
    reader.readAsText(file);
  });
}

export async function getBase64HashFromFile(types, file) {
  const content = await readContentFromFile(file);
  return types.map(type => `${type}-${getHash(type, content)}`).join(' ');
}
