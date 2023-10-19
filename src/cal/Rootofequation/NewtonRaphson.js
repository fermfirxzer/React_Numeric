import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate,parse,derivative } from 'mathjs'

const NewtonRaphson=()=>{
    const [xnew,setxnew]=useState(0);
    const [x,setx]=useState(0);
    const [Equation, setEquation] = useState("(x^2)-7");
    const [data,setData]=useState([]);
    const [html, setHtml] = useState([]);
    const [Count, setCount] = useState(0);
    const inputxnew = (event) => {
        console.log(event.target.value);
        setxnew(event.target.value);
    }
    const inputEquation = (event) => {
        console.log(event.target.value);
        setEquation(event.target.value);
    }
    const calculateRoot = () => {
        const newData=[];
        setCount(0);
        setx(0);
        CalNewtonRaphon(xnew);
        setData(newData);
        setHtml(print());
    }
    const print = () => {
        console.log(data);
        return (
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">iteration</th>
                            <th width="35%">xold</th>
                            <th width="35%">xnew</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{element.iteration}</td>
                                    <td>{element.xold}</td>
                                    <td>{element.xnew}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        );
    }
    const CalNewtonRaphon=(xnew)=>{
        var expr=parse(Equation);
        var df=derivative(expr,'x');
        var dfFunction=new Function('x',`return ${df}` );
        var xn_new=xnew,xn_old=0;
        var e=0.000001,count=0;
        while(Math.abs((xn_new-xn_old)/xn_new)*100>e){
            xn_old=xn_new;
            xn_new=xn_new-evaluate(Equation,{x:xn_new})/dfFunction(xn_new);
            count++;
            var obj = {
                iteration: count,
                xnew: xn_new,
                xold: xn_old,
            };
            data.push(obj);
        }
        setCount(count);
        setx(xn_new);
        console.log("answer :");
        console.log(xn_new);
    }
    
    return (
        <Container>
            <Form.Group className="mb-3">
                <Form.Label>NewtonRaphson : Input f(x)</Form.Label>
                <input type="text" id="equation" value={Equation} onChange={inputEquation} className="form-control"></input>
                <Form.Label>Input : x</Form.Label>
                <input type="number" id="x" value={xnew} onChange={inputxnew} className="form-control"></input>
                <Button variant="dark" onClick={calculateRoot}>Calculate</Button>
                
            </Form.Group>
            <br></br>
            <h5>Answer = {x.toPrecision(7)}</h5>
            <h5>จำนวนรอบ = {Count}</h5>
            <Container>
                {html}
            </Container>
        </Container>
    )
    }
export default NewtonRaphson;