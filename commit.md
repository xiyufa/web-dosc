# Commit message 编写指南
---

Git每次提交代码，都要写Commit message（提交说明），否者就不允许提交

```js
$ git commit -m 'hello world'
```

上面代码的`-m`参数，就是用来指定commit message 的。
如果一行不够，就可以执行 `git commit`，就会跳出文本编辑器，让你写多行

```js
$ git commit 
```

基本上，你写什么都行，但是，一般来说，commit message 应该清晰明了，说明本次提交的目的。

### 一、Commit message 的作用
---

格式化的commit message 有几个好处。
1. 提供更多的历史信息，方便快速预览

```js
$ git log <last tag> HEAD --pretty=format:%s
```
2. 可以过滤某些commit（比如文档改动），便于快速查找信息。

  比如下面的命令仅仅显示本次发布新增的功能。

```js
$ git log <last release> HEAD --grep feature
```

### 二、Commit message 的格式
---

每次提交，commit message 都包括三个部分：Header，Body和 Footer。

```js
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

其中 Header 是必须的，Bodt 和 Footer 可以省略。

#### 2.1 Header
---

Header部分只有一行，包括三个部分：`type`（必须），`scope`（可选）和`subject`（必须）。

1. **type**

  `type`用于说明commit的类别，只允许使用下面7个标识。

> - feat：新功能（feature）
> - fix：修补bug
> - docs：文档（documentation）
> - style：格式（不影响代码正常运行的变动）
> - refactor：重构（既不是新增功能，也不是修改代码的变动）
> - test：增加测试
> - chore：构建过程或辅助工具的变动

2. **scope**

  `scope`用于说明commit影响的范围，比如数据层，控制层，视图层等等，视项目不同而不同

3. **subject**

  `subject`是commit目的的简短描述，不超过50个字符。

> - 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
> - 第一个字母小写
> - 结尾不加句号（.）

#### 2.2 Body
---

Body部分是对本次提交的详细描述，可以分成多行。下面就是一个范例。

```
More detailed explanatory text, if necessary.  Wrap it to 
about 72 characters or so. 

Further paragraphs come after blank lines.

- Bullet points are okay, too
- Use a hanging indent
```

有两个注意点：

1. 使用第一人称现在时，比如`change`而不是`changed`或`changes`
2. 应该说明代码变动的动机，以及与以前代码的对比

#### 2.3 Footer
---

Footer部分只有两种情况。

1. 不兼容变动

如果当前代码与上个版本不兼容，则Footer部分以`BREAKING CHANGE`开头，后面是对变动的描述，以及变动理由和迁移方法。

```
BREAKING CHANGE: isolate scope bindings definition has changed.

    To migrate the code follow the example below:

    Before:

    scope: {
      myAttr: 'attribute',
    }

    After:

    scope: {
      myAttr: '@',
    }

    The removed `inject` wasn't generaly useful for directives so there should be no code using it.
```

2. 关闭Issue

如果当前commit针对每个issue，那么可以在Footer部分关闭这个issue。

```
Closes #234
```

也可以关闭多个issue

```
Closes #123; #234; #345
```

#### 2.4 Revert
---

还有一种特殊情况，如果当前commit用于撤销以前的commit，则必须以`revert:`开头，后面跟着被撤销Commit的Header

```
revert: feat(pencil): add 'graphiteWidth' option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

Body部分的格式是固定的，必须写成`This recerts commit &lt;hash>.`,其中的`hash`是被撤销commit的SHA标识符。
