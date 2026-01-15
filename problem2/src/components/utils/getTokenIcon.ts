export function getTokenIcon(currency: string) {
  const tokenIconBaseUrl = import.meta.env.VITE_TOKEN_ICON_BASE_URL;
  return `${tokenIconBaseUrl}${currency}.svg`;
}
