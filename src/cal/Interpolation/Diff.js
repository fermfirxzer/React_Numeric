import { evaluate, derivative } from "mathjs";
import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";

const Diff = () => {
  const [n, setn] = useState(0);
  const [x, setx] = useState(0);
  const [h, seth] = useState(0);
  const [firsthtml, setfirsthtml] = useState(null);
  const [secondhtml,setsecondhtml]=useState(null);
  const [equation, setEquation] = useState("e^x");
  const [selectedOption, setSelectedOption] = useState("h"); // กำหนดค่าเริ่มต้นให้เป็น "h"
  const inputx = (e) => {
    setx(e.target.value)
  };

  const inputh = (e) => {
    const value=e.target.value;
    seth(value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const fx=(x)=>{
    return evaluate(equation,{x:x});
  }
  const CalFristdivided = () => {
    
    var X=parseFloat(x);
    var H=parseFloat(h);
    const actualValue = evaluate(equation, { x: X });
    if (selectedOption === "h") { 
      var x1_f = X + H,
        x1_b = X,
        x1_c = X + H;
      var x0_f = X,
        x0_b = X - H,
        x0_c = X - H;
        
      var forward_divided =(evaluate(equation, { x: x1_f }) - evaluate(equation, { x: x0_f })) / h;
      var Backward_divided =(evaluate(equation, { x: x1_b }) - evaluate(equation, { x: x0_b })) / h;
      var Central_divided =(evaluate(equation, { x: x1_c }) - evaluate(equation, { x: x0_c })) /(2*h);
    } else {
        var x2_f=X+2*H,x1_f=X+H,x0_f=X;
        var x2_b=X,x1_b=X-H,x0_b=X-H-H;
        var x2_c=X+H+H,x1_c=X+H,x0_c=X-H,x3_c=X-2*H;
        var forward_divided =(-evaluate(equation, { x: x2_f }) + 4*evaluate(equation, { x: x1_f })-3*evaluate(equation, { x: x0_f }))/(2*H)
        var Backward_divided =(3*evaluate(equation, { x: x2_b }) - 4*evaluate(equation, { x: x1_b })+evaluate(equation, { x: x0_b }))/(2*H)
        var Central_divided =(-evaluate(equation, { x: x2_c }) + 8*evaluate(equation, { x: x1_c })-8*evaluate(equation, { x: x0_c })+evaluate(equation, { x: x3_c }))/(12*H)
    }
    var error_forward=((actualValue-forward_divided)/actualValue)*100;
    var error_Backward=((actualValue-Backward_divided)/actualValue)*100;
    var error_Central=((actualValue-Central_divided)/actualValue)*100;
    console.log(actualValue)
    setfirsthtml(
        <div>
            <h4>First Derivative {selectedOption} :{h}</h4>
          <h5>forward_divided :{forward_divided.toFixed(2)} Error :{error_forward.toFixed(2)}</h5>
          <h5>Backward_divided :{Backward_divided.toFixed(2)} Error :{error_Backward.toFixed(2)}</h5>
          <h5>Central_divided :{Central_divided.toFixed(2)} Error :{error_Central.toFixed(2)}</h5>
        </div>
      );
  };
  const CalSecondDerivative = () => {
    
    var X=parseFloat(x);
    var H=parseFloat(h);
    const actualValue = evaluate(equation, { x: X });
    if (selectedOption === "h") { 
      var x2_f=X+2*H,x1_f=X +H,x0_f=X;
      var x2_b=X,x1_b=X-H,x0_b=X-2*H;
      var x2_c=X+H,x1_c=X,x0_c=X-H;
      var forward_divided =(evaluate(equation, { x: x2_f }) - 2*evaluate(equation, { x: x1_f })+evaluate(equation, { x: x0_f }))/(H*H)
      var Backward_divided =(evaluate(equation, { x: x2_b }) - 2*evaluate(equation, { x: x1_b })+evaluate(equation, { x: x0_b }))/(H*H)
      var Central_divided =(evaluate(equation, { x: x2_c }) -2*evaluate(equation, { x: x1_c })+evaluate(equation, { x: x0_c }))/(H*H)
    } else {
        var x3_f=X+3*H,x2_f=X+2*H,x1_f=X+H,x0_f=X;
        var x3_b=X,x2_b=X-H,x1_b=X-2*H,x0_b=X-3*H;
        var x4_c=X+2*H,x3_c=X+H,x2_c=X,x1_c=X-H,x0_c=X-2*H;
        var forward_divided =(-evaluate(equation, { x: x3_f }) + 4*evaluate(equation, { x: x2_f })-5*evaluate(equation, { x: x1_f })+2*evaluate(equation, { x: x0_f }))/(H*H);
        var Backward_divided =(2*evaluate(equation, { x: x3_b }) - 5*evaluate(equation, { x: x2_b })+4*evaluate(equation, { x: x1_b })-evaluate(equation, { x: x0_b }))/(H*H);
        var Central_divided =(-evaluate(equation, { x: x4_c }) + 16*evaluate(equation, { x: x3_c })-30*evaluate(equation, { x: x2_c })+16*evaluate(equation, { x: x1_c })-evaluate(equation, { x: x0_c }))/(12*h);
    }
    var error_forward=((actualValue-forward_divided)/actualValue)*100;
    var error_Backward=((actualValue-Backward_divided)/actualValue)*100;
    var error_Central=((actualValue-Central_divided)/actualValue)*100;
    console.log(actualValue)
    setsecondhtml(
        <div>
            <h4>Second Derivative {selectedOption} :{h}</h4>
          <h5>forward_divided :{forward_divided.toFixed(2)} Error :{error_forward.toFixed(2)}</h5>
          <h5>Backward_divided :{Backward_divided.toFixed(2)} Error :{error_Backward.toFixed(2)}</h5>
          <h5>Central_divided :{Central_divided.toFixed(2)} Error :{error_Central.toFixed(2)}</h5>
        </div>
      );
  };

  const inputequation = (e) => {
    setEquation(e.target.value);
  };
  const pull=async()=>{
    const res=await fetch("http://localhost:3000/diff")
    const data=await res.json();
    console.log(data)
    setEquation(data[0].Diffequation);
    setx(data[0].x)
    seth(data[0].h);
  }
  return (
    <>
      <Container>
        <div className="row-mb-6">
          <Form.Label>Input : Equation</Form.Label>
          <input type="text" value={equation} onChange={inputequation} className="form-control" />
          <div className="col-1">
            <Form.Label>Input : X</Form.Label>
            <input type="text" value={x} onChange={inputx} className="form-control"></input>
            <Form.Label>Input : h</Form.Label>
            <input type="text" value={h} onChange={inputh} className="form-control"></input>

          </div>
          <Button variant="dark" onClick={CalFristdivided}>
            Diff
          </Button>
          <Button variant="dark" onClick={CalSecondDerivative}>Diff Second</Button>
          <Button variant="dark" onClick={pull}>ดึงข้อมูล</Button>
        </div>
      </Container>
      <Container>
        <Form.Label>Select an option:</Form.Label>
        <div className="form-check">
          <input
            type="radio"
            value="h"
            checked={selectedOption === "h"}
            onChange={handleOptionChange}
            className="form-check-input"
          />
          <label htmlFor="option1" className="form-check-label">
            h
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            name="options"
            id="option2"
            value="hSquared"
            checked={selectedOption === "hSquared"}
            onChange={handleOptionChange}
            className="form-check-input"
          />
          <label htmlFor="option2" className="form-check-label">
            h^2
          </label>
        </div>
        {firsthtml}
        
        {secondhtml}
      </Container>
    </>
  );
};

export default Diff;
