export const generateHash = (length: number = 31): string => {
  const array = new Uint8Array(length / 2)
  window.crypto.getRandomValues(array)
  return Array.from(array, (byte) => ('0' + byte.toString(16)).slice(-2))
    .join('')
    .slice(0, length)
}
