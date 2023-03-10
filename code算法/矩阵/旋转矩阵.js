// 给你一幅由 N × N 矩阵表示的图像，其中每个像素的大小为 4 字节。请你设计一种算法，将图像旋转 90 度。
// 不占用额外内存空间能否做到？
// 示例 1:
// 给定 matrix = 
// [
//   [1,2,3],
//   [4,5,6],
//   [7,8,9]
// ],
// 原地旋转输入矩阵，使其变为:
// [
//   [7,4,1],
//   [8,5,2],
//   [9,6,3]
// ]


// 00 01 02    00 10 20    20 10 00
// 10 11 12 => 01 11 21 => 21 11 01
// 20 21 22    02 12 22    22 12 02

// => x y 坐标互换  20 => 02  对角线互换
// => y 坐标 - 矩阵长度 - 1  02 => 00  中线互换


// 示例 2:
// 给定 matrix =
// [
//   [ 5, 1, 9,11],
//   [ 2, 4, 8,10],
//   [13, 3, 6, 7],
//   [15,14,12,16]
// ], 
// 原地旋转输入矩阵，使其变为:
// [
//   [15,13, 2, 5],
//   [14, 3, 4, 1],
//   [12, 6, 8, 9],
//   [16, 7,10,11]
// ]

// 00 01 02 03    00 10 20 30    30 20 10 00
// 10 11 12 13 => 01 11 21 31 => 31 21 11 01
// 20 21 22 23    02 12 22 32    32 22 12 02
// 30 31 32 33    03 13 23 33    33 23 13 03

// => x y 坐标互换  30 => 03  20 => 02 对角线互换
// => y 坐标 - 矩阵长度 - 1  03 => 00  02 => 01 中线互换


/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
 const rotate = (matrix) => {
    // 00 01 02    00 10 20    20 10 00
    // 10 11 12 => 01 11 21 => 21 11 01
    // 20 21 22    02 12 22    22 12 02
    // => x y 坐标互换  20 => 02  对角线互换
    // => y 坐标 - 矩阵长度 - 1  02 => 00  中线互换

    // 00 01 02 03    00 10 20 30    30 20 10 00
    // 10 11 12 13 => 01 11 21 31 => 31 21 11 01
    // 20 21 22 23    02 12 22 32    32 22 12 02
    // 30 31 32 33    03 13 23 33    33 23 13 03

    // => x y 坐标互换  30 => 03  20 => 02 对角线互换
    // => y 坐标 - 矩阵长度 - 1  03 => 00  02 => 01 中线互换
    const n = matrix.length;
    // 对角线互换
    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            let tmp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = tmp;
        }
    }
    // 中线互换
    const mid = Math.floor(n / 2);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < mid; j++) {
            let tmp = matrix[i][j];
            matrix[i][j] = matrix[i][n - 1 - j];
            matrix[i][n - 1 - j] = tmp;
        }
    }
    return matrix;
};