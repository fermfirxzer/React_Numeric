import { useState } from "react";
import { Button, Table, Container, Form } from "react-bootstrap";
import { evaluate } from "mathjs";

const Test = () => {
  const [n, setN] = useState(0);
  const [matrixX, setMatrixX] = useState([]);
  const [matrixB, setMatrixB] = useState([]);

  const inputN = (e) => {
    const value=parseInt(e.target.value);
    setN(value);
    const emptyMatrix=Array(value).fill("");
    const empty2dMatrix=[];
    for(let i=0;i<value;i++){
      const row=Array(value).fill("");
      empty2dMatrix.push(row);
    }
    setMatrixX(empty2dMatrix);
    setMatrixB(emptyMatrix);
    console.log(matrixX)
  };
  const inputMatrixX=(row,col,e)=>{
    const matrix=[...matrixX];
    matrix[row][col]=e.target.value;
    setMatrixX(matrix);
  }
  const inputMatrixB=(row,e)=>{
    const matrix=[...matrixB];
    matrix[row]=e.target.value;
    setMatrixB(matrix);
  }
  const cal=()=>{
    const x=[...matrixX];
    const b=[...matrixB];
    console.log(x);
    console.log(b);
  }
  return (
    <>
      <Container>
        <Form.Label>Input n:</Form.Label>
        <input
          type="text"
          value={n}
          onChange={inputN}
          className="form-control"
        ></input>
        <Table>
          <thead>
            {matrixB.map((row,index)=>(
              <th>
                {index+1}
              </th>
            ))}
            <th>
              MatrixB
            </th>
          </thead>
          <tbody>
            {matrixX.map((row,index)=>(
              <tr>
                {row.map((col,colindex)=>(
                  <td>
                    <input type="text"value={matrixX[index][colindex]}onChange={e=>(inputMatrixX(index,colindex,e))}className="form-control"></input>
                  </td>
                ))}
                <td>

  
                <input type="text"value={matrixB[index]}onChange={e=>(inputMatrixB(index,e))}className="form-control"></input>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        
        <Button variant="dark"onClick={cal}>cal</Button>
      </Container>
    </>
  );
};

export default Test;
