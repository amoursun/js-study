### 正则表达式编程
>我们的口号是： 包教不包会！！！


进入这个教程之前，系统默认你已经初步了解了正则的基本语法，当然，如果条件是false的话，那么 [正则表达式30分钟入门](https://deerchao.net/tutorials/regex/regex.htm)，你值得拥有。ok，时间紧，任务重，作为一个长篇故事，赶紧进入正题才是正理。
 
### 详情提要
1. 正则表达式的四种操作
2. 相关API注意要点
3. 真实案例

> 正则表达式的四种操作

1.验证

验证是正则表达式最直接的应用，比如表单验证。
在说验证之前，先要说清楚匹配是什么概念。
所谓匹配，就是看目标字符串里是否有满足匹配的子串。因此，“匹配”的本质就是“查找”。
有没有匹配，是不是匹配上，判断是否的操作，即称为“验证”。
这里举一个例子，来看看如何使用相关API进行验证操作的。
比如，判断一个字符串中是否有数字。

使用search

	var regex = /\d/;
	var string = "abc123";
	console.log(string.search(regex));// 3  出现数字的索引值
	console.log(!string.search(regex));// false
	console.log(!!string.search(regex));// true
	
使用test

	var regex = /\d/;
	var string = "abc123";
	console.log(regex.test(string));// true
使用match
		
	var regex = /\d/;
	var string = "abc123";
	console.log(string.match(regex));
	console.log(!!string.match(regex));
	// => Array
	// => true
	
使用exec
	
	var regex = /\d/;
	var string = "abc123";
	console.log(regex.exec(string));
	console.log(!!regex.exec(string));
	// => Array
	// => true
其中，最常用的是test。

2.切分

匹配上了，我们就可以进行一些操作，比如切分。
所谓“切分”，就是把目标字符串，切成一段一段的。在JS中使用的是split。
比如，目标字符串是"html,css,javascript"，按逗号来切分：

	var regex = /,/;
	var string = "html,css,javascript";
	console.log( string.split(regex) );
	// => ["html", "css", "javascript"]
又比如，如下的日期格式：
2017/06/26
2017.06.26
2017-06-26

可以使用split“切出”年月日：

	var regex = /\D/;
	console.log("2017/06/26".split(regex));
	console.log("2017.06.26".split(regex));
	console.log("2017-06-26".split(regex));
	// => ["2017", "06", "26"]
	// => ["2017", "06", "26"]
	// => ["2017", "06", "26"]

3.提取

虽然整体匹配上了，但有时需要提取部分匹配的数据。
此时正则通常要使用分组引用（分组捕获）功能，还需要配合使用相关API。
这里，还是以日期为例，提取出年月日。注意下面正则中的括号：
match

	var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
	var string = "2017-06-26";
	console.log(string.match(regex));
	// =>["2017-06-26", "2017", "06", "26", index: 0, input: "2017-06-26"]
exec

	var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
	var string = "2017-06-26";
	console.log(regex.exec(string));
	// =>["2017-06-26", "2017", "06", "26", index: 0, input: "2017-06-26"]
test

	var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
	var string = "2017-06-26";
	regex.test(string);
	console.log(RegExp.$1, RegExp.$2, RegExp.$3);
	// => "2017" "06" "26"
search

	var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
	var string = "2017-06-26";
	string.search(regex);
	console.log(RegExp.$1, RegExp.$2, RegExp.$3);
	// => "2017" "06" "26"
replace

	var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
	var string = "2017-06-26";
	var date = [];
	string.replace(regex, function(match, year, month, day) {
		date.push(year, month, day);
	});
	console.log(date);
	// => ["2017", "06", "26"]
其中，最常用的是match。

4 替换

找，往往不是目的，通常下一步是为了替换。在JS中，使用replace进行替换。
比如把日期格式，从yyyy-mm-dd替换成yyyy/mm/dd：

	var string = "2017-06-26";
	var today = new Date( string.replace(/-/g, "/") );
	console.log( today );
	// => Mon Jun 26 2017 00:00:00 GMT+0800 (中国标准时间)
这里只是简单地应用了一下replace。但，replace方法是强大的，是需要重点掌握的。

> 相关API注意要点

从上面可以看出用于正则操作的方法，共有6个，字符串实例4个，正则实例2个：

	String #search，#split，#match，#replace
	RegExp #test，#exec

1.search和match的参数问题

我们知道字符串实例的那4个方法参数都支持正则和字符串。
但search和match，会把字符串转换为正则的。

	var string = "2017.06.27";
	console.log(string.search("."));
	// => 0
	//需要修改成下列形式之一
	console.log(string.search("\\."));
	console.log(string.search(/\./));
	// => 4
	// => 4
	console.log(string.match("."));
	// => ["2", index: 0, input: "2017.06.27"]
	//需要修改成下列形式之一
	console.log(string.match("\\."));
	console.log(string.match(/\./));
	// => [".", index: 4, input: "2017.06.27"]
	// => [".", index: 4, input: "2017.06.27"]
	console.log(string.split("."));
	// => ["2017", "06", "27"]
	console.log(string.replace(".", "/"));
	// => "2017/06.27"

2.match返回结果的格式问题

match返回结果的格式，与正则对象是否有修饰符g有关。

	var string = "2017.06.27";
	var regex1 = /\b(\d+)\b/;
	var regex2 = /\b(\d+)\b/g;
	console.log(string.match(regex1));
	console.log(string.match(regex2));
	// => ["2017", "2017", index: 0, input: "2017.06.27"]
	// => ["2017", "06", "27"]
没有g，返回的是标准匹配格式，即，数组的第一个元素是整体匹配的内容，接下来是分组捕获的内容，然后是整体匹配的第一个下标，最后是输入的目标字符串。
有g，返回的是所有匹配的内容。
当没有匹配时，不管有无g，都返回null。

3.exec 比 match 更强大

当正则没有g时，使用match返回的信息比较多。但是有g后，就没有关键的信息index了。而exec方法就能解决这个问题，它能接着上一次匹配后继续匹配：

	var string = "2017.06.27";
	var regex2 = /\b(\d+)\b/g;
	console.log(regex2.exec(string));
	console.log(regex2.lastIndex);
	console.log(regex2.exec(string));
	console.log(regex2.lastIndex);
	console.log(regex2.exec(string));
	console.log(regex2.lastIndex);
	console.log(regex2.exec(string));
	console.log(regex2.lastIndex);
	// => ["2017", "2017", index: 0, input: "2017.06.27"]
	// => 4
	// => ["06", "06", index: 5, input: "2017.06.27"]
	// => 7
	// => ["27", "27", index: 8, input: "2017.06.27"]
	// => 10
	// => null
	// => 0

其中正则实例 lastIndex 属性，表示下一次匹配开始的位置。
比如第一次匹配了“2017”，开始下标是0，共4个字符，因此这次匹配结束的位置是3，下一次开始匹配的位置是4。
从上述代码看出，在使用exec时，经常需要配合使用while循环：

	var string = "2017.06.27";
	var regex2 = /\b(\d+)\b/g;
	var result;
	while (result = regex2.exec(string)) {
		console.log( result, regex2.lastIndex );
	}
	// => ["2017", "2017", index: 0, input: "2017.06.27"] 4
	// => ["06", "06", index: 5, input: "2017.06.27"] 7
	// => ["27", "27", index: 8, input: "2017.06.27"] 10

4.修饰符g，对exex和test的影响

上面提到了正则实例的lastIndex属性，表示尝试匹配时，从字符串的 lastIndex 位开始去匹配。
字符串的四个方法，每次匹配时，都是从0开始的，即 lastIndex 属性始终不变。
而正则实例的两个方法exec、test，当正则是全局匹配时，每一次匹配完成后，都会修改lastIndex。下面让我们以test为例，看看你是否会迷糊：

	var regex = /a/g;
	console.log(regex.test("a"), regex.lastIndex);
	console.log(regex.test("aba"), regex.lastIndex);
	console.log(regex.test("ababc"), regex.lastInde);
	// => true 1
	// => true 3
	// => false 0
注意上面代码中的第三次调用test，因为这一次尝试匹配，开始从下标lastIndex即3位置处开始查找，自然就找不到了。
如果没有g，自然都是从字符串第0个字符处开始尝试匹配：

	var regex = /a/;
	console.log(regex.test("a"), regex.lastIndex);
	console.log(regex.test("aba"), regex.lastIndex);
	console.log(regex.test("ababc"), regex.lastIndex);
	// => true 0
	// => true 0
	// => true 0
5.test整体匹配时需要使用^和$

这个相对容易理解，因为test是看目标字符串中是否有子串匹配正则，即有部分匹配即可。
如果，要整体匹配，正则前后需要添加开头和结尾：

	console.log(/123/.test("a123b"));
	// => true
	console.log(/^123$/.test("a123b"));
	// => false
	console.log(/^123$/.test("123"));
	// => true

6.split相关注意事项

split方法看起来不起眼，但要注意的地方有两个的。
第一，它可以有第二个参数，表示结果数组的最大长度：

	var string = "html,css,javascript";
	console.log( string.split(/,/, 2) );
	// =>["html", "css"]
第二，正则使用分组时，结果数组中是包含分隔符的：

	var string = "html,css,javascript";
	console.log(string.split(/(,)/));
	// =>["html", ",", "css", ",", "javascript"]
	
7.强大的replace

我坚定认为replace是最强大的。因为它也能拿到该拿到的信息，然后可以假借替换之名，做些其他事情。
总体来说replace有两种使用形式，这是因为它的第二个参数，可以是字符串，也可以是函数。

当第二个参数是字符串时，如下的字符有特殊的含义：

$$1,  $2, ..., $99 匹配第1~99个分组捕获的文本

$& 匹配regexp的子串

$` 匹配子串的左边文本

$' 匹配子串的右边文本

$$ 美元符号
例如，把"2,3,5"，变成"5=2+3"：

	var result = "2,3,5".replace(/(\d+),(\d+),(\d+)/, "$3=$1+$2");
	console.log(result);
	// => "5=2+3"
又例如，把"2,3,5"，变成"222,333,555":

	var result = "2,3,5".replace(/(\d+)/g, "$&$&$&");
	console.log(result);
	// => "222,333,555"
	再例如，把"2+3=5"，变成"2+3=2+3=5=5":
	
	var result = "2+3=5".replace(/=/, "$&$`$&$'$&");
	console.log(result);
	// => "2+3=2+3=5=5"
当第二个参数是函数时，我们需要注意该回调函数的参数具体是什么：

	"1234 2345 3456".replace(/(\d)\d{2}(\d)/g, function(match, $1, $2, index, input) {
		console.log([match, $1, $2, index, input]);
	});
	// => ["1234", "1", "4", 0, "1234 2345 3456"]
	// => ["2345", "2", "5", 5, "1234 2345 3456"]
	// => ["3456", "3", "6", 10, "1234 2345 3456"]
此时我们可以看到replace拿到的信息，并不比exec少。

8.使用构造函数需要注意的问题

一般不推荐使用构造函数生成正则，而应该优先使用字面量。因为用构造函数会多写很多“\”。

	var string = "2017-06-27 2017.06.27 2017/06/27";
	var regex = /\d{4}(-|\.|\/)\d{2}\1\d{2}/g;
	console.log( string.match(regex) );
	// => ["2017-06-27", "2017.06.27", "2017/06/27"]
	
	regex = new RegExp("\\d{4}(-|\\.|\\/)\\d{2}\\1\\d{2}", "g");
	console.log( string.match(regex) );
	// => ["2017-06-27", "2017.06.27", "2017/06/27"]

9.修饰符

ES5中修饰符，共3个：
g 全局匹配，即找到所有匹配的，单词是global
i 忽略字母大小写，单词ingoreCase
m 多行匹配，只影响^和$，二者变成行的概念，即行开头和行结尾。单词是multiline
当然正则对象也有相应的只读属性：

	var regex = /\w/img;
	console.log(regex.global);
	console.log(regex.ignoreCase);
	console.log(regex.multiline);
	// => true
	// => true
	// => true

> 真实案例

1.使用构造函数生成正则表达式

我们知道要优先使用字面量来创建正则，但有时正则表达式的主体是不确定的，此时可以使用构造函数来创建。模拟getElementsByClassName方法，就是很能说明该问题的一个例子。
这里getElementsByClassName函数的实现思路是：
比如要获取className为"high"的dom元素；
首先生成一个正则：/(^|\s)high(\s|$)/；
然后再用其逐一验证页面上的所有dom元素的类名，拿到满足匹配的元素即可。
代码如下(可以直接复制到本地查看运行效果)：

	<p class="high">1111</p>
	<p class="high">2222</p>
	<p>3333</p>
	<script>
		function getElementsByClassName(className) {
			var elements = document.getElementsByTagName("*");
			var regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
			var result = [];
			for (var i = 0; i < elements.length; i++) {
				var element = elements[i];
				if (regex.test(element.className)) {
					result.push(element)
				}
			}
			return result;
		}
		var highs = getElementsByClassName('high');
		highs.forEach(function(item) {
			item.style.color = 'red';
		});
	</script>

2.使用字符串保存数据

一般情况下，我们都愿意使用数组来保存数据。但有的框架中，使用的却是字符串。
使用时，仍需要把字符串切分成数组。例：

	var utils = {};
	"Boolean|Number|String|Function|Array|Date|RegExp|Object|Error".split("|").forEach(function(item) {
		utils["is" + item] = function(obj) {
			return {}.toString.call(obj) == "[object " + item + "]";
		};
	});
	console.log(utils);
	console.log(utils.isArray([1, 2, 3]));
	// => true

3 if语句中使用正则替代&&

比如，模拟ready函数，即加载完毕后再执行回调（不兼容ie的）：

	var readyRE = /complete|loaded|interactive/;
	
	function ready(callback) {
		if (readyRE.test(document.readyState) && document.body) {
			callback()
		} 
		else {
			document.addEventListener(
				'DOMContentLoaded', 
				function () {
					callback()
				},
				false
			);
		}
	};
	ready(function() {
		alert("加载完毕！")
	});

4 使用强大的replace

因为replace方法比较强大，有时用它根本不是为了替换，只是拿其匹配到的信息来做文章。
这里以查询字符串（querystring）压缩技术为例，注意下面replace方法中，回调函数根本没有返回任何东西。
	
	function compress(source) {
		var keys = {};
		source.replace(/([^=&]+)=([^&]*)/g, function(full, key, value) {
			keys[key] = (keys[key] ? keys[key] + ',' : '') + value;
		});
		var result = [];
		for (var key in keys) {
			result.push(key + '=' + keys[key]);
		}
		return result.join('&');
	}
	
	console.log(compress("a=1&b=2&a=3&b=4"));
	// => "a=1,3&b=2,4"

5 综合运用

最后这里再做个简单使用的正则测试器。

	<section>
		<div id="err"></div>
		<input id="regex" placeholder="请输入正则表达式">
		<input id="text" placeholder="请输入测试文本">
		<button id="run">测试一下</button>
		<div id="result"></div>
	</section>
	<style>
	section{
		display:flex;
		flex-direction:column;
		justify-content:space-around;
		height:300px;
		padding:0 200px;
	}
	section *{
		min-height:30px;
	}
	#err {
		color:red;
	}
	#result{
		line-height:30px;
	}
	.info {
		background:#00c5ff;
		padding:2px;
		margin:2px;
		display:inline-block;
	}
	</style>
	<script>
	(function() {
		// 获取相应dom元素
		var regexInput = document.getElementById("regex");
		var textInput = document.getElementById("text");
		var runBtn = document.getElementById("run");
		var errBox = document.getElementById("err");
		var resultBox = document.getElementById("result");
		
		// 绑定点击事件
		runBtn.onclick = function() {
			// 清除错误和结果
			errBox.innerHTML = "";
			resultBox.innerHTML = "";
			
			// 获取正则和文本
			var text = textInput.value;
			var regex = regexInput.value;
			
			if (regex == "") {
				errBox.innerHTML = "请输入正则表达式";
			} else if (text == "") {
				errBox.innerHTML = "请输入测试文本";
			} else {
				regex = createRegex(regex);
				if (!regex) return;
				var result, results = [];
				
				// 没有修饰符g的话，会死循环
				if (regex.global) {
					while(result = regex.exec(text)) {
						results.push(result);
					}
				} else {
					results.push(regex.exec(text));
				}
							
				if (results[0] == null) {
					resultBox.innerHTML = "匹配到0个结果";
					return;
				}
				
				// 倒序是有必要的
				for (var i = results.length - 1; i >= 0; i--) {
					var result = results[i];
					var match = result[0];
					var prefix = text.substr(0, result.index);
					var suffix = text.substr(result.index + match.length);
					text = prefix 
						+ '<span class="info">'
						+ match
						+ '</span>'
						+ suffix;
				}
				resultBox.innerHTML = "匹配到" + results.length + "个结果:<br>" + text;
			}
		};
		
		// 生成正则表达式，核心函数
		function createRegex(regex) {
			try {
				if (regex[0] == "/") {
					regex = regex.split("/");
					regex.shift();
					var flags = regex.pop();
					regex = regex.join("/");
					regex = new RegExp(regex, flags);
				} else {
					regex = new RegExp(regex, "g");
				}
				return regex;
			} catch(e) {
				errBox.innerHTML = "无效的正则表达式";
				return false;
			}
		}
	})();
</script>

### 课后练习

	一个字符串'qwer1234kdjf5452jkdj1909jk'，实现一个函数fn提取其中的连续数字。
	比如：fn('fd245fdf116sd22') = [245, 16, 22] ;
 
 
