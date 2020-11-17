export const getStorage = () => {
  const keys = Object.keys(localStorage)
  const values = Object.values(localStorage)
  let localStorageArr = []
  for (let num in keys) localStorageArr.push({[keys[num]]: values[num]})
  return localStorageArr
}

export const getQuantity = () => {
  const values = Object.values(localStorage)
  return values.reduce((accum, curr) => +accum + +curr)
}
