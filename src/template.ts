import fs from 'fs'
import path from 'path'
import handlebars from 'handlebars'

// import { fileURLToPath } from 'url'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

const templates = new Map()

export async function template(name: string, params = {}) {
  if (!templates.has(name)) {
    const templateSrc = await fs.promises.readFile(
      path.join(__dirname, '..', 'templates', `${name}.xml`),
      'utf8'
    )
    templates.set(name, handlebars.compile(templateSrc))
  }

  return templates.get(name)(params)
}
