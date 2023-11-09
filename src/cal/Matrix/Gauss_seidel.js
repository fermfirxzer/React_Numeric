import React, { useState } from 'react';
import { Button, Container, Form, Table } from "react-bootstrap";
const Gauss_seidel = () => {
  const [n, setN] = useState(0);
  const [matrix, setMatrix] = useState([]);
  const [X, setX] = useState([]); // Matrix X
  const [B, setB] = useState([]); // Matrix B
  
  const [count,setcount]=useState(0);
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
      const emptyA = Array(value).fill(0);
      const emptyB = Array(value).fill(0);
      setX(emptyA);
      setB(emptyB);
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
  const check=(x,xold)=> {
    let check = false;
    for (let i = 0; i < n; i++) {
      if (Math.abs((x[i] - xold[i]) / x[i]) * 100 > 0.0001) {
        check=true;
      }
    }
    return check;
  }
  
  const calculateRoot = () => {
    const a = [...matrix.map(row => [...row])];
    const b= [...B];
    const x = Array(n).fill(0);
    const xold = Array(n).fill(1);
    const ans = new Array(n);
    var count=0;
    console.log("kuda");
    while(check(x,xold)){
      console.log("kuy");
    for(let i=0;i<n;i++){
      var sum=0;
      for(let j=0;j<n;j++){
        if(j!==i){
          sum+=a[i][j]*x[j];
        }
      }
      xold[i]=x[i];
      x[i]=(b[i]-sum)/a[i][i];
    }
    count++;
  }
  setX(x);
  setcount(count);
}
  return (
    <div>
      <Container>
        <h3>Gauss_Seidel</h3>
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
        {n>0&&(
          <div>
        <h3>iteration</h3>
        <div className='mb-3'>
          <h5>จำนวนรอบ : {count}</h5>
          </div></div>)}
      </Container>
    </div>
  );
}
export default Gauss_seidel;
