export function removePrefix(prefix: string) {
  const prefixLength = prefix.length
  return (param: string) =>
    param.startsWith(prefix) ? param.slice(prefixLength) : param
}

export function normalize(
  object: { [index: string]: any },
  normalizers: ((param: string) => string)[]
) {
  const newObject: { [index: string]: any } = {}
  for (const param in object) {
    let newParam = param
    for (const normalizer of normalizers) {
      newParam = normalizer(newParam)
    }
    newObject[newParam] = object[param]
  }
  return newObject
}
