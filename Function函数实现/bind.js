/**
 * bind(target, ...args) 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用
 *    let arr = []; let newArr = arr.bind(null, 1, 2) =>
 *
 * return 返回一个原函数的拷贝，并拥有指定的 this 值和初始参数
 */
Function.prototype.selfBind = function(that) {
    let _this = this; // 保存原始this(原始函数)
    /*
        * 由于参数的不确定性，统一用arguments来处理，这里的arguments只是一个类数组对象，有length属性
        * 可以用数组的slice方法转化成标准格式数组，除了作用域对象that以外，
        * 后面的所有参数都需要作为数组参数传递
        * Array.prototype.slice.apply(arguments,[1])//Array.prototype.slice.call(arguments, 1)
    */
    let slice = Array.prototype.slice;
    let args = slice.call(arguments, 1); // slice.apply(arguments, [1]); call, apply 传参形式不一样
    let fNOP = function(){};
    let bound = function() {
        return _this.apply(
            this instanceof fNOP ? this : that || window,
            args.concat(Array.prototype.slice.call(arguments))
        )
    }
    fNOP.prototype = _this.prototype;
    bound.prototype = new fNOP();
    return bound;
}

let test = function(a,b){
    console.log('作用域绑定 '+ this.value)
    console.log('testBind参数传递 '+ a.value2)
    console.log('调用参数传递 ' + b)
}
let obj = {
    value:'ok'
}
let fun_new = test.selfBind(obj,{value2:'also ok'})

fun_new ('hello bind')
// 作用域绑定 ok
// testBind参数传递 also ok
// 调用参数传递  hello bind

