import React, { useState } from 'react';
import { Button, Container, Form, Table } from "react-bootstrap";

const Gausselimination = () => {
  const [n, setN] = useState(0);
  const [matrix, setMatrix] = useState([]);
  const [X, setX] = useState([]); // Matrix X
  const [B, setB] = useState([]); // Matrix B
  const [data,setData]=useState([]);
  const [html,setHtml]=useState(null);
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
  // const print = () => {
  
  // }         
  // Create a copy of the matrix and B for manipulation
  const calculateRoot = () => {
    const newData=[];
    setData(newData);
    setHtml(null);
    // ... การคำนวณอื่น ๆ ในเมทริกซ์ a และ b ...
    const a = [...matrix.map(row => [...row])];
    const b = [...B]
    const x = Array(n).fill(0);var obj=[];
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        var factor = a[j][i] / a[i][i];
        for (let k = i; k < n; k++) {
          a[j][k] = a[j][k] - a[i][k] * factor;

        }
        b[j] = b[j] - b[i] * factor;
        var obj={a:a};
        data.push(obj);
        console.log(obj);
      }
    }
  
    for (let k = n - 1; k >= 0; k--) {
      b[k] = b[k] / a[k][k];
      a[k][k] = 1;
      for (let i = k - 1; i >= 0; i--) {
        b[i] = b[i] - a[i][k] * b[k];
      }
    }
    const roundedX = b.map(value => value.toFixed(6));
    console.log("x dd:" + x);
    setX(roundedX);
  }
  return (
    <div>
      <Container>
        <h3>Gausselimination</h3>
        <Form.Group className="mb-3">
          <Form.Label>Input N</Form.Label>
          <input type="number" id="n" value={n} onChange={inputN} className="form-control"></input>
        </Form.Group>

        {n > 0 && (
          <Table bordered>
          <thead>
            <tr>
              {Array.from({ length: n }, (_, index) => (
                <th>Column {index + 1}</th>
              ))}
              <th>Matrix B</th> {/* เพิ่มคอลัมน์สำหรับ Matrix B */}
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
                <td> {/* คอลัมน์สำหรับ Matrix B */}
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
        {html}
      </Container>
    </div>

  );
}

export default Gausselimination;
