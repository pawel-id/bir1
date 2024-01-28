import * as allTemplates from './templates'

export async function template(
  name: keyof typeof allTemplates,
  params: any = {}
) {
  return allTemplates[name](params)
}
