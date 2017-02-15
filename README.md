# TinySelect

TinySelect 是一个以灵活为目标的WEB下拉组件。旨在通过灵活的接口和用法，适应各种不同的场景

- 单选/多选

- 提供过滤框以通过关键字简单过滤数据

- 编程显示/隐藏下拉框

- 编程过滤数据，可以是关键字或函数

- 持`select`、`unselect`和`ready`事件

- 支持设置初始值

- 支持后加载数据/重新加载数据

- 编程设置下拉组件只读属性

- 丰富的初始化选项，并且可以通过选项设置样式

- 提供多种渲染器的自定义支持，如：下拉项，header，footer和选中结果

- 可以设置部分数据的显示模板

- 支持数据项的异步渲染

## 快速上手/Quick Start

将`dist`目录复制到你的项目中，然后在页面上添加引用

```html
<link rel="stylesheet" type="text/css" href="dist/tinyselect.css" />
<script type="text/javascript" src="dist/tinyselect.js" />
```

HTML结构
```html
<div id="tinyselectcontext"></div>
```

数据
```javascript
var data = [{
    "id": 0,
    "text": "一月"
    }, {
        "id": 1,
        "text": "二月"
    }, {
        "id": 2,
        "text": "三月"
    }, {
        "id": 3,
        "text": "四月"
    }, {
        "id": 4,
        "text": "五月"
    }, {
        "id": 5,
        "text": "六月"
    }, {
        "id": 6,
        "text": "七月"
    }, {
        "id": 7,
        "text": "八月"
    }, {
        "id": 8,
        "text": "九月"
    }, {
        "id": 9,
        "text": "十月"
    }, {
        "id": 10,
        "text": "十一月"
    }, {
        "id": 11,
        "text": "十二月"
}];
```

### 最简单的用法

```javascript
var ts = tinyselect('#tinyselectcontext', data);
```

### 加点选项的用法

```javascript
var ts = tinyselect('#tinyselectcontext', {
    css: 'custom-css-list',
    style:{
        width: 400
    },
    item:{
        data: data,
        render: function(data, index){
            return (index + 1) + ':' + data.text;
        }
    }
});
```
这里指定了自定义的样式类`custom-css-list`，这个类会被附加到下拉组件的顶层容器上，可以通过`.tinyselect-container.custom-css-list`这样的方式来重写样式。

更多用法，请看[示例](https://hyjiacan.oschina.io/tinyselect/examples/)。

## 选项/Option

默认的创建下拉组件选项。这里列出了所有可用的项，这些项会被附加到`TinySelect`上面,可以通过修改`tinyselect.defaultOption` 来改变这些默认配置，如： `tinyselect.defaultOption.result.multi = true` 这样的写法会让页面内之后创建的下拉组件都默认启用多选模式。

```javascript
{
    // 附加的样式类名称
    css: null,
    // 组件是否是只读的
    readonly: false,
    // 是否以列表显示，true表示以列表模式显示，false以下拉模式显示
    aslist: FALSE,
    // 下拉框容器的样式
    style: {
        // 咋？弹出位置搞个绝对定位你有意见？
        position: 'absolute',
        // 这个行高是必须的，覆盖这些样式时，需要注意，
        // 其值需要是可以转换成整数的类型，因为下拉的项会使用这个作为默认的行高
        // 例外的情况：设置了项的行高(即下面的 item.line-height)
        lineHeight: '28px',
        // 默认不显示下拉框
        display: 'none'
    },
    // 下拉框的头部
    header: {
        // 头部渲染器，其this上下文就是其DOM对象，
        // 直接操作这个对象来改变头部
        // 这个是在执行完其初始化，添加到容器前调用的
        render: false,
        // 过滤框
        filter: {
            // 触发过滤的动作，可以设置为 change 或 enter(默认)。
            // 为change时，输入有变化时执行
            // 为enter时，按下回车时执行
            trigger: 'enter',
            // 过滤框的提示文字
            placeholder: '请输入关键字',
            // 过滤框的样式
            style: {}
        },
        // 头部样式
        style: {}
    },
    // 下拉项容器
    box: {
        // 下拉列表没有数据时显示的文字
        empty: '没有数据',
        // 下拉项容器的样式
        style: {}
    },
    // 下拉项
    item: {
        // 下拉项数据的数组，每一项需要对象结构的数据
        data: [],
        // 默认选中的项
        value: false,
        // 数据对象的值字段，在获取/设置值时，会使用这个字段
        valueField: 'id',
        // 数据对象的文本字段，下拉项的显示文字
        textField: 'text',
        // 可见项的数量，数据数量多余此值时出现滚动条
        visible: 5,
        // 下拉项的渲染器，使用返回值设置项的内容
        // render: function(itemdata, alldata){}  this 指向即将渲染的网页元素对象。
        // itemdata:这一项的数据  alldata:下拉的所有数据
        // 设置为false 禁用渲染器
        render: false,
        // 是否在数据项比设定的 visible 多时使用异步渲染(true)，
        // 在数据较多时建议设置为true，以避免大量的dom操作阻塞页面执行
        async: true,
        // 每一个下拉项的样式
        style: {}
    },
    // 下拉底部DOM
    footer: {
        // 底部渲染器，其this上下文就是其DOM对象，
        // 直接操作这个对象来改变底部
        // 需要注意的是，底部分了“左”、“右”两个区域，以放置不同的东西
        // 这个是在执行完其初始化，添加到容器前调用的
        render: false,
        /**
            * 下拉项数量
            */
        totalTpl: '共' + str_placeholder + '项',
        /**
            * 选中的下拉项数据
            */
        selectedTpl: '选中' + str_placeholder + '项/',
        // 底部的样式
        style: {}
    },
    result: {
        // 是否启用多选模式
        multi: false,
        // 渲染选中结果的渲染器，可以通过这个来改变选中结果的渲染
        render: false,
        // 多选结果展示方式，可以设置为 0（显示选中的数量，默认值） 或者 1（显示 选中的项列表）
        // 这是一个预留配置项
        type: 0,
        // 多选结果的样式
        style: {}
    }
};
```
注：以上选项中所有的`style`项可以使用所有的`css`样式，名称中有连字符的时候可以写成`font-size`或者`fontSize`。

## 接口/Method

TinySelect 提供了一组易用的操作接口。这些接口除了取值类的，其它都返回了下拉组件的实例，也就是说非取值类的接口可以进行链式调用。

### show(callback: Function) : TinySelect

显示下拉组件。

**callback** 下拉组件显示后的回调函数。这个回调函数没有参数，其上下文`this`对象指向下拉组件的弹出框DOM对象。

### hide(callback: Function) : TinySelect

隐藏下拉组件。

**callback** 下拉组件隐藏后的回调函数。这个回调函数没有参数，其上下文`this`对象指向下拉组件的弹出框DOM对象。

### value(value: Any, trigger: Boolean) : TinySelect|Any

设置/获取下拉组件的选中值。当传了参数时是设置值；不传参数时，是获取值，此时若是单选则返回选中的值，多选则返回选中的值的数组。

**value** 第一个参数是要设置的值，单选时传入单个值，多选时传入值数组。

**trigger** 是否触发事件。`true`触发，`false`不触发。在设置值时，如果希望结果框中显示设置的值，这个参数需要传入`true`。默认为`false`。

> 在初始化下拉组件后立即调用 `.value()` 设置值的时候，需要确保渲染已经完成，即事件`ready`已经被触发。

### filter(keyOrFn: String|Function, toggle: Boolean) : Array

根据关键字或函数过滤数据项。返回所有命中项的数据组成的数组。

**keyOrFn** 关键字或过滤器函数。当传入字符串的时候，会在下拉项中查找匹配的文本，若有匹配则返回这项的数据；传入函数时，通过函数的返回值决定是否命中（返回`true`表示命中），这个函数的上下文`this`对象是某一个下拉项的DOM对象，并且有一个参数`data`，`data`是这个数据项的数据。

**toggle** 是否切换显示状态，即隐藏未命中项，显示命中项。默认为`false`。

### clear() : TinySelect

清除下拉组件的选中项。

### load(data: Array) : TinySelect

加载数据，重新渲染下拉项，调用这个函数前的所有数据项都会在重新渲染前被清空。

**data** 组件会根据这个数据重新渲染所有的下拉项。

### readonly(readonly: Boolean) : Boolean|TinySelect

设置/获取下拉组件的只读模式。当传了参数时是设置模式，不传参数时为获取模式。

**readonly** 为`true`时设置下拉组件只读，为`false`取消下拉组件的只读模式；不传时为获取当前是否是只读模式。

### on(eventType: String, handler: Function) : TinySelect

绑定事件到下拉组件上。

**eventType** 事件类型名。，目前支持`select`,`unselect`,`ready`，传入其它值无效。

**handler** 事件的处理函数。详见下方 [事件][0] 部分

### off(eventType: String, handler: Function) : TinySelect

从下拉组件上取消事件的绑定。参数同上面的**on**函数。需要注意的是，在调用`off`的时候，`handler`需要是函数引用，这个函数引用应该与调用`on`的时候是同一个引用，所以，调用`on`时使用了匿名函数，那么在这里无法解除绑定。

## 事件

TinySelect 目前提供了三个事件：`select`, `unselect`, `ready`。

### select: Function

下拉项被选中时触发的事件。上下文`this`指向下拉组件，处理函数有一个参数`e`，其结构如下：

```javascript
{
    data: Object,
    index: Number,
    target: HtmlElement,
    type: String
}
```

，其中，`data`是下拉项的数据，`index`是下拉项的索引，`target`是下拉项的DOM元素，`type`是事件类型。

### select: Function

下拉项被取消选中时触发的事件。参数与用法与`select`事件相同。

### ready: Function

下拉组件的所有下拉项渲染完成后触发的事件，这个事件触发后表示下拉组件初始化已经完成，可以正常使用了。

> 在初始化下拉组件后立即调用 `.value()` 设置值的时候，需要确保渲染已经完成。

## 自定义样式/Custom Style

可以通过重写这些样式来实现不同的效果。

### 上下文元素

- tinyselect-context 用来创建下拉组件的元素
- tinyselect-context-result 存放选中结果的容器
- tinyselect-result-item 选中结果项
- tinyselect-result-item-text 选中结果项的文本
- tinyselect-result-item-link 选中结果项的移除按钮
- tinyselect-context-with-dropdown 带有下拉指示器时候的样式
- tinyselect-context-dropdown 下拉指示器
- tinyselect-readonly 下拉框处于只读模式的样式

### 弹出框

- tinyselect-container 下拉框最顶级容器
- tinyselect-empty 没有数据项时顶级容器的样式
- tinyselect-list-mode 下拉组件作为列表显示时的样式

#### 头部

- tinyselect-header 下拉框头部元素，过滤框就是放这里面的
- tinyselect-filter 下拉框的过滤输入框

#### 底部

- tinyselect-footer 下拉框底部元素
- tinyselect-footer-left 底部左侧容器
- tinyselect-footer-right 底部右侧容器
- tinyselect-count-total 底部右侧显示下拉项数量
- tinyselect-count-selected 底部右侧显示下拉项选中的数量

#### 下拉项

- tinyselect-box 下拉项的容器
- tinyselect-item 下拉项
- tinyselect-item-selected 下拉项选中状态
- tinyselect-item-before 下拉项文字前的元素
- tinyselect-item-text 下拉项文字元素
- tinyselect-item-after 下拉项文字后的元素