import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { inputN } from "../Matrix/Matrixinput";
import './Interpolation.css';
import  { term } from "./CalInterpolation";
const INTERPOLATION = () => {
    const [n,setn]=useState(0);
    const [xarr, setxarr] = useState([])
    const [yarr, setyarr] = useState([])
    const [linear,setlinear]=useState([])
    const [quardratic,setquardratic]=useState([])
    const [polynomial,setpolynomial]=useState([])
    const [xlinear,setxlinear]=useState(0);
    const [xquardratic,setxquardratic]=useState(0);
    const [xpolynomial,setxpolynomial]=useState(0);
    const [resultlinear,setresultlinear]=useState(0);
    const [resultquardratic,setresultquardratic]=useState(0);
    const [resultpolynomial,setresultpolynomial]=useState(0);
    const inputN=(e)=>{
        if(e.target.value>10){
            setn(10);
        }
        else{
            setn(e.target.value);
        }
        console.log(n);
    }
    const inputlinear=(row,e)=>{
        const updatedMatrix=[...linear];
        updatedMatrix[row] = e.target.value;
        setlinear(updatedMatrix);
    }
    const inputquardratic=(row,e)=>{
        const updatedMatrix=[...quardratic];
        updatedMatrix[row] = e.target.value;
        setquardratic(updatedMatrix);
    }
    const inputpolynomial=(row,e)=>{
        const updatedMatrix=[...polynomial];
        updatedMatrix[row] = e.target.value;
        setpolynomial(updatedMatrix);
    }
    const inputxlinear=(e)=>{
      setxlinear(e.target.value);
    }
    const inputxquardratic=(e)=>{
      setxquardratic(e.target.value);
    }
    const inputxpolynomiar=(e)=>{
      setxpolynomial(e.target.value);
    }
    const inputxarr= (row, e) => {
        const updatedMatrix = [...xarr];
        updatedMatrix[row] = e.target.value;
        setxarr(updatedMatrix);
      }
      const inputyarr = (row, e) => {
        const updatedMatrix = [...yarr];
        updatedMatrix[row] = e.target.value;
        setyarr(updatedMatrix);
      }
    const callinear = () => {
        var p1=linear[0];var p2=linear[1];
        const x = [xarr[p1-1],xarr[p2-1]];
        const y = [yarr[p1-1],yarr[p2-1]];
        const n = 1;
        setresultlinear(term(x,y,n,xlinear));
        console.log(resultlinear);
    };
    const calquardratic=()=>{
        var p1=quardratic[0],p2=quardratic[1],p3=quardratic[2];
        const x = [xarr[p1-1],xarr[p2-1],xarr[p3-1]];
        const y = [yarr[p1-1],yarr[p2-1],yarr[p3-1]];const n = 2;
        setresultquardratic(term(x,y,n,xquardratic))
    }
    const calpolynomair=()=>{
        var p1=polynomial[0],p2=polynomial[1],p3=polynomial[2],p4=polynomial[3],p5=polynomial[4];
        const x = [xarr[p1-1],xarr[p2-1],xarr[p3-1],xarr[p4-1],xarr[p5-1]];
        const y = [yarr[p1-1],yarr[p2-1],yarr[p3-1],yarr[p4-1],yarr[p5-1]];const n = 4;
        setresultpolynomial(term(x,y,n,xpolynomial))
    }
    return (
        <>        
        <Container>
          <div className="row-mb-6">
            <div className="mb-6">
              <Form.Label>Input : N</Form.Label>
              <input type="text" value={n} onChange={inputN} className="form-control" />
            </div>
          </div>
          {n > 0 && (
            
            <div style={{width:'40%',marginTop:'2rem'}}>
                <h5>สร้างอาร์เรย์เก็บคำตอบของแต่ละตัวแปร</h5>
                <Table>
  <thead>
    <tr>
        <th>
        </th>
      <th>
        <h2>X</h2>
      </th>
      <th>
        <h2>Y</h2>
      </th>
    </tr>
  </thead>
  
  <tbody>
    {Array.from({ length: n }, (_, index) => (
      <tr key={index} className="mt-6">
        <td>
            <h6>จุดที่ :{index+1}</h6>
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
       {n > 0 && (
  <>
    <h3>Linear Interpolation (2 จุด)</h3>
    {Array.from({ length: 2 }, (_, index) => (
        <div className="point">
            <h6 className="point-h6">จุดที่ :  {index+1}</h6>
          <input
        type="text"
        onChange={(e) => inputlinear(index, e)}
        className="form-control"
      />  
      
        </div>
          ))}
          <div className="point">
            <h6 className="point-h6">x :</h6>
          <input
        type="text"
        onChange={(e) => inputxlinear(e)}
        className="form-control"
      />    
          </div>
          
          <Button variant="dark" onClick={callinear}>Callinear</Button>
          <p>Result Linear: {resultlinear}</p>
  </>

)}
{n > 0 && (
  <>
    <h3>Quardratic Interpolation (3 จุด)</h3>
    {Array.from({ length: 3 }, (_, index) => (
        <div className="point">
            <h6 className="point-h6">จุดที่ :{index+1}</h6>
          <input
        key={index}
        type="text"
        onChange={(e) => inputquardratic(index, e)}
        className="form-control"
      />  
        </div>
          ))}
          <div className="point">
            <h6 className="point-h6">x :</h6>
          <input
        type="text"
        onChange={(e) => inputxquardratic(e)}
        className="form-control"
      />    
          </div>
          <Button variant="dark" onClick={calquardratic}>Calquardratic</Button>
          <p>Result Quardratic: {resultquardratic}</p>
  </>
)}
{n > 0 && (
  <>
    <h3>Polynomial Interpolation (5 จุด)</h3>
    {Array.from({ length: 5 }, (_, index) => (
        <div className="point">
            <h6 className="point-h6">จุดที่ :{index+1}</h6>
          <input
        key={index}
        type="text"
        onChange={(e) => inputpolynomial(index,e)}
        className="form-control"
      />  
        </div>
          ))}
          <div className="point">
            <h6 className="point-h6">x :</h6>
          <input
        type="text"
        onChange={(e) => inputxpolynomiar(e)}
        className="form-control"
      />    
          </div>
          <Button variant="dark" onClick={calpolynomair}>Calpolynomair</Button>
          <p>Result Polynomial: {resultpolynomial}</p>
  </>
)}
  </div>
)}
        </Container></>
      )};
export default INTERPOLATION;