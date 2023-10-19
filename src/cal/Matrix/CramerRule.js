import React, { useState } from 'react';
import { Button, Container, Form, Table } from "react-bootstrap";
const CramerRule = () => {
  const [n, setN] = useState(0);
  const [matrix, setMatrix] = useState([]);
  const [X, setX] = useState([]); // Matrix X
  const [B, setB] = useState([]); // Matrix B
  const [html, setHtml] = useState(null);
  const data = [];
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
      setHtml(null);
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
  const print = () => {
    console.log(data);
    return (
      <Container>
        <Table striped bordered hover variant="dark">
          <thead>
            {data.length > 0 && (
              <tr>
                <th width="10%">Deta :</th>
                <th>{data[0].detA}</th>
              </tr>
            )}
          </thead>
          <tbody>
            {data.map((element,index) => {
              if(index>0){
              return (
                <tr>
                  <td>{"detx" + element.count + " "}</td>
                  <td>{element.detA}</td>
                </tr>)
              }
            })}
          </tbody>
        </Table>
      </Container>

    );
  }
  // Create a copy of the matrix and B for manipulation
  const calculateRoot = () => {
    // ... การคำนวณอื่น ๆ ในเมทริกซ์ a และ b ...
    const a = [...matrix.map(row => [...row])];
    const b = [...B];
    const n = a.length; // ความกว้างหรือจำนวนตัวแปรที่ไม่ทราบค่า
    var obj = [];
    // สร้างอาร์เรย์เก็บคำตอบของแต่ละตัวแปร
    const x = new Array(n);

    // หา determinant ของเมทริกซ์หลัก (a)
    const detA = determinant(a);
    obj = { detA: detA, count: 0 };
    data.push(obj);
    // หาคำตอบของแต่ละตัวแปรโดยใช้ Cramer's Rule
    for (let i = 0; i < n; i++) {
      // สร้างเมทริกซ์ย่อยโดยคัดลอกเมทริกซ์ a และแทนคอลัมน์ที่ i ด้วยเวกเตอร์ b
      const subMatrix = a.map((row, rowIndex) =>
        row.map((col, colIndex) => (colIndex === i ? b[rowIndex] : col))
      );

      // หา determinant ของเมทริกซ์ย่อย
      const subDet = determinant(subMatrix);
      obj = { detA: subDet, count: i + 1 };
      data.push(obj);
      // คำนวณคำตอบของตัวแปรที่ i โดยใช้ Cramer's Rule
      x[i] = subDet / detA;
    }
    console.log(data);
    setHtml(print());
    setX(x);
    console.log("X: ", x);
  }

  // ฟังก์ชันสำหรับหา determinant ของเมทริกซ์
  function determinant(matrix) {
    const n = matrix.length;
    if (n === 1) {
      return matrix[0][0];
    }
    if (n === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }
    let det = 0;
    for (let j = 0; j < n; j++) {
      const subMatrix = [];
      for (let i = 1; i < n; i++) {
        subMatrix.push(matrix[i].slice(0, j).concat(matrix[i].slice(j + 1)));
      }
      det += matrix[0][j] * determinant(subMatrix) * (j % 2 === 0 ? 1 : -1);
    }
    return det;
  }
  return (
    <div>
      <Container>
        <h3>CramerRule</h3>
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
            {html}
          </div>
        )}
      </Container>
    </div>
  );
}
export default CramerRule;
