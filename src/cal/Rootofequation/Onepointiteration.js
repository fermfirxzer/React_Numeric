import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'

const Onepointiteration=()=>{
    const [xn,setxn]=useState(0);
    const [x,setx]=useState(0);
    const [Equation, setEquation] = useState("(x+1)/3.0");
    const [data,setData]=useState([]);
    const [html, setHtml] = useState([]);
    const [Count, setCount] = useState(0);
    const inputxn = (event) => {
        const value = parseFloat(event.target.value);
        setxn(value);
    }
    const inputEquation = (event) => {
        console.log(event.target.value);
        setEquation(event.target.value);
    }
    const calculateRoot = () => {
        const newData=[];
        setCount(0);
        setx(0);
        CalOnepointiteration(xn);
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
                            <th width="35%">xn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{element.iteration}</td>
                                    <td>{element.xold}</td>
                                    <td>{element.xn}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        );
    }
    const CalOnepointiteration=(xn)=>{
        var xn_new=evaluate(Equation,{x:xn});
        var xn_old=0;
        var e=0.001,count=0;
        var obj = {
            iteration: count,
            xn: xn_new,
            xold: xn_old,
        };
        data.push(obj);
        while(Math.abs((xn_new-xn_old)/xn_new)*100>e){
            count++;
            xn_old=xn_new;
            xn_new=evaluate(Equation,{x:xn_new});
            var obj = {
                iteration: count,
                xn: xn_new,
                xold: xn_old,
            };
            data.push(obj);
            console.log("xn :")
            console.log(xn_new);
           
        }
        setCount(count);
        setx(xn_new);
        console.log("answer :");
        console.log(xn_new);
    }
    
    return (
        <Container>
            <Form.Group className="mb-3">
                <Form.Label>Onepointiteration : Input f(x)</Form.Label>
                <input type="text" id="equation" value={Equation} onChange={inputEquation} className="form-control"></input>
                <Form.Label>Input : xl</Form.Label>
                <input type="number" id="xn" value={xn} onChange={inputxn} className="form-control"></input>
                <Button variant="dark" onClick={calculateRoot}>Calculate</Button>
            </Form.Group>
            <br></br>
            <h5>Answer = {x.toPrecision(2)}</h5>
            <h5>จำนวนรอบ = {Count}</h5>
            <Container>
                {html}
            </Container>
        </Container>
    )
    }
export default Onepointiteration;