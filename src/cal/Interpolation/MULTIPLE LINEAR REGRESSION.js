import React, { useState } from 'react';
import { Button, Container, Form, Table } from "react-bootstrap";
import gaussJordan from './Gauss_jordan';

const MULTIPLEREGRESSION = () => {
  const [n, setN] = useState(0);
  const [xnum, setXnum] = useState(0);
  const [matrix, setMatrix] = useState([]);
  const [X, setX] = useState([]); // Matrix X
  const [B, setB] = useState([]); 
  const [matrixA,setMatrixA]=useState([]);
  const [matrixB,setMatrixB]=useState([]);
  const [ans,setans]=useState([]);
  const inputN = (e) => {
    var value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      if (value > 10) {
        value = 10;
      }
      setN(value);
      
    }
  }

  const inputMatrixValue = (row, col, e) => {
    const updatedMatrix = [...matrix];
    updatedMatrix[row][col] = e.target.value;
    setMatrix(updatedMatrix);

  }
  const inputBValue = (col, e) => {
    const updatedB = [...B];
    updatedB[col] = e.target.value;
    setB(updatedB);
  }

  const inputXnum = (e) => {
    const value = parseInt(e.target.value);
    setXnum(value);
  }

  // เพิ่มข้อมูลใน matrix ที่เริ่มต้นเป็นช่องว่าง
  const initializeMatrix = () => {
    const newMatrix = [];
    for (let i = 0; i < n; i++) {
      const row = Array(xnum).fill("");
      newMatrix.push(row);
      console.log(row)
    }
    const emptyMatrix = Array.from({ length: n }, () => Array(xnum).fill(''));
      setMatrix(emptyMatrix);
      const emptyX = Array(xnum).fill(0);
      const emptyB = Array(xnum).fill(0);
      const emptyA= Array(n).fill(0);
      setX(emptyX);
      setB(emptyA);
  }

  const calculateRoot = () => {
    const N=xnum;
    const coefficientMatrix = Array(N).fill().map(() => Array(N).fill(0));
    const constantMatrix = Array(N).fill(0);
    const a = [...matrix.map(row => [...row])];
    const b = [...B]
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {

        let sum = 0;
        for (let k = 0; k < n; k++) {
          sum += a[k][i] * a[k][j];
        }
        coefficientMatrix[i][j] = sum;
      }
    }
    for (let i = 0; i < N; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        sum += a[j][i] * b[j];
      }
      constantMatrix[i] = sum;
    }
    setMatrixA(coefficientMatrix)
    setMatrixB(constantMatrix)
    const result=gaussJordan(coefficientMatrix, constantMatrix);
    setans(result)
  }
  return (
    <div>
      <Container>
        <h3>MULTIPLEREGRESSION</h3>
        <Form.Group className="mb-3">
          <Form.Label>Input N</Form.Label>
          <input type="number" value={n} onChange={inputN} className="form-control"></input>
          <Form.Label>Input X</Form.Label>
          <input type="number" value={xnum} onChange={inputXnum} className="form-control"></input>
        </Form.Group>
        {n > 0 && (
          <Table bordered striped>
            <thead>
              <tr>
                {X.map((row, index) => (
                  <th key={index}>x {index + 1}</th>
                ))}
                <th>F(x)</th>
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((col, colIndex) => (
                    <td key={colIndex}>
                      <input
                        type="number"
                        value={matrix[rowIndex][colIndex]}
                        onChange={(e) => inputMatrixValue(rowIndex, colIndex, e)}
                        className="form-control"
                        step="any"
                      ></input>
                    </td>
                  ))}
                  <td>
                    <input
                      type="number"
                      value={B[rowIndex]}
                      onChange={(e) => inputBValue(rowIndex, e)}
                      className="form-control"
                      step="any"
                    ></input>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <Button variant="dark" onClick={initializeMatrix}>Initialize Matrix</Button>
        <Button variant="dark" onClick={calculateRoot}>Calculate</Button>
        {n > 0 && (
          <div>
            <Table bordered striped>
              <thead>
                <tr>
                  <th>X</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {ans.map((result, index) => (
                  <tr key={index}>
                    <td>{`X ${index}`}</td>
                    <td>{result}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
                  
        {matrixA.map((row, rowIndex) => (
          <tr>
            {row.map((col, colIndex) => (
              <td key={colIndex}>
                {col}
              </td>
            ))}
            <td>
              
            </td>
          </tr>
          
        ))}
        </div>
        )}
      </Container>
    </div>
  );
}

export default MULTIPLEREGRESSION;
