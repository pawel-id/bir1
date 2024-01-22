import * as allTemplates from '../templates';

const templates = new Map()

export async function template(name: keyof typeof allTemplates, params = {}) {
  if (!templates.has(name)) {
    templates.set(name, allTemplates[name]);
  }

  return templates.get(name)(params)
}
