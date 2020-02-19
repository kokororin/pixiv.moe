import config from '@/config';

export default function getProxyImage(url) {
  const regex = /^http?s:\/\/i\.pximg\.net/i;
  if (regex.test(url)) {
    return `${config.proxyImageURI}${url.replace(regex, '')}`;
  }
  return url;
}
