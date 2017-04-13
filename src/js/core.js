/**
 * 存放所有的实例的集合，在每次通过某个DOM对象创建下拉组件前，会先在这里面找是否在对应的实例
 */
var instanceSet = [];

/**
 * 插件添加方法时，方法已经存在的提示，这个提示会在控制台输出
 */
var METHOD_EXISTS = '插件添加方法失败: 此方法已经存在';

/**
 * 支持的插件方法
 */
var PLUGIN_METHODS_SUPPORT = [
    'init',
    'rendercontext',
    'rendercontainer',
    'renderheader',
    'renderfooter',
    'renderbox',
    'renderitem'
];

/**
 * 插件的扩展方法集合
 */
var PLUGIN_METHODS = {};

// 初始化支持的扩展方法
(function() {
    for(var i = 0; i < PLUGIN_METHODS_SUPPORT.length; i++) {
        PLUGIN_METHODS[PLUGIN_METHODS_SUPPORT[i]] = [];
    }
})();

/**
 * 默认的创建下拉组件选项
 * 这里列出了所有可用的项
 * 这些项会被附加到 TinySelect上面,可以通过  TinySelect.defaults.xxx 来修改这些默认配置
 */
var defaultOption = {
    // 组件是否是只读的
    readonly: false,
    // 显示模式，可以设置的值为： dropdown(默认下拉模式), list(列表模式), popup(弹出模式)
    mode: mode_dropdown,
    // 是否支持键盘操作，默认为 true
    keyboard: true,
    // 附加的样式类名称
    css: null,
    // 下拉框容器的样式
    style: {
        // 这个行高是必须的，覆盖这些样式时，需要注意，
        // 其值需要是可以转换成整数的类型，因为下拉的项会使用这个作为默认的行高
        // 例外的情况：设置了项的行高(即下面的 item.line-height)
        lineHeight: '28px'
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
            // 此值表示在输入框经过指定时间后没有键盘输入时，触发过滤动作
            // 单位是毫秒，默认值为 618
            // 当 trigger 为change时有效
            // 设置这个是为了防止使用亚洲输入法时（比如：中文，日文等）时，文字输入中将字母上屏导致的事件触发
            delay: 618,
            // 过滤框的提示文字
            placeholder: '输入后按回车过滤',
            render: false,
            // 附加的样式类名称
            css: null,
            // 过滤框的样式
            style: {}
        },
        // 附加的样式类名称
        css: null,
        // 头部样式
        style: {}
    },
    // 下拉项容器
    box: {
        // 下拉列表没有数据时显示的文字
        empty: '没有数据',
        // 数据项的布局方式
        // 可设置的值有： list(列表布局，默认值), grid(网格布局), table(表格布局)
        layout: layout_list,
        // 附加的样式类名称
        css: null,
        // 下拉项容器的样式
        style: {}
    },
    // 数据项分组设置
    group: {
        // 默认的分组id字段，如果数据项有这个字段，表示这是一个分组项
        // 修改这个值可以避免字段名称与原始数据的字段名称冲突
        // 注意：分组字段是组件自动生成的
        id: '_group_id_',
        // 数据是分组项的标记字段，有这个字段表示数据项是一个分组项
        // 修改这个值可以避免字段名称与原始数据的字段名称冲突
        flag: '_group_item_',
        // 分组值字段
        // 也就是分组的依据字段
        // 值为 false 时不分组
        valueField: false,
        // 分组文本字段，不设置时使用 valueField
        // 相同的 valueField 而 textField不同时，只会取第一个 textField的值
        textField: false,
        // 数据项不包含指定的 valueField字段时的分组名称
        unknown: '未分组',
        // 分组的渲染器
        render: false,
        // 附加的样式类名称
        css: null,
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
        // render: function(itemdata, index, data, ts){}  this 指向即将渲染的网页元素对象。
        // itemdata:这一项的数据 
        // index: 这一项数据的索引
        // data:下拉的所有数据
        // 设置为false 禁用渲染器
        render: false,
        // 是否在数据项比设定的 visible 多时使用异步渲染(true)，
        // 在数据较多时建议设置为true，以避免大量的dom操作阻塞页面执行
        async: true,
        // 附加的样式类名称
        css: null,
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
        // 附加的样式类名称
        css: null,
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
        // 附加的样式类名称
        css: null,
        // 多选结果的样式
        style: {}
    }
};

/**
 * 根据上下文DOM元素初始化下拉框，如果已经初始化过了，那就返回对应的实例对象
 *
 * @param {jQuery|String|HtmlElement} selector 用来创建下拉组件的上下文DOM元素
 * @param {Object|Array} option 选项或数据
 * @param {Boolean} multi 是否可以多选，true为可多选，false为仅单选(默认);仅当option为数组时此参数有效
 * @return {TinySelect} 下拉实例
 */
function TinySelect(selector, option, multi) {
    // 取第一个DOM对象
    var context = $(selector).get(0);

    // 取不到DOM对象，就放弃，不创建下拉组件了
    if(!context) {
        return;
    }

    // 声明一个对象来存放下拉组件的实例，不管实例是否存在，都会用到这个
    var instance;

    // 遍历实例集合，看看有这个context有没有对应的下拉组件
    for(var i = 0; i < instanceSet.length; i++) {
        instance = instanceSet[i];
        // 找到了通过这个context创建的下拉组件，返回这个下拉组件
        if(instance.context.get(0) === context) {
            return instance;
        }
    }
    // 创建下拉组件
    instance = new TinySelect.fn.init(context, option, multi);

    // 将创建的下拉组件放到实例集合中，以方便实例的查找
    // 查找：前面通过遍历这个集合，查找context对应的实例部分
    instanceSet.push(instance);

    // 返回实例
    return instance;
}

/**
 * 添加原型方法
 */
TinySelect.fn = TinySelect.prototype = {
    constructor: TinySelect,

    /**
     * 初始化函数，用来创建创建下拉实例
     *
     * @param {HtmlElement} context 下拉的上下文DOM元素，下拉将在这个元素的上方或下方显示
     * @param  {Object|Array} option 选项或数据
     * @param {Boolean} multi 是否可以多选，true为可多选，false为仅单选(默认);仅当option为数组时此参数有效
     * @return {TinySelect} 新的实例
     */
    init: function(context, option, multi) {
        // 保存实例对象到变量里面
        var ts = this;

        // 如果传的是一个数组，那么就使用默认的选项，
        // 并且将这个数组设为下拉的数据源
        if($.isArray(option)) {
            ts.option = $.extend(true, {}, defaultOption, {
                item: {
                    data: option
                },
                result: {
                    multi: multi
                }
            });
        } else {
            // 传的是对象，那么合并选项参数
            ts.option = $.extend(true, {}, defaultOption, option);

            // 显示模式
            var mode = ts.option.mode || mode_dropdown;
            if(support_mode.indexOf(mode) === -1) {
                throw new Error('Render mode "' + mode + '" is not supported,\nhere is the valid modes:' + support_mode.join());
            }

            // 布局模式
            var layout = ts.option.layout || layout_list;
            if(support_layout.indexOf(layout) === -1) {
                throw new Error('Item layout "' + layout + '" is not supported,\nhere is the valid modes:' + support_layout.join());
            }
        }

        // DOM上下文
        ts.context = $(context);

        // 根据context的name属性创建隐藏域
        createHiddenField(ts);

        // 渲染上下文DOM元素
        renderContext(ts);

        // 初始化事件集合
        ts.events = {};

        // 创建DOM结构
        createDOM(ts);

        // 绑定事件
        bindEvent(ts);

        // 渲染项
        ts.load(ts.option.item.data, function(data) {
            // 这里搞了个回调，以在所有项渲染完成后触发组件的ready 事件
            emitEvent(ts, evt_ready, {
                data: data
            });
        });

        // 返回实例对象
        return ts;
    }
};

TinySelect.fn.init.prototype = TinySelect.fn;
/**
 * 默认配置项，可以在加载时修改
 */
TinySelect.defaults = defaultOption;

/**
 * 给TinySelect添加一个静态的函数 extend，用于插件扩展
 */
Object.defineProperty(TinySelect, 'extend', {
    // 一旦定义了就不准改了
    configurable: false,
    /**
     * extend 配置为函数，通过 TinySelect.extend 调用
     * @param {Object} extension 扩展，这是一个对象，如：
     * TinySelect.extend({
     *     xxxx: function(){
     *     
     *     }
     * });
     * 这样就给TinySelect的实例添加了一个方法  xxxx，
     * 然后就可以通过  ts.xxxx() 来调用
     */
    value: function(extension) {
        $.each($.extend(true, {}, extension), function(name, fn) {
            // 插件方法
            if(PLUGIN_METHODS.hasOwnProperty(name)) {
                PLUGIN_METHODS[name].push(fn);
                return;
            }

            // 插件自定义方法
            // 检查方法是否存在
            if(this.hasOwnProperty(name)) {
                // 方法存在，插件不能添加这个方法
                console.error(METHOD_EXISTS);
                // 既然不能添加，那就直接返回吧
                return;
            }

            // 添加扩展方法到原型对象上头
            TinySelect.fn[name] = fn;
        });
    }
});

/**
 * 设置TinySelect到window对象上面
 */
window.tinyselect = TinySelect;