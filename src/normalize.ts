export function lowercaseFirstLetter(name: string) {
  return name[0].toLowerCase() + name.slice(1)
}

export function stripPrefix(name: string, prefix: string) {
  if (name.startsWith(prefix)) {
    return name.slice(prefix.length)
  }
  return name
}