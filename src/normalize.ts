export function removePrefix(prefix: string) {
  const prefixLength = prefix.length
  return (param: string) => param.slice(prefixLength)
}

export function normalize(
  object: { [index: string]: any },
  normalizers: Function[]
) {
  const newObject: { [index: string]: any } = {}
  for (const param in object) {
    let newParam: string = param
    for (const normalizer of normalizers) {
      newParam = normalizer(newParam)
    }
    newObject[newParam] = object[param]
  }
  return newObject
}
