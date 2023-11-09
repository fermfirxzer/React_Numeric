
function gaussJordan(matrixA,matrixB) {
    const a = [...matrixA.map(row => [...row])];
    const b = [...matrixB];
    const n=b.length;
    for (let k = 0; k < n; k++) {
      for (let i = k + 1; i < n; i++) {
        const factor = a[i][k] / a[k][k];
        for (let j = k; j < n; j++) {
          a[i][j] -= a[k][j] * factor;
        }
        b[i] -= b[k] * factor;
      }
    }
    for (let k = n - 1; k >= 0; k--) {
      b[k] = b[k] / a[k][k];
      a[k][k] = 1;
      for (let i = k - 1; i >= 0; i--) {
        b[i] = b[i] - a[i][k] * b[k];
      }
    }
    return b;
}
  // ส่งออกฟังก์ชัน Gauss-Jordan เพื่อใช้ในไฟล์อื่น
  module.exports = gaussJordan;
  