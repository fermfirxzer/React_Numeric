import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { CalCubicSpline, CalLinearSpline, CalQuadraticSpline } from "./Calspline";
import { matrix } from "mathjs";
const Splines=()=>{
    const [n,setn]=useState(0);
    const [xarr, setxarr] = useState([])
    const [yarr, setyarr] = useState([])
    const [targetX,settargetx]=useState(0);
    const [ans,setans]=useState(null);

    const inputxarr=(row,e)=>{
      const Matrix=[...xarr];
      Matrix[row]=e.target.value;
      setxarr(Matrix)
    }
    const inputyarr=(row,e)=>{
      const Matrix=[...yarr];
      Matrix[row]=e.target.value;
      setyarr(Matrix);
    }
    const inputtargetx=(e)=>{
      settargetx(e.target.value)
    }
    const calLinear=()=>{
      const x = targetX;
      var result = CalLinearSpline(xarr,yarr,x);
      console.log(result)
      setans(<h3>{result}</h3>
      )
    }
    const calQuardratic=()=>{
      const x = targetX; // Value to interpolate at
      let result = CalQuadraticSpline(xarr,yarr,x);
      console.log(result)
      setans(<h3>{result}</h3>
      )
    }
    const calPolynomair=()=>{
      const x = targetX; // Value to interpolate at
      let result = CalCubicSpline(xarr,yarr,x);
      console.log(result)
      setans(<h3>{result}</h3>
      )
    }
    const inputN=(e)=>{
      const value=e.target.value
        setn(value)
        const matrix=[];
        for(let i=0;i<value;i++){
          matrix.push('');
        }
        setxarr(matrix);
        console.log(xarr);
        setyarr(matrix);
    }
    return (
        <>        
        <Container>
          <div className="row-mb-6">
            <div className="mb-6">
              <Form.Label>Input : N</Form.Label>
              <input type="text" value={n} onChange={inputN} className="form-control" />
              <Form.Label>Input : Target X</Form.Label>
              <input type="text" value={targetX} onChange={inputtargetx} className="form-control" />
            </div>
          </div>
          {n > 0 && (
            
            <div style={{width:'40%',marginTop:'2rem'}}>
                <h5>สร้างอาร์เรย์</h5>
                
    <Table>
  <thead>
        <th>
        </th>
      <th>
        <h2>X</h2>
      </th>
      <th>
        <h2>Y</h2>
      </th>
  </thead>
  <tbody>
    {xarr.map((row,index) => (
      <tr key={index} className="mt-6">
        <td>
            <h6>{index+1}</h6>
        </td>
        <td>
          <input
            type="text"
            onChange={(e) => inputxarr(index, e)}
            className="form-control"
          />
        </td>
        <td>
          <input
            type="text"
            onChange={(e) => inputyarr(index, e)}
            className="form-control"
          />
        </td>
      </tr>
    ))}
  </tbody>
</Table>
<Button variant="dark" onClick={calLinear} >Linear</Button>
<Button variant="dark" onClick={calQuardratic} >Quadratic</Button>
<Button variant="dark" onClick={calPolynomair}>Polynomial</Button>
  </div>
)}
{ans!=null&&(
  <>
  {ans}
  </>
)}
        </Container></>
      )};
export default Splines;
