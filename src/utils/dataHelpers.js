export const buildKeyDictionary = (rows = []) => {
  const keys = rows.reduce((acc, row) => {
    Object.keys(row ?? {}).forEach((key) => acc.add(key))
    return acc
  }, new Set())
  return Array.from(keys).reduce((acc, key) => {
    acc[key.toLowerCase()] = key
    return acc
  }, {})
}

export const resolveKey = (dictionary, candidates) => {
  for (const candidate of candidates) {
    const actual = dictionary[candidate.toLowerCase()]
    if (actual) return actual
  }
  return null
}

export const parseNumber = (value) => {
  if (value == null || value === '') return Number.NaN
  if (typeof value === 'number') return value
  const normalised = String(value).replace(/[^0-9,.-]/g, '').replace(',', '.')
  return Number.parseFloat(normalised)
}

export const formatUpdatedAt = (value) => {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date)
}
