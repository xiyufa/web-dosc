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

- **1.1横向模糊匹配**

横向模糊指的是，一个正则可匹配的字符长度不是固定的，可以是很多种情况的,实现的方法时是使用量词。譬如`{m,n}`,表示连续出现最少m次，最多n次。

```javascript
const reg = /ab{2,5}c/g
const str = 'abc abbc abbbc abbbbc abbbbbc abbbbbbbc'

console.log(set.march(reg)) // ['abbc', 'abbbc', 'addddc', 'abbbbbc'] 
```

> 注意：案例中正则`/ab{2,5}c/g`,后面多了个`g`，它是正则的一个修饰符。表示全局匹配，既在目标字符串中按顺序找到满足匹配模式的所有子串，强调的是`所有`，而不是`第一个`。g是单词global的首字母。

- **1.2纵向模糊匹配**

纵向模糊指的是，一个正则匹配的字符串，具体到某一位时，它可以不是确定的字符，恶意有多种可能。譬如`[abc]`，表示该字符可以是字符“a”、“b”、“c”中的任意一个。

```javascript
const reg = /a[123]b/g
const str = 'a0b a1b a2b a3b a4b a5b'

console.log(str.march(reg)) // ['a1b', 'a2b', 'a3b']
```

#### 2. 字符组

- **2.1 范围表示法**

如果字符组里的字符特别多，可以使用范围表示法。

譬如：`[123456abcdefGHIJKLM]`，可以写成`[1-6a-fG-M]`。用连字符`-`来省略和简写。

因为连字符有特殊用途，那么要匹配`"a"`,`"-"`,`"z"`这三着中的任意一个，不能写成`[a-z]`，因为其表示小写字符中的任意一个字符。

可以写成如下方式：`[-az]`或`[az-]`或`[a\-z]`。即要么放在开头，要么放在结尾，要么转义。总之不能让引擎认为是范围表示法就行了。

- **2.2 排除字符组**

纵向模式匹配，还有一种情形就是，某位字符可以是任何东西，就是不能是"a"，"b"，"c"。

此时就是排除字符组（反义字符组）的概念。譬如`[^abc]`，表示一个除"a"，"b"，"c"之外的任意一个字符。字符的第一位放`^`(脱字符)，表示求反的概念。

当然，也有相应的范围表示法。

- **2.3 常见的简写形式**

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

- **3.1 简写形式**

`{m,}`表示至少出现m次。

`{m}`等价于`{m,m}`，表示出现m次。

`?`等价于`{0,1}`，表示出现或者不出现。

`+`等价于`{1,}`，表示出现至少一次。

`*`等价于`{0,}`，表示出现n次，有可能不出现。

- **3.2 贪婪匹配和惰性匹配**

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

- **2.1 ^和$**

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

- **2.2 `\b`和`\B`**

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

- **2.3 `(?=p)`和`(?!p)`**

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

- **1.1分组**

我们知道`/a+/`匹配连续出现的`a`，而要使用连续出现的`ab`，需要使用`/(ab)+/`。

其中括号提供了分组的功能，使量词`+`作用于`ab`这个整体。

```js
const reg = /(ab)+/g
let str = 'abab ab abababa'
console.log(str.march(reg)) // ['abab', 'ab', 'ababab']
```

- **1.2分支结构**

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

-  **2.1提取数据**

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

-  **2.2替换**

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

-  **3.1括号嵌套**

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

- **3.2 `\10`表示什么呢？**

```js
const res = /(1)(2)(3)(4)(5)(6)(7)(8)(9)(#) \10+/
const str = '123456789# #####'
console.log(reg.test(str)) // true
```

- **3.3引用不存在的分组**

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

- **5.1模拟字符串`trim`方法模拟**

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

- 将每个单词转成首字母大写	

```js
const titleize = str => {
    return str.toLowerCase().replace(/(^|\s)\w/g, str => {
        return str.toUpperCase()
    })
}

console.log(titleize('i love js')) // 'I Love Js'
```



##  4.正则表达式回溯法原理

正则表达式匹配字符串的这种方式，有个学名，叫回溯法。

回溯法也称试探法，它的基本思想是：从问题的某一种状态（初始状态）出发，搜索从这种状态出发所能达到的所有“状态”，当一条路走到“尽头”的时候（不能再前进），再后退一步或若干步，从另一种可能“状态”出发，继续搜索，直到所有的“路径”（状态）都试探过。这种不断“前进”、不断“回溯”寻找解的方法，就称作“回溯法”。（copy于百度百科）。

本质上就是深度优先搜索算法。**其中退到之前的某一步这一过程，我们称为“回溯”。**从上面的描述过程中，可以看出，路走不通时，就会发生“回溯”。即，**尝试匹配失败时，接下来的一步通常就是回溯。

####  1.贪婪量词

如`b{1,3}`，应为其的贪婪的。尝试可能的顺序是从多往少的方向尝试。首先会尝试`bbb`，然后在看整个正则是否匹配。不能匹配是，吐出一个`b`，即在`bb`的基础上，再继续尝试。如果不行，在吐出一个，再试。如果还是不行呢？只能说明匹配失败了。

####  1.贪婪量词

如果当多个贪婪量词挨着存在，并相互有冲突，则会深度优先搜索。

```js
let str = '12345'
let reg = /(\d{1,3})(\d{1,3})/
console.log(str.match(reg)) // ['12345', '123', '45', index: 0, input: '12345']
```

> 其中，前面的`\d{1,3}`匹配的是“123”，后面的`\d{1,3}`匹配的是“45”。



####  2.惰性量词

惰性量词就是在贪婪量词后面加个问号。表示尽可能少的匹配，如：

```js
let str = '12345'
let reg = /(\d{1,3}?)(\d{1,3})/
console.log(str.match(reg)) // ["1234", "1", "234", index: 0, input: "12345"]
```

> 其中，前面的`\d{1,3}`匹配的是“1”，后面的`\d{1,3}`匹配的是“234”。



##  5.正则表达式编程

内容包括：

1. 正则表达式的四种操作
2. 相关`API`注意要点



#### 1.正则表达式的四种操作

正则表达式是匹配模式，不管如何使用正则表达式，万变不离其宗，都需要先“匹配”。

有了匹配这一基本操作后，才有其他的操作：验证、切分、提取、替换。

- **1.1 验证**

>验证是正则表达式最直接的应用，比如表单验证。
>
>在说验证之前，先要说清楚匹配是什么概念。
>
>所谓匹配，就是看目标字符串里是否有满足匹配的子串。因此，“匹配”的本质就是“查找”。
>
>有没有匹配，是不是匹配上，判断是否的操作，即称为“验证”。

如：判断一个字符串是否有数字。

- **使用`search`**

```js
const reg = /\d/
const str = 'abc123'
console.log(!!str.search(reg)) // true
```

- **使用`test`**

```js
const reg = /\d/
const str = 'abc123'
console.log(reg.test(str)) // true
```

- **使用`match`**

```js
const reg = /\d/
const str = 'abc123'
console.log(!!str.match(reg)) // true
```

- **使用`exec`**

```js
cosnt reg = /\d/
const str = 'abc123'
console.log(!!reg.exec(str)) // true
```

其中最常用的是`test`。

-  **1.2切分**

> 所谓“切分”，就是把目标字符串，切成一段一段的。在`JS`中只用的是`split`。

如：目标字符串`css, html, js`，按逗号来切分

```js
let reg = /,/
let str = 'css, html, js'
console.log(str.split(reg)) //["css", " html", " js"]
```

-  **1.3 提取**

如：时间提取年月日

- **`match`**

```js
let reg = /^(\d{4})\D(\d{2})\D(\d{2})$/
let str = '2020-06-08'
console.log(str.match(reg)) // ["2020-06-08", "2020", "06", "08", index: 0, input: "2020-06-08", groups: undefined]
```

- **`exec`**

```js
let reg = /^(\d{4})\D(\d{2})\D(\d{2})$/
let str = '2020-06-08'
console.log(reg.exec(reg)) // ["2020-06-08", "2020", "06", "08", index: 0, input: "2020-06-08", groups: undefined]
```

- **`test`**

```js
let reg = /^(\d{4})\D(\d{2})\D(\d{2})$/
let str = '2020-06-08'
reg.test(str)
console.log( RegExp.$1, RegExp.$2, RegExp.$3 )
```

- **`search`**

```js
let reg = /^(\d{4})\D(\d{2})\D(\d{2})$/
let str = '2020-06-08'
reg.search(str)
console.log( RegExp.$1, RegExp.$2, RegExp.$3 )
```

-  **`replace`**

```js
let reg = /^(\d{4})\D(\d{2})\D(\d{2})$/
let str = '2020-06-08'
let date = []
str.replace(reg, (match, year, month, day) => {
    date.push(year, month, day)
})
console.log(date) // ["2020", "06", "08"]
```

其中，最常用的是`match`

- **1.4 替换**

如：时间格式 `yyyy-mm-dd`替换成`yyyy/mm/dd`

```js
let str = '2020-06-08'
console.log(str.replace(/-/g, '/')) // '2020/06/08'
```

这里只是简单地应用了一下`replace`。但，`replace`方法是强大的，是需要重点掌握的。

####  2.相关API注意要点

从上面可以看出用于正则操作的方法，共有6个，字符串实例4个，正则实例2个：

>String#search
>
>String#split
>
>String#match
>
>String#replace
>
>RegExp#test
>
>RegExp#exec

本文不打算详细地讲解它们的方方面面细节，具体可以参考《JavaScript权威指南》的第三部分。本文重点列出一些容易忽视的地方，以飨读者。

- **2.1 `search`和`match`的参数问题**

> 我们知道字符串实例的那四个方法参数都支持正则和字符串。但`search`和`match`，会把字符串转换成正则。

```js
let str = '2020.06.08'

console.log(str.search('.')) // 0
console.log(str.search('\\.')) // 4
console.log(str.search(/\./)) // 4

console.log(str.match('.')) // ["2", index: 0, input: "2020.06.08", groups: undefined]
console.log(str.match('\\.')) // [".", index: 4, input: "2020.06.08", groups: undefined]
console.log(str.match(/\./)) // [".", index: 4, input: "2020.06.08", groups: undefined]

console.log(str.split('.')) // ["2020", "06", "08"]

console.log(str.replit('.', '/')) // "2020/06.08"
```

- **2.2 `match`返回结果的格式，与正则对象是否有修饰符`g`有关。**

```js
let str = '2020.06.08'
let reg1 = /\b(\d+)\b/
let reg2 = /\b(\d+)\b/g

console.log(str.match(reg1)) // ["2020", "2020", index: 0, input: "2020.06.08", groups: undefined]
console.log(str.match(reg2)) // ["2020", "06", "08"]
```

> 没有`g`，返回的是标准匹配格式，即，数组的第一个元素是整体匹配的内容，接下来是分组捕获的内容，然后是整体匹配的第一个下标，最后是输入的目标字符串。
>
> 有`g`，返回的是所有匹配的内容。
>
> 当没有匹配时，不管有无`g`，返回都为`null`。

- **2.3  `exec`比`match`更强大。**

```js
let str = '2020.06.08'
let reg2 = /\b(\d+)\b/g

console.log(regs.exec(str)) // ["2020", "2020", index: 0, input: "2020.06.08", groups: undefined]
cosnole.log(reg2.lastIndex) // 4
console.log(regs.exec(str)) // ["06", "06", index: 5, input: "2020.06.08", groups: undefined]
cosnole.log(reg2.lastIndex) // 7
console.log(regs.exec(str)) // ["08", "08", index: 8, input: "2020.06.08", groups: undefined]
cosnole.log(reg2.lastIndex) // 10
console.log(regs.exec(str)) // null
cosnole.log(reg2.lastIndex) // 0
```

其中正则实例`lastIndex`属性，表示下一次匹配开始的位置。

比如第一次匹配了“2017”，开始下标是0，共4个字符，因此这次匹配结束的位置是3，下一次开始匹配的位置是4。

从上述代码看出，在使用`exec`时，经常需要配合使用`while`循环：

```js
let str = '2020.06.08'
let reg2 = /\b(\d+)\b/g
let res

while(res = reg2.exec(str)) {
    console.log(res, reg2.lastIndex)
}
/*
["2020", "2020", index: 0, input: "2020.06.08", groups: undefined] 4
["06", "06", index: 5, input: "2020.06.08", groups: undefined] 7
["08", "08", index: 8, input: "2020.06.08", groups: undefined] 10
*/
```

- **2.4 修饰符`g`，对`exec`和`test`的影响**

>上面提到了正则实例的`lastIndex`属性，表示尝试匹配时，从字符串的`lastIndex`位开始去匹配。
>
>字符串的四个方法，每次匹配时，都是从开始的，即`lastIndex`属性始终不变。
>
>而正则实例的两个方法`exec`、`test`，当正则是全局匹配时，每一次匹配完成后，都会修改`lastIndex`。

```js
let reg = /a/g
console.log(reg.test('a'), reg.lastIndex) // true 0
console.log(reg.test('aba'), reg.lastIndex) // true 3
console.log(reg.test('ababc'), reg.lastIndex) // false 0
```

注意上面代码中的第三次调用`test`，因为这一次尝试匹配，开始从下标`lastIndex`即3位置处开始查找，自然就找不到了。

如果没有`g`，自然都是从字符串第0个字符处开始尝试匹配：

```js
let reg = /a/
console.log(reg.test('a'), reg.lastIndex) // true 0
console.log(reg.test('aba'), reg.lastIndex) // true 0
console.log(reg.test('ababc'), reg.lastIndex) // true 0
```

- **2.5 `test`整体匹配是需要使用`^`和`$`。**

```js
console.log(/123/.test('a123b')) // true
console.log(/^123$/.test('a123b')) // false
console.log(/^123$/.test('123')) // true
```

- **2.6 `split`相关注意事项**

  第一，它有第二个参数，表示结果字符数组的最大长度

```js
let str = 'html,css,js'
console.log(str.split(',', 2)) // ["html", "css"]
console.log(str.split(/,/, 1)) // ["html"]
```

​	第二，正则使用分组时，结果数组中是包含分隔符的：

```js
let str = 'html,css,js'
console.log(str.split(/(,)/)) // ["html", ",", "css", ",", "js"]
```

- **2.7 `replace`**

《JavaScript权威指南》认为`exec`是这6个API中最强大的，而我始终认为`replace`才是最强大的。因为它也能拿到该拿到的信息，然后可以假借替换之名，做些其他事情。

总体来说`replace`有两种使用形式，这是因为它的第二个参数，可以是字符串，也可以是函数。

当第二个参数是字符串时，如下的字符有特殊的含义：

>   `$1`,`$2`,...,`$99 `匹配第1~99个分组里捕获的文本
>
> `$&` 匹配到的子串文本
>
> $` 匹配到的子串左边的文本
>
> `$'`匹配到的子串右边文本
>
> `$$`美元符号

如：把“2,3,5”变成“5 = 2 + 3”

```js
let res = '2,3,5'.replace(/(\d+),(\d+),(\d+)/, '$3=$1+$2')
console.log(res) // "5=2+3"
```

把"2,3,5"，变成"222,333,555"

```js
let res = '2,3,5'.replace(/(\d+)/g, '$&$&$&')
console.log(res) // 222,333,555
```

把"5=2+3”变成"5=5=2+3=2+3"

```js
let res = '5=2+3'.replace(/=/, "$&$`$&$'$&")
console.log(res) // 5=5=2+3=2+3
```

当第二个参数是函数时，我们需要注意该回调函数的参数具体是什么：

```js
'1234 2345 3456'.replace(/(\d)\d{2}(\d)/g, (match, $1, $2, index, input) => {
    console.log([match, $1, index, input])
})
/*
["1234", "1", 0, "1234 2345 3456"]
["2345", "2", 5, "1234 2345 3456"]
["3456", "3", 10, "1234 2345 3456"]
*/

'1234 2345 3456'.replace(/(\d)\d{2}(\d)/g, (...arg) => {
    console.log([...arg])
})
/*
["1234", "1", "4", 0, "1234 2345 3456"]
["2345", "2", "5", 5, "1234 2345 3456"]
["3456", "3", "6", 10, "1234 2345 3456"]
*/
```

此时我们可以看到`replace`拿到的信息，并不比`exec`少。

- **2.8 使用构造函数需要注意的问题**

一般不推荐使用构造函数生成正则，而应该优先使用字面量。因为用构造函数会多写很多`\`。

```js
let string = "2017-06-27 2017.06.27 2017/06/27"
let regex = /\d{4}(-|\.|\/)\d{2}\1\d{2}/g
console.log( string.match(regex) ) // ["2017-06-27", "2017.06.27", "2017/06/27"]

regex = new RegExp("\\d{4}(-|\\.|\\/)\\d{2}\\1\\d{2}", "g")
console.log( string.match(regex) ) // ["2017-06-27", "2017.06.27", "2017/06/27"]

```

- **2.9 修饰符**

> `g` 全局匹配，即找到所有匹配的，单词是global
>
> `i` 忽略字母大小写，单词ingoreCase
>
> `m` 多行匹配，只影响`^`和`$`，二者变成行的概念，即行开头和行结尾。
>
> `u`用来正确处理大于`\uFFFF`的 Unicode 字符,Unicode 模式
>
> `y`与`g`修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。也就是“粘连”的涵义。
>
> `s`这被称为`dotAll`模式，即点（dot）代表一切字符。所以，正则表达式还引入了一个`dotAll`属性，返回一个布尔值，表示该正则表达式是否处在`dotAll`模式。

- **2.10 source属性**

正则实例对象属性，除了`global`、`ingnoreCase`、`multiline`、`lastIndex`属性之外，还有一个`source`属性。

比如，在构建动态的正则表达式时，可以通过查看该属性，来确认构建出的正则到底是什么：

```js
let className  = 'higt'
let reg = new RegExp(`(^|\\s)${className}(\\s$)`)
console.log(reg.source)
```

- **2.11构造函数属性**

构造函数的静态属性基于所执行的最近一次正则操作而变化。除了`$1`...`$99`之外，还有几个不太常用的属性（有兼用性问题）：

```js
`RegExp.input` 最近一次目标字符串，简写成`RegExp["$_"]`
`RegExp.lastMatch` 最近一次匹配的文本，简写成`RegExp["$&"]`
`RegExp.lastParen` 最近一次捕获的文本，简写成`RegExp["$+"]`
`RegExp.leftContext` 目标字符串中lastMatch之前的文本，简写成`RegExp["$`"]`
`RegExp.rightContext` 目标字符串中lastMatch之后的文本，简写成`RegExp["$'"]`
```

测试：

```js
let reg = /[abc](\d)/g
let str = 'a1b2c3d4f5'
str.match(reg)

console.log(RegExp.input) // a1b2c3d4f5
console.log(RegExp["$_"]) // a1b2c3d4f5

console.log(RegExp.lastMatch) // c3
console.log(RegExp["$&"]) // c3

console.log(RegExp.lastParen) // 3
console.log(RegExp["$+"]) // 3

console.log(RegExp.leftContext) // a1b2
console.log(RegExp["$`"]) // a1b2

console.log(RegExp.rightContext) // d4f5
console.log(RegExp["$'"]) // d4f5

```

