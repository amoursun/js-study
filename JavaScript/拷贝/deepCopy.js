const isFunc = name => {
    return typeof name === 'function';
};
let class2type = {};
let toString = class2type.toString;
let hasOwn = class2type.hasOwnProperty;
function isPlainObject(obj) {
    let proto;
    let Ctor;
    if (!obj || toString.call(obj) !== '[object Object]') {
        return false;
    }
    proto = Object.getPrototypeOf(obj);
    if (!proto) {
        return true;
    }
    Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor === 'function' && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);
}

export function extend(...args) {
    // 默认不进行深拷贝
    let deep = false;
    let { name, options, src, copy, clone, copyIsArray } = {};
    let length = args.length;
    // 记录要复制的对象的下标
    let i = 1;
    // 第一个参数不传布尔值的情况下，target 默认是第一个参数
    let target = args[0] || {};
    // 如果第一个参数是布尔值，第二个参数是 target
    if (typeof target === 'boolean') {
        deep = target;
        target = args[i] || {};
        i++;
    }
    // 如果target不是对象，我们是无法进行复制的，所以设为 {}
    if (typeof target !== 'object' && !isFunc(target)) {
        target = {};
    }

    // 循环遍历要复制的对象们
    for (; i < length; i++) {
        // 获取当前对象
        options = args[i];
        // 要求不能为空 避免 extend(a,,b) 这种情况
        if (options !== null) {
            for (name in options) {
                // 目标属性值
                src = target[name];
                // 要复制的对象的属性值
                copy = options[name];

                // 解决循环引用
                if (target === copy) {
                    continue;
                }

                // 要递归的对象必须是 plainObject 或者数组
                if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                    // 要复制的对象属性值类型需要与目标属性值相同
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];
                    } else {
                        clone = src && isPlainObject(src) ? src : {};
                    }
                    target[name + ''] = extend(deep, clone, copy);
                } else if (copy !== undefined) {
                    target[name + ''] = copy;
                }
            }
        }
    }

    return target;
}
