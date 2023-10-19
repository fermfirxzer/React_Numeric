import React,{useState} from 'react';
import {Form,Container,Button,Table} from 'react-bootstrap';

const Jacobi=()=>{
    const [n, setN] = useState(0);
    const [matrix, setMatrix] = useState([]);
    const [X, setX] = useState([]); // Matrix X
    const [B, setB] = useState([]); // Matrix B
    const [data,setData]=useState([]);
    const [html,setHtml]=useState(null);
    const inputN=(e)=>{
        var value=parseInt(e.target.value);
        if(value>=10){
            value=10;
        }
        setN(value);
        const emptyMatrix = Array.from({ length: value }, () => Array(value).fill(''));
        setMatrix(emptyMatrix);
        const emptyX = Array(value).fill(0);
        const emptyB = Array(value).fill(0);
        setX(emptyX);
        setB(emptyB);
    }
    const inputMatrixValue = (row, col, e) => {
        const updatedMatrix = [...matrix];
        updatedMatrix[row][col] = e.target.value;
        setMatrix(updatedMatrix);
        console.log(matrix);
      }
    return (
        <div>
        <Container>
        <h3>Jacobi</h3>
        <Form.Group>
            <Form.Label>Input : n</Form.Label>
            <input type="number" value={n}onChange={inputN}></input>
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
        </Container>
        </div>
    )
}
export default Jacobi;