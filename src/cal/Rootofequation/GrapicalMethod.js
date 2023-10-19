import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs';

const GrapicalMethod = () => {
    const [x1, setx1] = useState();
    const [x2, setx2] = useState();
    const [Equation, setEquation] = useState("(x*43)-180");
    const [html, setHtml] = useState(null);
    const [data, setData] = useState([]);
    const [Count, setCount] = useState(0);
    const [x,setx]=useState(0);
    const inputx1 = (event) => {
        console.log(event.target.value)
        setx1(event.target.value);
    }

    const inputx2 = (event) => {
        console.log(event.target.value)
        setx2(event.target.value);
    }

    const inputEquation = (event) => {
        console.log(event.target.value);
        setEquation(event.target.value);
    }

    const calculateRoot = () => {
        const newData=[];
        setCount(0);
        CalGrapicalMethod(x1, x2,newData);
        setData(newData);
        // setHtml(print());
    }

    const print = () => {
        console.log(data);
        return (
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">iteration</th>
                            <th width="35%">x1</th>
                            <th width="35%">x2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{element.iteration}</td>
                                    <td>{element.x1}</td>
                                    <td>{element.x2}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        );
    }

    const CalGrapicalMethod = (x1, x2,newData) => {
        var iter = 0,x_old=0,x_new=0;
        var count=0;
        var fx1, fx2, fxnew, fxold;
        const e = 0.000001;
        for (var i = x1; i <= x2; i++) {
            count++;
            fx1 = evaluate(Equation, { x: i });
            fx2 = evaluate(Equation, { x: i + 1 });
            if (fx1 * fx2 < 0) {
                var x_new = i;
                fxnew = evaluate(Equation, { x: x_new });
                fxold = evaluate(Equation, { x: x_old });
                while ((fxnew * fxold) > 0) {
                    iter += 1;count++;
                    x_old = x_new;
                    x_new = x_new + e;
                    fxnew = evaluate(Equation, { x: x_new });
                    fxold = evaluate(Equation, { x: x_old });
                    if (iter <= 30) {
                        var obj = {
                            iteration: iter,
                            x1: x_old,
                            x2: x_new,
                        };
                        data.push(obj);
                    }
                }
                break;
            }
        }
        setCount(count);
        setx(x_old);
        console.log("answer :");
        console.log(x_old);
    }
    return (
        <Container>
            <Form.Group className="mb-3">
                <Form.Label>GrapicalMethod : Input f(x)</Form.Label>
                <input type="text" id="equation" value={Equation} onChange={inputEquation} className="form-control"></input>
                <Form.Label>Input : x1</Form.Label>
                <input type="number" id="x1" value={x1} onChange={inputx1} className="form-control"></input>
                <Form.Label>Input : x2</Form.Label>
                <input type="number" id="x2" value={x2} onChange={inputx2} className="form-control"></input>
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

export default GrapicalMethod;
