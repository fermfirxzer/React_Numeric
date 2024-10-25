import { useState } from "react";
import { Table,Container, Button } from "react-bootstrap";
import { evaluate, help } from "mathjs";
import Plot from "react-plotly.js";
import { colors } from "@mui/material";
import nerdamer from "nerdamer/all.js";
const Test1=()=>{
  const [equation,setEquation]=useState("x^3");
  const [n,setn]=useState(2);
  const [a,seta]=useState(2);
  const [b,setb]=useState(8);
  const [xarr,setxarr]=useState([]);
  const [yarr,setyarr]=useState([]);
  const [result,setresult]=useState(0);
  const [subTrapzoids,setsubTrapzoids]=useState([]);
  const inputn=(e)=>{
    setn(e.target.value)
    setxarr([]);
    setyarr([]);
  }
  const inputa=(e)=>{
    seta(e.target.value)
  }
  const inputb=(e)=>{
    setb(e.target.value)
  }
  const inputequation=(e)=>{
    setEquation(e.target.value)
  }
  const calculateSubTrapezoids=()=>{
    const h=(b-a)/n;
    const subTrapzoids=[];
    for(let i=a;i<b;i=i+0.1){
      const x0=i;
      const x1=i;
      const y0=evaluate(equation,{x:x0})
      const y1=evaluate(equation,{x:x1})
      subTrapzoids.push(
        {x:x0,y:y0},
      )
    }
    return subTrapzoids;
  }
  const cal=()=>{
    // console.log("dada")
    // console.log(calculateSubTrapezoids())
    var x0=parseFloat(a),x1=parseFloat(b);
    var h=(b-a)/n;
    var tempxarr=[];var fxi=0;
    var tempyarr=[];var sum=0;
    var fx0=parseFloat(evaluate(equation,{x:x0}));
    tempxarr.push(x0)
    tempyarr.push(fx0)
    var fx1=parseFloat(evaluate(equation,{x:x1}));
    for(let i=a+h;i<b;i=i+h){
      var xi=i;
      fxi=parseFloat(evaluate(equation,{x:xi}))
      sum+=fxi;
      console.log(xi)
      tempxarr.push(xi)
      tempyarr.push(fxi)
    }
    tempxarr.push(x1)
    tempyarr.push(fx1)
    var I=(h/2)*(fx0+fx1+2*sum)
    var indigate=nerdamer(`integrate(${equation},x)`);
    console.log(indigate.toString())
    var realvalue=evaluate(indigate.toString(),{x:x1})-evaluate(indigate.toString(),{x:x0});
    var error=((realvalue-I)/realvalue)*100
    console.log(realvalue);
    setxarr(tempxarr)
    setyarr(tempyarr)
    setsubTrapzoids(calculateSubTrapezoids())
    setresult(
      <>
      <h5>ans :{I}</h5>
      <h5>realans :{realvalue}</h5>
       <h5> Error: {error}</h5>
      </>
      );
  }
  const pull=async()=>{
    const res=await fetch("http://localhost:3000/rootofequation/Test1");
    const data=await res.json();
    console.log(data);
    setEquation(data[0].Equation);
    seta(data[0].A)
    setb(data[0].B)
    setn(data[0].N)
  }
  return (
    <>
    <Container>
      <label>input equation:</label>
      <input type="text"value={equation}onChange={inputequation}className="form-control"></input>
      <label>input A:</label>
      <input type="text"value={a}onChange={inputa}className="form-control"></input>
      <label>input B:</label>
      <input type="text"value={b}onChange={inputb}className="form-control"></input>
      <h3>Composite Trapzodal</h3>
      <label>input N:</label>
      <input type="text"value={n}onChange={inputn}className="form-control"></input>
      <Button variant="dark" onClick={cal}>Cal</Button>
      <Button variant="dark" onClick={pull}>ดึงข้อมูล</Button>
      {n>0&&(
        <>
        <Table>
          <tbody>
          <td>x</td>
            {xarr.map((row,rowindex)=>(
              <td>
                {xarr[rowindex]}
              </td>
            ))} 
          </tbody>
          <tbody>
            <td>f(x)</td>
          {yarr.map((row,rowindex)=>(
              <td>
                {yarr[rowindex]}
              </td>
            ))}
          </tbody>
        </Table>
        {result}
        </>
      )}
      <Plot 
      data={[
        {
        x:xarr,
        y:yarr,
        fill:'tozeroy',
        type:'scatter',
        fillcolor:'rgba(0,128,0,0.2',
        },
        {
          x:subTrapzoids.map((point)=>point.x),
          y:subTrapzoids.map((point)=>point.y),
          type:'scatter',
          mode:'lines',
          marker:{color:'red'},
      
          },
        // ...calculateSubTrapezoids().map((trapezoid,index)=>({
        //   x:trapezoid.map((point)=>point.x),
        //   y:trapezoid.map((point)=>point.y),
        //   type:'scatter',
        //   mode:'lines+markers',
        //   marker:{color:'red'},    
    ]} 
      layout={{width:1000,height:800,title:"indigate"}}/>
    </Container>
    </>
  )
}
export default Test1;