import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { inputN } from "../Matrix/Matrixinput";
import './Interpolation.css';
import { index, matrix, or, sum } from "mathjs";
import gaussJordan from "./Gauss_jordan";
const LINEARREGRESSION = () => {
    const [n,setn]=useState(0);
    const [xarr, setxarr] = useState([])
    const [yarr, setyarr] = useState([])
    const [linear,setlinear]=useState([])
    const [xlinear,setxlinear]=useState(0);
    const [xpolynomial,setxpolynomial]=useState(0);
    const [npolynomial,setnpolynomial]=useState(0);
    const [resultlinear,setresultlinear]=useState(0);
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
    const inputxlinear=(e)=>{
      setxlinear(e.target.value);
    }
    const inputxpolynomiar=(e)=>{
        setxpolynomial(e.target.value);
    }
    const inputnpolynomiar=(e)=>{
        setnpolynomial(e.target.value);
    }
    const inputxarr= (row, e) => {
        const updatedMatrix = [...xarr];
        updatedMatrix[row] = parseFloat(e.target.value);
        setxarr(updatedMatrix);
      }
      const inputyarr = (row, e) => {
        const updatedMatrix = [...yarr];
        updatedMatrix[row] = parseFloat(e.target.value)
        setyarr(updatedMatrix);
      }
    const callinear = () => {
        const value=xlinear,x=[...xarr],y=[...yarr];
        console.log(x);
        var sumY=0,sumX=0,sumXY=0,sumXX=0;
        for(let i=0;i<n;i++){
            sumX+=x[i];
            sumY += y[i];
            sumXY += x[i] * y[i];
            sumXX += x[i] * x[i];
        }
        console.log(sumX);
        const coeffic=[[n,sumX],[sumX,sumXX]];
        const constant=[sumY,sumXY];
        const result=gaussJordan(coeffic,constant,2);
        console.log("result"+result);
        setresultlinear(result[0]+result[1]*value);
    };
    const calpolynomair=()=>{
        const value=xpolynomial,x=[...xarr],y=[...yarr];
        var order=npolynomial;
        var coffic=Array.from({length:order},()=>Array(order).fill(0));
        var constant=Array(order).fill(0);var sumX=0;
        //cofficient
        for(let i=0;i<order;i++){
            for(let j=0;j<order;j++){
                sumX=0;
                for(let k=0;k<n;k++){
                    sumX+=Math.pow(x[k],i+j);
                }
                coffic[i][j]=sumX;
            }
        }
        //constant
        for(let i=0;i<order;i++){
            var sumXY=0;
            for(let j=0;j<n;j++){
                sumXY+=y[j]*Math.pow(x[j],i);
            }
            constant[i]=sumXY;
        }
        var result=gaussJordan(coffic,constant,order+1);
        var ans=0;
        for(let i=0;i<order;i++){
            ans=ans+result[i]*Math.pow(value,i);
        }
        console.log(result)
        setresultpolynomial(ans);
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
        <h2>f(x)</h2>
      </th>
    </tr>
  </thead>
  
  <tbody>
    {Array.from({ length: n }, (_, index) => (
      <tr key={index} className="mt-6">
        <td>
            
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
    <h3>Linear REGRESSION </h3>
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
    <h3>Polynomial REGRESSION </h3>
          <div className="point">
            <h6 className="point-h6">x :</h6>
          <input
        type="text"
        onChange={(e) => inputxpolynomiar(e)}
        className="form-control"
      />    
      <h6 className="point-h6">n :</h6>
          <input
        type="text"
        onChange={(e) => inputnpolynomiar(e)}
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
export default LINEARREGRESSION;