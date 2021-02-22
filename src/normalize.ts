export function removePrefix(prefix: string) {
  const prefixLength = prefix.length
  return (param: string) =>
    param.startsWith(prefix) ? param.slice(prefixLength) : param
}
