import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import './Interpolation.css';
import { evaluate,integrate } from 'mathjs'
const Integration = () => {
    const [n,setn]=useState(0);
    const [equation,setEquation]=useState("");
    const [p0,setp0]=useState(0);
    const [p1,setp1]=useState(0);
    const [realans,setrealans]=useState(0);
    const [nTrape,setnTrape]=useState(0);
    const [nSimpson,setnSimpson]=useState(0);
    const [Trapezoidal,setTrapezoidal]=useState(null);
    const [CompositeTrape,setCompositeTrape]=useState(null);
    const [Simpson,setSimpson]=useState(null);
    const [CompositeSimpson,setCompositeSimpson]=useState(null);
    const inputnTrape=(e)=>{
      setnTrape(e.target.value);
    }
    const inputnSimpson=(e)=>{
      setnSimpson(e.target.value)
    }
    const inputx0=(e)=>{
      const value=e.target.value
      setp0(value);
    }
    const inputx1=(e)=>{
      const value=e.target.value
      setp1(value);
    }
    const inputequation=(e)=>{
        setEquation(e.target.value);
        // realans=integrate(equation)
    }
    const CalSingleTrapezoidal=()=>{
      const x0=p0;
      const x1=p1;
      const h=x1-x0;
     
      var I=(h/2)*(evaluate(equation,{x:x0})+evaluate(equation,{x:x1}));
      setTrapezoidal(
        <div>
          <h3>I : {I}</h3>
        </div>
      )
    }
    const CalCompositeTrapezoidal=()=>{
      const x0=p0;
      const x1=p1;
      const n=nTrape;
      var h=(x1-x0)/n;
      var I=0;
      for(let i=1;i<n;i++){
        let xi=(x0*i)+h
  
        I+=evaluate(equation,{x:xi});
        console.log(xi);
      }
       I=(h/2)*(evaluate(equation,{x:x0})+evaluate(equation,{x:x1})+I*2);
      setCompositeTrape(
        <div>
          <h3>I : {I}</h3>
        </div>
      )
    }
    const CalSimpson=()=>{
      const x0=parseInt(p0);
      const x1=parseInt(p1);
      var h=((x1-x0)/2);
      h=parseInt(h);
      var f=parseFloat(x0+h);
      console.log(f);
      
      var I=(h/3)*(evaluate(equation,{x:x0})+evaluate(equation,{x:x1})+4*evaluate(equation,{x:x0+h}));
      
      setSimpson(
        <div>
          <h3>I : {I}</h3>
        </div>
      )
    }
    const CalCompositeSimpson=()=>{
      const x0=parseInt(p0);
      const x1=parseInt(p1);
      const n=nSimpson;
      var even=0,odd=0;
      var h=(x1-x0)/n;
      console.log(h);
      for(let i=1;i<n;i++){
        let xi=(x0*i)+h;
        if(i%2==0){
          even+=evaluate(equation,{x:xi});
        }
        else{
          odd+=evaluate(equation,{x:xi});
        }
        
      }
      var I=(h/3)*(evaluate(equation,{x:x0})+evaluate(equation,{x:x1})+4*odd+2*even);
      setCompositeSimpson(
        <div>
          <h3>I :{I}</h3>
        </div>
      )
    }
    const pull=async()=>{
      const res=await fetch("http://localhost:3000/test")
      const data=await res.json()
      console.log(data)
      setEquation(data[0].Eqution)
      setp0(data[0].A)
      setp1(data[0].B)
    }
    return (
        <>        
        <Container>
          <div>
            <div>
              <Form.Label>Input : Integration</Form.Label>
              <input type="text" value={equation} onChange={inputequation} className="form-control" />
            </div>
          </div>
          <h5>ช่วงที่ต้องการ Integration</h5>
          <div className="row">
            <div className="col-2">
              <h6>A :</h6>
              <input type="text" value={p0} onChange={inputx0} className="form-control"></input>
              <h6>B :</h6>
              <input type="text" value={p1} onChange={inputx1} className="form-control"></input>
              <Button variant="dark"onClick={pull}>ดึงข้อมูล</Button>
            </div>
          </div>
          
          <div>
            <h4 className="mt-3">Single Trapezoidal Rule</h4>
            <Button variant="dark" onClick={CalSingleTrapezoidal}>Single Trapezoidal</Button>
            {Trapezoidal}
          </div>
          <div>
            <h4>Composite Trapezoidal Rule</h4>
            <input type="text" onChange={inputnTrape} value={nTrape} className="form-control"></input>
            <Button variant="dark" onClick={CalCompositeTrapezoidal}>Composite Trapezoidal</Button>
            {CompositeTrape}
          </div>
          <div>
            <h4>SIMPSON’S RULE</h4>
            <Button variant="dark" onClick={CalSimpson}>SIMPSON’S RULE</Button>
            {Simpson} 
          </div>
          <div>
            <h4>SIMPSON’S RULE</h4>
            <input type="text" onChange={inputnSimpson} value={nSimpson}className="form-control"></input>
            <Button variant="dark" onClick={CalCompositeSimpson}>COMPOSITE SIMPSON’S RULE</Button>     
            {CompositeSimpson}
          </div>
        </Container></>
      )};
export default Integration;