// filter1进一步包装
export function filter(query: Item) {
  return {
    filter: filter1(query),
  }
}

// _eq查询预包装
export function filter1(query: Item) {
  const filter = {}
  Object.keys(query).forEach((key) => {
    filter[key] = { _eq: query[key] }
  })
  return filter
}

// _in查询预包装
export function filterIn(query: Item) {
  const filter = {}
  Object.keys(query).forEach((key) => {
    filter[key] = { _in: query[key] }
  })
  return filter
}
