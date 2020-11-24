export const getStorage = () => {
  const keys = Object.keys(localStorage)
  const values = Object.values(localStorage)
  let localStorageArr = []
  for (let num in keys) localStorageArr.push({[keys[num]]: values[num]})
  return localStorageArr
}

export const getQuantity = () => {
  const values = Object.values(localStorage)
  const quantities = values
    .map(itemInBag => JSON.parse(itemInBag))
    .map(item => item.quantity)
  console.log('quantites', quantities)
  return quantities.reduce((accum, curr) => +accum + +curr)
}

export const getTotal = () => {}
