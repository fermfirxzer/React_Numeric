
import { useState } from 'react';

export const inputN = (e, setN, setMatrix, setX, setB, setHtml) => {
  var value = parseInt(e.target.value);
  if (!isNaN(value) && value > 0) {
    if (value > 10) {
      value = 10;
    }
    setN(value);
    const emptyMatrix = Array.from({ length: value }, () => Array(value).fill(''));
    setMatrix(emptyMatrix);
    const emptyX = Array(value).fill(0);
    const emptyB = Array(value).fill(0);
    setX(emptyX);
    setB(emptyB);
    setHtml(null);
  }
}

export const inputMatrixValue = (matrix, setMatrix, row, col, e) => {
  const updatedMatrix = [...matrix];
  updatedMatrix[row][col] = e.target.value;
  setMatrix(updatedMatrix);
  console.log(updatedMatrix);
}

export const inputBValue = (B, setB, col, e) => {
  const updatedB = [...B];
  updatedB[col] = e.target.value;
  setB(updatedB);
}
