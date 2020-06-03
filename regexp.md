# 正则表达式

## 一、字符匹配

正则表达式是匹配模式，要么匹配字符，要么匹配位置。

然而关于正则如何匹配字符的学习，大部分人都觉得这块比较杂乱。

毕竟元字符太多了，看起来没有系统性，不好记。本章就解决这个问题。

内容包括：

1. 两种模糊匹配
2. 字符组
3. 量词
4. 分支结构



#### 1.两种匹配模式

- 1.1横向模糊匹配

横向模糊指的是，一个正则可匹配的字符长度不是固定的，可以是很多种情况的,实现的方法时是使用量词。譬如`{m,n}`,表示连续出现最少m次，最多n次。

```javascript
const reg = /ab{2,5}c/g
const str = 'abc abbc abbbc abbbbc abbbbbc abbbbbbbc'

console.log(set.march(reg)) // ['abbc', 'abbbc', 'addddc', 'abbbbbc'] 
```

> 注意：案例中正则`/ab{2,5}c/g`,后面多了个`g`，它是正则的一个修饰符。表示全局匹配，既在目标字符串中按顺序找到满足匹配模式的所有子串，强调的是`所有`，而不是`第一个`。g是单词global的首字母。

- 1.2纵向模糊匹配

纵向模糊指的是，一个正则匹配的字符串，具体到某一位时，它可以不是确定的字符，恶意有多种可能。譬如`[abc]`，表示该字符可以是字符“a”、“b”、“c”中的任意一个。

```javascript
const reg = /a[123]b/g
const str = 'a0b a1b a2b a3b a4b a5b'

console.log(str.march(reg)) // ['a1b', 'a2b', 'a3b']
```

#### 2. 字符组

- 2.1 范围表示法

如果字符组里的字符特别多，可以使用范围表示法。

譬如：`[123456abcdefGHIJKLM]`，可以写成`[1-6a-fG-M]`。用连字符`-`来省略和简写。

因为连字符有特殊用途，那么要匹配`"a"`,`"-"`,`"z"`这三着中的任意一个，不能写成`[a-z]`，因为其表示小写字符中的任意一个字符。

可以写成如下方式：`[-az]`或`[az-]`或`[a\-z]`。即要么放在开头，要么放在结尾，要么转义。总之不能让引擎认为是范围表示法就行了。

- 2.2 排除字符组

纵向模式匹配，还有一种情形就是，某位字符可以是任何东西，就是不能是"a"，"b"，"c"。

此时就是排除字符组（反义字符组）的概念。譬如`[^abc]`，表示一个除"a"，"b"，"c"之外的任意一个字符。字符的第一位放`^`(脱字符)，表示求反的概念。

当然，也有相应的范围表示法。

- 2.3 常见的简写形式

系统自带的简写形式

`\d`就是`[0-9]`。表示是一位数字

`\D`就是`[^0-9]`。表示除数字以外的任意字符。

`\w`就是`[0-9a-zA-Z_]`。表示数字、大小写字母和下划线。

`\W`是`[^0-9a-zA-Z_]`。非单词字符。

`\s`是`[ \t\v\n\r\f]`。表示空白符，包括空格、水平制表符、垂直制表符、换行符、回车符、换页符。

`\S`是`[^ \t\v\n\r\f]`。表示非空白符。

`.`就是`[^ \n\r\u2028\u2029]`。通配符，表示几乎任意字符。换行符、回车符、行分隔符和段分隔符除外。

> 匹配任意字符： `[\d\D]`、`[\s\S]`、`[\w\W]`、`[^]`。

#### 3. 量词

- 3.1 简写形式

`{m,}`表示至少出现m次。

`{m}`等价于`{m,m}`，表示出现m次。

`?`等价于`{0,1}`，表示出现或者不出现。

`+`等价于`{1,}`，表示出现至少一次。

`*`等价于`{0,}`，表示出现n次，有可能不出现。

- 3.2 贪婪匹配和惰性匹配

> 贪婪模式，它尽可能多的匹配。其中正则`/\d{2,5}/`,表示数字连续出现2到5次。

```javascript
let reg = /\d{2,5}/g
let str = '123 1234 12345 123456'
console.log(str.match(reg)) // ['123', '1234', '12345', '12345']
```

> 惰性匹配，它是匹配到就够了。其中正则`/\d{2,5}?/`,表示2到5次都行，当2个就够的时候，就不往下尝试了。通常在量词后面加个问好就能实现惰性配。

```js
let reg = /\d{2,5}?/g
let str = '123 1234 12345 123456'
console.log(str.match(reg)) // ['123', '1234', '12345', '12345']
```

#### 4.多选分支

一个模式可以实现横向和纵向的匹配。而多选分支可以支持多个子模式中的一个。

譬如：`(p1|p2|p3)`，其中`p1`、`p2`和`p3`是子模式。用`|`（管道符）分割。表示其中任意之一。

```js
let reg = /good|nice/g
lst str = 'good idea, nice try.'
console.log(reg.march(str)) // ['good', 'nice'] 
```

> 注意，用`/good|goodbey/`，去匹配`goodbey`字符串时，结果显示的是`good`

```js
let reg = /good|goodey/g
lst str = 'goodey'
console.log(reg.march(str)) // ['good']
```

> 把正则改成`/goodbey|good/`，结果是

```js
let reg = /goodbey|good/g
lst str = 'goodey'
console.log(reg.march(str)) // ['goodbey']
```

> 也就是说，分子结构也是惰性的，当前面的匹配上，后面的就不在尝试。





## 二、正则表达式位置匹配

正则表达式是匹配模式，要么匹配字符，要么匹配位置。请记住这句话。

然而大部分人学习正则时，对于匹配位置的重视程度没有那么高。

本章讲讲正则匹配位置的总总。

内容包括：

1. 什么是位置？

2. 如何匹配位置？

3. 位置的特性



#### 1.什么是位置？

> 位置是相邻字符间的位置。比如，下图中箭头所指的方向。

![png](./assets\regexp.png ':size=100')

#### 2.如何匹配位置呢？

在`es5`中，共有6个锚字符：

> `^`，`$`，`\b`，`\B`，`(?=p)`，`(?!p)`

- 2.1 ^和$

`^`（脱字符）匹配开头，在多行匹配中匹配行开头。

`$`（美元符号）匹配结尾，在多行匹配中匹配结尾。

> 如：字符串开头和结尾用”#“替换（位置可以替换字符！）

```js
let str = 'hello'.replace(/^|$/g, '#')
console.log(str) // '#hello#'
```

> 注意：多行匹配模式是，二者是行的概念

```js
let res = 'I\nlove\njavascript'.replace(/^|$/gm, '#')
console.log(res)
/*
#I#
#love#
#javascript#
*/
```

- 2.2 `\b`和`\B`

`\b`是单词边界，具体就是`\w`和`\W`之间的位置，也包括`\w`和`$`之间的位置，也包括`\w`和`^`之间的位置。

> 如：文件名`[JS] Lesson_01.mp4`中的`/b`

``` js
let res = '[JS] Lesson_01.mp4'.replace(/\b/g, '#')
console.log(res) // '[#JS#] #Lesson_01#.#mp4'
```

`\B`是非单词边界，具体说来就是`\w`与`\w`、`\W`与`\W`、`^`与`\W`，`\W`与`$`之间的位置。

> 如：文件名`[JS] Lesson_01.mp4`中的`/b`

``` js
let res = '[JS] Lesson_01.mp4'.replace(/\B/g, '#')
console.log(res) // '#[J#S]# L#e#s#s#o#n#_#0#1.m#p#4'
```

- 2.3 `(?=p)`和`(?!p)`

`(?=p)`，其中`p`是一个子模式，既`p`前面的位置。

> 如：`(?=l)`，表示`l`全面的位置。

```js
let res = 'hello'.replace(/(?=l)/g, '#')
console.log(res) // 'he#l#lo'
```

> 而`(?!p)`就是`(?=p)`的反面意思，如：

```js
let res = 'hello'.raplace(/(?!l)/g, '#')
console.log(res) // '#h#ell#o#'
```

二者的学名分别是`positive lookahead`和`negative lookahead`。中文翻译分别是正向先行断言和负向先行断言。

`ES6`中，还支持`positive lookbehind`和`negative lookbehind`。具体是`(?<=p)`和`(?<!p)`。

也有书上把这四个东西，翻译成环视，即看看右边或看看左边。

但一般书上，没有很好强调这四者是个位置。

比如`(?=p)`，一般都理解成：要求接下来的字符与`p`匹配，但不能包括`p`的那些字符。

而在本人看来`(?=p)`就与`^`一样好理解，就是`p`前面的那个位置。

####	3.位置的特性

对于位置的理解，我们可以理解成空字符`""`。

如：`"hello"`等价于如下形式

```js
"hello" == "" + "h" + "" + "e" + "" + "l" + "" + "l" + "o" + ""
```

也等价于：

```js
"hello" == "" + "" + "hello"
```

因此，把`/^hello$/`写成`/^^hello$$$/`，是没有任何问题的：

```js
var result = /^^hello$$$/.test("hello")
console.log(result) // true
```

甚至可以写成更复杂的:

```js
var result = /(?=he)^^he(?=\w)llo$\b\b$/.test("hello")
console.log(result) // true
```

- 不匹配任何东西的正则

  `/.^/`

- 数值的千位分割符

  比如把"12345678"，变成"12,345,678"。

  - 弄出最后一个逗号

    使用`(?=\d{3}$)`就可以做到：

    ```js
    let res = '12345678'.replace('/(?=\d{3}$)/g', ',')
    console.log(res) // '12345,678'
    ```

  - 弄出所有逗号

    使用`+`

    ```js
    let res = '12345678'.replace(/(?=(\d{3})+$)/g, ',')
    console.log(res) // '12,345,678'
    ```

  - 写完正则后，要多验证几个案例，此时我们会发现问题：

    ```js
    var result = "123456789".replace(/(?=(\d{3})+$)/g, ',')
    console.log(result); //",123,456,789"
    ```

    因为上面的正则，仅仅表示把从结尾向前数，一但是3的倍数，就把其前面的位置替换成逗号。因此才会出现这个问题。

  - 匹配非开头，`(?!^)`

    easy，`(?!^)`，你想到了吗？测试如下：

    ```js
    let string1 = "12345678"
    let string2 = "123456789"
    reg = /(?!^)(?=(\d{3})+$)/g
    
    var result = string1.replace(reg, ',')
    console.log(result) // "12,345,678"
    
    result = string2.replace(reg, ',')
    console.log(result) // "123,456,789"
    
    ```

  > 其他做法，`(?!^)`可以换成`(?!\b)`也可以换成`(?\B)`



##  3、正则表达式的括号

不管哪门语言中都有括号。正则表达式也是一门语言，而括号的存在使这门语言更为强大。

对括号的使用是否得心应手，是衡量对正则的掌握水平的一个侧面标准。

括号的作用，其实三言两语就能说明白，括号提供了分组，便于我们引用它。

引用某个分组，会有两种情形：在JavaScript里引用它，在正则表达式里引用它。

内容包括：

1. 分组和分支结构
2. 捕获分组
3. 反向引用
4. 非捕获分组



####   1.分组和分组结构

- 1.1分组

我们知道`/a+/`匹配连续出现的`a`，而要使用连续出现的`ab`，需要使用`/(ab)+/`。

其中括号提供了分组的功能，使量词`+`作用于`ab`这个整体。

```js
const reg = /(ab)+/g
let str = 'abab ab abababa'
console.log(str.march(reg)) // ['abab', 'ab', 'ababab']
```

- 1.2分支结构

而在多选分支结构`(p1|p2)`中，提供字表达是的所有可能。如：

```js
const reg = /^I love (JavaScript|Regular Expression)$/
console.log(reg.test('I love JavaScript'))  // true
console.log(reg.test('Regular Expression')) // true
```

> 如果去掉正则中的括号，即`/^I love JavaScript|Regular Expression$/`，匹配字符串是"I love JavaScript"和"Regular Expression"。

####  2.分组引用

如：日期格式为`yyyy-mm-dd`，写一个简单的正则

```js
const reg = /\d{4}-\d{2}-\d{2}/
```

括号版的:

```js
const reg = /(\d{4})-(\d{2})-(\d{2})/
```

-  2.1提取数据

如：提取年月日

```js
const reg = /(\d{4})-(\d{2})-(\d{2})/
const str = '2020-06-03'
console.log(str.match(reg)) // ["2020-06-03", "2020", "06", "03", index: 0, input: "2020-06-03", groups: undefined]
```

> `match`返回的是一个数组，第一个元素是整体匹配结果，然后是各个分组（括号里）匹配的内容，然后是匹配下标，最后是输入的文本。正则是否有修饰符`g`，`match`返回的结果是不一样的。

另外也可以使用正则对象的`exec`方法：

```js
const reg = /(\d{4})-(\d{2})-(\d{2})/
const str = '2020-06-03'
console.log(reg.exec(str)) // ["2020-06-03", "2020", "06", "03", index: 0, input: "2020-06-03", groups: undefined]
```

同时，也可以使用构造函数的全局属性`$1`和`$9`来获取：

```js
const reg = /(\d{4})-(\d{2})-(\d{2})/
const str = '2020-06-03'

reg.test(str) // 正则操作即可，例如
//regex.exec(string)
//string.match(regex)

console.log(RegExp.$1) // "2020"
console.log(RegExp.$2) // "06"
console.log(RegExp.$3) // "03"
```

-  2.2替换

如：把`yyyy-mm-dd`替换成`mm/dd/yyyy`

```js
const reg = /(\d{4})-(\d{2})-(\d{2})/
const str = '2020-06-03'

const res = str.replace(reg, '$2/$3/$1')
console.log(res) // "06/03/2020"
```

其中`replace`中的，第二个参数里用`$1`,`$2`,`$3`指带相应的分组，等价于：

```js
const reg = /(\d{4})-(\d{2})-(\d{2})/
const str = '2020-06-03'

const res = str.replace(reg, () => {
    return `${RegExp.$2}/${RegExp.$3}/${RegExp.$1}`
})
console.log(res) // "06/03/2020"
```

也等价于：

```js
const reg = /(\d{4})-(\d{2})-(\d{2})/
const str = '2020-06-03'

const res = str.replace(reg, (match, year, month, day) => {
    return `${month}/${day}/${year}`
})
console.log(res) // "06/03/2020"
```

####  3.方向引用

除了使用相应`API`来引用分组，也可以在正则本身里引用分组。但只能引用之前出现的分组，即反向引用。

如：写一个正则表达式支持以下三种格式：

>2020-06-03
>
>2020/06/03
>
>2020.06.03

```js
const reg = /\d{4}(-|\.|\/)\d{2}(-|\.|\/)\d{2}/
const str1 = '2020-06-03'
const str2 = '2020/06/03'
const str3 = '2020.06.03'

console.log(reg.test(str1)) // true
console.log(reg.test(str2)) // true
console.log(reg.test(str3)) // true
```

其中`/`和`.`需要转移，虽然匹配了要求的情况，但也匹配了`2020-06.03`这样的数据。

```js
const reg = /\d{4}(-|\.|\/)\d{2}\1\d{2}/
const str1 = '2020-06-03'
const str2 = '2020/06/03'
const str3 = '2020.06.03'
const str4 = '2020-06.03'

console.log(reg.test(str1)) // true
console.log(reg.test(str2)) // true
console.log(reg.test(str3)) // true
console.log(reg.test(str4)) // falsr
```

> 注意里面的`\1`，表示的引用之前的那个分组`(-|\.|\/)`。不管它匹配到什么（比如-），`\1`都匹配那个同样的具体某个字符。

-  3.1括号嵌套

以左括号（开括号）为准，如

```js
const reg = /^((\d)(\d(\d)))\1\2\3\4$/
const str = "1231231233"
console.log( regex.test(string) ) // true
console.log( RegExp.$1 ) // 123
console.log( RegExp.$2 ) // 1
console.log( RegExp.$3 ) // 23
console.log( RegExp.$4 ) // 3
```

- 3.2 `\10`表示什么呢？

```js
const res = /(1)(2)(3)(4)(5)(6)(7)(8)(9)(#) \10+/
const str = '123456789# #####'
console.log(reg.test(str)) // true
```

- 3.3引用不存在的分组

方向引用是引用前面的分组，在引用不存在的分组时，不会报错。只是匹配方向引用的字符本身。例如，`\2`就是匹配"\2"，注意"\2"是对"2"转意。

```js
const regex = /\1\2\3\4\5\6\7\8\9/
console.log(regex.test('\1\2\3\4\5\6\7\8\9')) // true
console.log('\1\2\3\4\5\6\7\8\9'.split('')) // ['\x01', '\x02','\x03', '\x04','\x05', '\x06','\x07', '8','9']
```

####  4.非捕获分组

之前文中出现的分组，都会捕获它们匹配到的数据，以便后续引用，因此也称他们是捕获型分组。

如果只想要括号最原始的功能，此时可以使用非捕获分组`(?:p)`：

```js
const res = /(?:ab)/g
const str = 'ababa abbb ababab'
console.log(str.march(res)) // ['abab', 'ab', 'ababab']
```

####  5.相关案例

- 5.1模拟字符串`trim`方法模拟

方案一： 匹配开始和结束的空白符，替换成空字符

```js
const trim = str => {
	return str.replace(/^\s+|\s+$/g, '')
}

console.log(trim('    aa    ')) // 'aa'
```

方案二：匹配整个字符串，然后用引用来提取相应的内容

```js
const trim = str => {
    return str.replace(/^\s*(.*?)\s*$/g, $1)
} 

console.log(trim('    aa    ')) // 'aa'
```

- 将每个单词转转成首字母大写	

```js
const titleize = str => {
    return str.toLowerCase().replace(/(^|\s)\w/g, str => {
        return str.toUpperCase()
    })
}

console.log(titleize('i love js')) // 'I Love Js'
```