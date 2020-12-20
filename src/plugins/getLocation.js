export function getLocation () {
  return new Promise((resolve, reject) => {
    let myCity = new BMap.LocalCity()
    myCity.get(result => {
      resolve(result.name)
    })
  })
}
