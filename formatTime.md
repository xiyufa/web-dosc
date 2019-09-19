# 格式化时间

```javaScript
  'use strict'

class Datas {
  // 格式化时间
  formatTime(number, format) {
    let formateArr = ['Y', 'M', 'D', 'h', 'm', 's', 'd'];
    let returnArr = [];
    let date = new Date(number);
    returnArr.push(date.getFullYear());
    returnArr.push(this.formatNumber(date.getMonth() + 1));
    returnArr.push(this.formatNumber(date.getDate()));
    returnArr.push(this.formatNumber(date.getHours()));
    returnArr.push(this.formatNumber(date.getMinutes()));
    returnArr.push(this.formatNumber(date.getSeconds()));
    returnArr.push(date.getDay())

    for (let i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
  }

  // 获取近七天的时间
  sevenDays(number, format) {
    let arr = []
    let date = number
    for (let i = 0; i < 7; i++) {
      date = new Date(new Date(number).getTime() - i * 24 * 60 * 60 * 1000)

      arr.push(this.formatTime(date, format))
    }
    return arr
  }

  // 返回星期几
  getWeek(number, format) {
    const weeks = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    let arr = this.sevenDays(number, format)
    let value = []
    arr.forEach(item => {
      let num = item.charAt(item.length - 1)
      value.push(weeks[num])
    })
    // 返回指定要求的样式【昨天，前天，周...】
    value.splice(0, 3, '今天', '昨天', '前天')
    return value
  }

  // 补0
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

}

const dates = new Datas()

export default  dates
```