export function displayNameFromUrl(url: string): string {
  return url.slice(url.lastIndexOf("/") + 1).replace(/\.mp3$/, "");
}
