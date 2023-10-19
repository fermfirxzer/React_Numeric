import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate} from 'mathjs'

const Lagange=()=>{
    const [xarr, setxarr] = useState([0,20000,40000,60000,80000]);
    const [yarr, setyarr] = useState([9.81, 9.7487, 9.6879, 9.6879, 9.5682]);
    const [linear, setlinear] = useState([0,4]);
    const [quardratic, setquardratic] = useState([0,2,4]);
    const [polynomial, setpolynomial] = useState([0,1,2,3,4]);
    const [xlinear,setxlinear]=useState(42235);
    const [xquardratic,setxquardratic]=useState(42235);
    const [xpolynomial,setxpolynomial]=useState(42235);
    const [resultlinear,setresultlinear]=useState(null);
    const [resultquardratic,setresultquardratic]=useState(null);
    const [resultpolynomial,setresultpolynomial]=useState(null);
    const inputxarr = (event) => {
        const value = event.target.value;
        setxarr(value.split(','));
    }
    const inputyarr = (event) => {
        const value = event.target.value;
        setyarr(value.split(','));
    }
    const inputlinear = (e) => {
        const value = e.target.value.split(',');
        setlinear(value)
    }
    const inputxlinear = (e) => {
        setxlinear(e.target.value)
    }
    const inputquardratic = (e) => {
        const value = e.target.value.split(',');
        setquardratic(value)
    }
    const inputxquardratic = (e) => {
        setxquardratic(e.target.value)
    }
    const inputpolynomiar = (e) => {
        const value = e.target.value.split(',');
        setpolynomial(value)
    }
    const inputxpolynomiar = (e) => {
        setxpolynomial(e.target.value)
    }
    function lagrange_recursive(X,Y,n,x) {
        let sum = 0.0;
        for (let i = 0; i <= n; i++) {
            let term = Y[i];
            for (let j = 0; j <= n; j++) {
                if (i !== j) {
                    term *= (X[j] - x) / (X[j] - X[i]);
                }
            }
            sum += term;
        }
        return sum;
    }
    
    const callinear=()=>{
        var p1=linear[0];var p2=linear[1];
        const x = [xarr[p1],xarr[p2]];
        const y = [yarr[p1],yarr[p2]];const n = 1;
        setresultlinear(lagrange_recursive(x,y,n,xlinear));
    }
    const calquardratic=()=>{
        var p1=quardratic[0],p2=quardratic[1],p3=quardratic[2];
        const x = [xarr[p1],xarr[p2],xarr[p3]];
        const y = [yarr[p1],yarr[p2],yarr[p3]];const n = 2;
        setresultquardratic(lagrange_recursive(x,y,n,xquardratic))
    }
    const calpolynomair=()=>{
        var p1=polynomial[0],p2=polynomial[1],p3=polynomial[2],p4=polynomial[3],p5=polynomial[4];
        const x = [xarr[p1],xarr[p2],xarr[p3],xarr[p4],xarr[p5]];
        const y = [yarr[p1],yarr[p2],yarr[p3],yarr[p4],yarr[p5]];const n = 4;
        setresultpolynomial(lagrange_recursive(x,y,n,xquardratic))
    }
    return (
        <Container>
            
                <div className="row">
                    <div className="col-md-6">
                        <Form.Label>Input : X</Form.Label>
                        <input type="text"  value={xarr} onChange={inputxarr} className="form-control" />
                    </div>
                    <div className="col-md-6">
                        <Form.Label>Input : Y</Form.Label>
                        <input type="text"  value={yarr} onChange={inputyarr} className="form-control" />
                    </div>
                </div>
            

                <Form.Label>Linear Interpolation</Form.Label>
                <div className="row mt-4">
                    <div className="col-md-2 mt-1">
                        <Form.Label>Input X :</Form.Label>
                    </div>
                    <div className="col-md-2">

                        <input type="text"  value={xlinear} onChange={inputxlinear} className="form-control" />
                    </div>
                    <div className="row mt-4">
                    <div className="col-md-2 mt-1">
                        <Form.Label>Input point :</Form.Label>
                    </div>
                    <div className="col-md-2">
                        <input type="text" value={linear} onChange={inputlinear} className="form-control" />
                    </div>
                </div>
                </div>
                <div className="mt-4">
                    <Button variant="dark" onClick={callinear}>callinear</Button>
                </div>
                {resultlinear !== null && (
                <div className="mt-4">
                    <p>Result: {resultlinear}</p>
                </div>)}
                <div className="row mt-4">
                    <div className="col-md-2 mt-1">
                        <Form.Label>Input X :</Form.Label>
                    </div>
                    <div className="col-md-2">

                        <input type="text"  value={xlinear} onChange={inputxquardratic} className="form-control" />
                    </div>
                    <div className="row mt-4">
                    <div className="col-md-2 mt-1">
                        <Form.Label>Input point :</Form.Label>
                    </div>
                    <div className="col-md-2">
                        <input type="text" value={quardratic} onChange={inputquardratic} className="form-control" />
                    </div>
                </div>
                </div>
                <div className="mt-4">
                    <Button variant="dark" onClick={calquardratic}>calquardratic</Button>
                </div>
                {resultquardratic !== null && (
                <div className="mt-4">
                    <p>Result: {resultquardratic}</p>
                </div>)}
                <div className="row mt-4">
                    <div className="col-md-2 mt-1">
                        <Form.Label>Input X :</Form.Label>
                    </div>
                    <div className="col-md-2">

                        <input type="text"  value={xpolynomial} onChange={inputxpolynomiar} className="form-control" />
                    </div>
                    <div className="row mt-4">
                    <div className="col-md-2 mt-1">
                        <Form.Label>Input point :</Form.Label>
                    </div>
                    <div className="col-md-2">
                        <input type="text" value={polynomial} onChange={inputpolynomiar} className="form-control" />
                    </div>
                </div>
                </div>
                <div className="mt-4">
                    <Button variant="dark" onClick={calpolynomair}>calpolynomair</Button>
                </div>
                {resultpolynomial !== null && (
                <div className="mt-4">
                    <p>Result: {resultpolynomial}</p>
                </div>)}


        </Container>
    )

}
export default Lagange;