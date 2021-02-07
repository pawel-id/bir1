const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')

const templates = new Map()

async function template(name, params = {}) {
  if (!templates.has(name)) {
    const templateSrc = await fs.promises.readFile(
      path.join(__dirname, 'templates', `${name}.xml`),
      'utf8'
    )
    templates.set(name, handlebars.compile(templateSrc))
  }

  return templates.get(name)(params)
}

module.exports = {
  template
}