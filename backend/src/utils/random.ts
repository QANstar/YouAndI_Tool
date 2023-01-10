export function randomNum (min = 0, max = 0, decimal = 0) {
  const minz = Math.trunc(min) // 最小值的整数部分
  const maxz = Math.trunc(max) // 最大值的整数部分
  // 判断是否存在小数部分，不存在的话为0
  const minx = isNaN(getDecimalNum(min)) ? 0 : getDecimalNum(min) // 最小值的小数部分
  const maxx = isNaN(getDecimalNum(max)) ? 0 : getDecimalNum(max) // 最大值的小数部分

  // 区分有小数和没小数的情况
  if (minx > 0 || maxx > 0 || decimal > 0) {
    // 整数部分随机数
    const z = parseInt((Math.random() * (maxz - minz + 1) + minz) as any, 10)
    // 小数部分随机数
    let x = 0
    // 小数部分随机数最大位数
    let maxDecimal =
      minx.toString().length > maxx.toString().length
        ? minx.toString().length
        : maxx.toString().length
    maxDecimal = decimal > maxDecimal ? decimal : maxDecimal
    // 判断随机出的整数部分，是否等于最小值或者最大值
    if (z === minz || z === maxz) {
      if (z === minz) {
        // 整数部分随机数等于最小值，那么应该从最小值的小数部分开始，到小数位数的最大值随机就可以
        x = parseInt(
          (Math.random() * (Math.pow(10, maxDecimal) - minx) + minx) as any,
          10
        )
      } else {
        // 整数部分随机数等于最大值，那么应该从0开始，到最大值小数部分
        x = parseInt((Math.random() * (maxx + 1)) as any, 10)
      }
    } else {
      // 整数部分在最大最小值区间的，就从0到小数位数的最大值随机就可以
      x = parseInt((Math.random() * Math.pow(10, maxDecimal)) as any, 10)
    }
    return Number(`${z}.${x}`)
  } else {
    return parseInt((Math.random() * (maxz - minz + 1) + minz) as any, 10)
  }
}

// 获取数值的小数部分
function getDecimalNum (data: any) {
  return Number(data.toString().split('.')[1])
}
