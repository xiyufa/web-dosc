// `Object.prototype.toString`准确判断各种类型

const number = 1          // [object Number]
const string = '123'      // [object String]
const boolean = true      // [object Boolean]
const und = undefined     // [object Undefined]
const nul = null          // [object Null]
const obj = { a: 1 }         // [object Object]
const array = [1, 2, 3]   // [object Array]
const date = new Date()   // [object Date]
const error = new Error() // [object Error]
const reg = /a/g          // [object RegExp]
const func = function a() { } // [object Function]

console.log(Object.prototype.toString.call(Math)) // [object Math]
console.log(Object.prototype.toString.call(JSON)) // [object JSON]

function a() {
  console.log(Object.prototype.toString.call(arguments)) // [object Arguments]
}
a()


/**
 * 简单封装Object.prototype.toString
 * @param {*} obj 
 */
const type = obj => {
  const types = 'Boolean Number String Function Array Date RegExp Object Error Null'
  let class2type = {}

  // 生成class2type映射
  types.split(' ').map(item => {
    class2type[`[object ${item}]`] = item.toLowerCase()
  })

  // 在 IE6 中，null 和 undefined 会被 Object.prototype.toString 识别成 [object Object]
  if (obj == null) {
    return `${obj}`
  }

  return typeof obj === 'object' || typeof obj === 'function'
    ? class2type[Object.prototype.toString.call(obj)] || 'object'
    : typeof obj
}


console.log(type(undefined))