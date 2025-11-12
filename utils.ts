export function extrairId(url: string): string {
  const urlSemBarra = url.endsWith('/') ? url.slice(0, -1) : url;
  return urlSemBarra.split('/').pop() || '';
}
