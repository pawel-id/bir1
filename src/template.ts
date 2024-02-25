import * as allTemplates from './templates/index.js'

export async function template(
  name: keyof typeof allTemplates,
  params: any = {}
) {
  return allTemplates[name](params)
}
