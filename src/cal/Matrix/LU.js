import React, { useState } from 'react';
import { Button, Container, Form, Table } from "react-bootstrap";

const LU = () => {
  const [n, setN] = useState(0);
  const [matrix, setMatrix] = useState([]);
  const [X, setX] = useState([]); // Matrix X
  const [B, setB] = useState([]); // Matrix B

  const inputN = (e) => {
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
    }
  }
  const inputMatrixValue = (row, col, e) => {
    const updatedMatrix = [...matrix];
    updatedMatrix[row][col] = e.target.value;
    setMatrix(updatedMatrix);
    console.log(matrix);
  }
  const inputBValue = (col, e) => {
    const updatedB = [...B];
    updatedB[col] = e.target.value;
    setB(updatedB);
  }


  const luDecomposition=(L,U,A,n)=> {
    for (let i = 0; i < n; i++) {
      // Upper triangular matrix
      for (let j = i; j < n; j++) {
        U[i][j] = A[i][j];
        for (let k = 0; k < i; k++) {
          U[i][j] -= L[i][k] * U[k][j];
        }
      }
      
      // Lower triangular matrix
      for (let j = i; j < n; j++) {
        if (i === j) {
          L[i][i] = 1.0;
        } else {
          L[j][i] = A[j][i];
          for (let k = 0; k < i; k++) {
            L[j][i] -= L[j][k] * U[k][i];
          }
          L[j][i] /= U[i][i];
        }
      }
    }

  }

// Function to solve a system of linear equations using LU decomposition
const solveSystem=(L, U, B,resultX)=> {
  const n = B.length;
  const Y = new Array(n).fill(0);

  // Solve LY = B using forward substitution
  for (let i = 0; i < n; i++) {
    Y[i] = B[i];
    for (let j = 0; j < i; j++) {
      Y[i] -= L[i][j] * Y[j];
    }
  }

  // Solve UX = Y using backward substitution
  for (let i = n - 1; i >= 0; i--) {
    resultX[i] = Y[i];
    for (let j = i + 1; j < n; j++) {
      resultX[i] -= U[i][j] * resultX[j];
    }
    resultX[i] /= U[i][i];
  }
}

const calculateRoot = () => {
  const a = [...matrix.map(row => [...row])];
  const L = Array.from({ length: n }, () => Array(n).fill(0));
  const U = Array.from({ length: n }, () => Array(n).fill(0));
  const resultX = Array(n).fill(0);
  luDecomposition(L, U, a, n); // สลับตำแหน่งพารามิเตอร์ในฟังก์ชัน
  console.log(L); // แสดงค่า L ถ้าต้องการ
  console.log(U); // แสดงค่า U ถ้าต้องการ
  solveSystem(L, U, B, resultX);
  const x=resultX.map(value=>value.toFixed(6));
  console.log(x);
  setX(x);
}
 return(
    <div>
      <Container>
      <h3>LU</h3>
        <Form.Group className="mb-3">
          <Form.Label>Input N</Form.Label>
          <input type="number" id="n" value={n} onChange={inputN} className="form-control"></input>
        </Form.Group>

        {n > 0 && (
          <Table bordered striped>
            <thead>
              <tr>
                {Array.from({ length: n }, (_, index) => (
                  <th>Column {index + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, rowIndex) => (
                <tr>
                  {row.map((col, colIndex) => (
                    <td>
                      <input
                        type="number"
                        value={matrix[rowIndex][colIndex]}
                        onChange={(e) => inputMatrixValue(rowIndex, colIndex, e)}
                        className="form-control"
                        step="any"
                      ></input>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {n > 0 && (
          <div>

            <h3>Matrix B</h3>
            {B.map((value, colIndex) => (
              <div className='row'>
                <div className='col sm-3'>

                  <Form.Group className="mb-3">
                    <input type="number" style={{ width: '20%' }} value={value} onChange={(e) => inputBValue(colIndex, e)} className="form-control"></input>
                  </Form.Group>
                </div>
              </div>
            ))}
          </div>
        )}
        <Button variant="dark" onClick={calculateRoot}>Calculate</Button>
        {n > 0 && (
          <div>
            <h3>Matrix X</h3>
            <Table bordered striped>
              <thead>
                <tr>
                  <th>Column</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {X.map((value, index) => (
                  <tr key={index}>
                    <td>{`X${index + 1}`}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

      </Container>
    </div>
    );
              }

export default LU;
