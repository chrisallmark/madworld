export function getAudioElement(id: string): HTMLAudioElement | null {
  const el = document.getElementById(id);
  return el instanceof HTMLAudioElement ? el : null;
}
