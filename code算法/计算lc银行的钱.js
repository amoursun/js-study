// Hercy 想要为购买第一辆车存钱。他每天都往力扣银行里存钱。
// 最开始，他在周一的时候存入 1 块钱。从周二到周日，他每天都比前一天多存入 1 块钱。
// 在接下来每一个周一，他都会比 前一个周一 多存入 1 块钱。
// 给你 n ，请你返回在第 n 天结束的时候他在力扣银行总共存了多少块钱。

// 示例 1：
// 输入：n = 4
// 输出：10
// 解释：第 4 天后，总额为 1 + 2 + 3 + 4 = 10 

// 示例 2：
// 输入：n = 10
// 输出：37
// 解释：第 10 天后，总额为 (1 + 2 + 3 + 4 + 5 + 6 + 7) + (2 + 3 + 4) = 37 
// 注意到第二个星期一，Hercy 存入 2 块钱

// 示例 3：
// 输入：n = 20
// 输出：96
// 解释：第 20 天后，总额为 
// (1 + 2 + 3 + 4 + 5 + 6 + 7)
// + (2 + 3 + 4 + 5 + 6 + 7 + 8)
// + (3 + 4 + 5 + 6 + 7 + 8)
// = 96

// 提示：
// 1 <= n <= 1000

/**
 * @param {number} n 
 * @return {number}
 */
function totalMoney(n) {
    let result = 0;
    let round = 1;
    let diff = 0;
    while (n-- > 0) {
        result += round + diff;
        diff++;

        if (diff === 7) {
            diff = 0;
            round++;
        }
    }
    return result;
}

function totalMoney1(n) {
    const weekBaseNum = 28;
    let round = round1 = Math.floor(n / 7);
    let remainder = n % 7;
    let result = weekBaseNum * round;
    while (round-- > 0) {
        result += round * 7;
    }
    let diff = 0;
    while (remainder-- > 0) {
        result += (round1 + 1) + diff;
        diff++;
    }
    return result;
}