export function basename(path) {
  return path.replace(/.*\//, '');
}

export const objectMap = (obj, fn) =>
  Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => [k, fn(v, k, i)]
    )
  )

export const genericFields = [
    {
      name: 'hide', component: 'toggle', label: 'Hide', description: 'Hide this block from website'
    }
  ]