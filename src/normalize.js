const camelcase = require('camelcase')


function removePrefix(prefix) {
  const prefixLength = prefix.length
  return (param) => param.slice(prefixLength)

}

function normalize(object, normalizers) {
  const newObject = {}
  for (const param in object) {
    let newParam = param
    for(const normalizer of normalizers) {
      newParam = normalizer(newParam)
    }
    newObject[newParam] = object[param]
  }
  return newObject
}

module.exports = {
  normalize,
  camelcase,
  removePrefix,
}