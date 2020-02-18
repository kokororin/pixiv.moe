export default function getProxyImage(url) {
  return `https://api.pixiv.moe/v2/image/${url.replace(/^http?s:\/\//i, '')}`;
}
