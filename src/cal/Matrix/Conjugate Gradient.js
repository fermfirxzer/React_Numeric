import React, { useState } from 'react';
import { Button, Container, Form, Table } from "react-bootstrap";

const Conjugate = () => {
  const [n, setN] = useState(0);
  const [matrix, setMatrix] = useState([]);
  const [X, setX] = useState([]); // Matrix X
  const [B, setB] = useState([]); // Matrix B
  const [result,setresult]=useState([]);
  const [count,setcount]=useState(0);
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
      setresult(emptyB);
      setX(emptyX);
      setB(emptyB);
    }
  }
  const inputMatrixValue = (row, col, e) => {
    const updatedMatrix = [...matrix];
    updatedMatrix[row][col] = parseFloat(e.target.value);
    setMatrix(updatedMatrix);
    console.log(matrix);
  }
  const inputBValue = (col, e) => {
    const updatedB = [...B];
    updatedB[col] = parseFloat(e.target.value);
    setB(updatedB);
  }
  function conjugateGradient(A, b, x0, maxIterations, tolerance) {
    const n = A.length;
    const x = x0.slice();
    const r = new Array(n);
    const p = new Array(n);

    // r0 = b - Ax0
    for (let i = 0; i < n; i++) {
        r[i] = b[i];
        for (let j = 0; j < n; j++) {
            r[i] -= A[i][j] * x0[j];
        }
        p[i] = r[i];
    }

    for (let iteration = 0; iteration < maxIterations; iteration++) {
        const rNormSquared = dotProduct(r, r);

        const Ap = multiplyMatrixVector(A, p);
        const alpha = rNormSquared / dotProduct(p, Ap);

        for (let i = 0; i < n; i++) {
            x[i] += alpha * p[i];
            r[i] -= alpha * Ap[i];
        }

        if (Math.sqrt(rNormSquared) < tolerance) {
            console.log(`Converged after ${iteration + 1} iterations.`);
            break;
        }

        const beta = dotProduct(r, r) / rNormSquared;

        for (let i = 0; i < n; i++) {
            p[i] = r[i] + beta * p[i];
        }
        setcount(iteration);
    }
    


    return x;
}

function dotProduct(a, b) {
    return a.reduce((sum, ai, i) => sum + ai * b[i], 0);
}

function multiplyMatrixVector(A, x) {
    const n = A.length;
    const result = new Array(n);

    for (let i = 0; i < n; i++) {
        result[i] = dotProduct(A[i], x);
    }

    return result;
}
const calculateRoot = () => {
    const X0matrix = Array(n).fill(0);
    const solution = conjugateGradient(matrix,B, X0matrix, 1000, 0.0001);
    setresult(solution);
}

  return (
    <div>
      <Container>
      <h3>Conjugate</h3>
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
                {result.map((value, index) => (
                  <tr key={index}>
                    <td>{`X${index + 1}`}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div>จำนวนรอบ :{count}</div>
          </div>
        )
        
        }
       

      </Container>
    </div>

  );
}

export default Conjugate;
