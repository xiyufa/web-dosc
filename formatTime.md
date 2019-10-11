# 格式化时间
---

```js
class FormatDatas {
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
  
  // 补0
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

}

const format = new FormatDatas()

export default  format
```
