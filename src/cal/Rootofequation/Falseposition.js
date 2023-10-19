import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'

const Falseposition=()=>{
    const [xl,setxl]=useState(0);
    const [xr,setxr]=useState(0);
    const [x,setx]=useState(0);
    const [Equation, setEquation] = useState("(x^4)-13");
    const [data,setData]=useState([]);
    const [html, setHtml] = useState([]);
    const [Count, setCount] = useState(0);
    const inputxl = (event) => {
        setxl(event.target.value);
    }
    const inputxr = (event) => {
        console.log(event.target.value)
        setxr(event.target.value);
    }
    const inputEquation = (event) => {
        console.log(event.target.value);
        setEquation(event.target.value);
    }
    const calculateRoot = () => {
        const newData=[];
        setCount(0);
        setx(0);
        CalFalseposition(xl,xr);
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
                            <th width="35%">xl</th>
                            <th width="35%">xr</th>
                            <th width="35%">x1</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{element.iteration}</td>
                                    <td>{element.xl}</td>
                                    <td>{element.xr}</td>
                                    <td>{element.x1}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        );
    }
    const CalFalseposition=(xl,xr)=>{
        var x1=0,x1_old=0,fxl,fxr,fx1;
        var xl_new=xl,xr_new=xr;
        var e=0.000001,count=0;
        fxl=evaluate(Equation,{x:xl_new});
        fxr=evaluate(Equation,{x:xr_new});
        x1=(xl_new*fxr-xr_new*fxl)/(fxr-fxl);
        while(Math.abs((x1-x1_old)/x1)*100>e){
            fx1=evaluate(Equation,{x:x1});
            if(fx1*fxr>0){
                xr_new=x1;
            }
            else{
                xl_new=x1;
            }
            count++;
            x1_old=x1;
            fxl=evaluate(Equation,{x:xl_new});
            fxr=evaluate(Equation,{x:xr_new});
            x1=(xl_new*fxr-xr_new*fxl)/(fxr-fxl);
            var obj = {
                iteration: count,
                xl: xl_new,
                xr: xr_new,
                x1: x1,
            };
            data.push(obj);
            console.log("x1 :")
            console.log(x1);
        }
        setCount(count);
        setx(x1);
        console.log("answer :");
        console.log(x1);
    }
    
    return (
        <Container>
            <Form.Group className="mb-3">
                <Form.Label>Falseposition : Input f(x)</Form.Label>
                <input type="text" id="equation" value={Equation} onChange={inputEquation} className="form-control"></input>
                <Form.Label>Input : xl</Form.Label>
                <input type="number" id="xl" value={xl} onChange={inputxl} className="form-control"step="any"></input>
                <Form.Label>Input : xr</Form.Label>
                <input type="number" id="xr" value={xr} onChange={inputxr} className="form-control"step="any"></input>
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
export default Falseposition;