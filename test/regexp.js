let reg = /(\d{4})-(\d{2})-(\d{2})/
let str = '2020-06-03'

let res = str.replace(reg, '$2/$3/$1')
// console.log(res)

res = str.replace(reg, (...arg) => {
  // console.log(arg)
  return `${RegExp.$2}/${RegExp.$3}/${RegExp.$1}`
})
// console.log(res) 


res = str.replace(reg, (str, year, month, day) => {
  return `${month}/${day}/${year}`
})
// console.log(res)


// reg = /\d{4}(-|\.|\/)\d{2}(-|\.|\/)\d{2}/
reg = /\d{4}(-|\.|\/)\d{2}\1\d{2}/
const str1 = '2020-06-03'
const str2 = '2020/06/03'
const str3 = '2020.06.03'
const str4 = '2020-06.03'

// console.log(reg.test(str1))
// console.log(reg.test(str2))
// console.log(reg.test(str3))
// console.log(reg.test(str4))

const regex = /\1\2\3\4\5\6\7\8\9/
// console.log(regex.test("\1\2\3\4\5\6\7\8\9")) // true
// console.log("\1\2\3\4\5\6\7\8\9".split(""))
/*
[
  '\x01', '\x02',
  '\x03', '\x04',
  '\x05', '\x06',
  '\x07', '8',
  '9'
]
*/

const trim = str => {
  return str.replace(/^\s*(.*?)\s*$/g, '$1')
}

// console.log(trim('    aa    ')) // 'aa'

const titleize = str => {
  return str.toLowerCase().replace(/(^|\s)\w/g, str => {
    return str.toUpperCase()
  })
}

console.log(titleize('i love js'))