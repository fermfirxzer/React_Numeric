import React, { useState } from 'react';
import { Button, Container, Form, Table } from "react-bootstrap";

const Matrixinverse = () => {
  const [n, setN] = useState(0);
  const [matrix, setMatrix] = useState([]);
  const [X, setX] = useState([]); // Matrix X
  const [B, setB] = useState([]); // Matrix B
  //

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
  // Create a copy of the matrix and B for manipulation
  const calculateRoot = () => {
    // คัดลอกเมทริกซ์ a และ b
    const a = [...matrix.map(row => [...row])];
    const b = [...B];
    // สร้างเมทริกซ์หน่วย n x n
    const identityMatrix = Array(n).fill(0).map((_, rowIndex) =>
      Array(n).fill(0).map((_, colIndex) => (rowIndex === colIndex ? 1 : 0))
    );
  
    // ประมวลผลเมทริกซ์ a เพื่อหา inverse matrix
    for (let k = 0; k < n; k++) {
      const pivot = a[k][k];
      for (let j = 0; j < n; j++) {
        a[k][j] /= pivot;
        identityMatrix[k][j] /= pivot;
      }
  
      for (let i = 0; i < n; i++) {
        if (i !== k) {
          const factor = a[i][k];
          for (let j = 0; j < n; j++) {
            a[i][j] -= factor * a[k][j];
            identityMatrix[i][j] -= factor * identityMatrix[k][j];
          }
        }
      }
    }
    console.log(a);
    // ประมวลผลเมทริกซ์ b ด้วย inverse matrix
    const x=Array(n).fill(0);
    for(let i=0;i<n;i++){
      for(let j=0;j<n;j++){
        x[i]+=identityMatrix[i][j]*b[j];
      }
    }
    const roundedX  = x.map(value => value.toFixed(6));
    console.log(roundedX);
    setX(roundedX);
  }
  return (
    <div>
      <Container>
      <h3>Matrixinverse</h3>
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

export default Matrixinverse;
