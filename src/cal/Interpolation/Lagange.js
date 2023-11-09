import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { lagrange_recursive } from "./CalInterpolation";
const Lagange=()=>{
    const [xarr, setxarr] = useState([0,20000,40000,60000,80000]);
    const [yarr, setyarr] = useState([9.81, 9.7487, 9.6879, 9.6879, 9.5682]);
    const [linear, setlinear] = useState([0,4]);
    const [quardratic, setquardratic] = useState([0,2,4]);
    const [polynomial, setpolynomial] = useState([0,1,2,3,4]);
    const [targetX,settargetX]=useState(42235);
    const [resultlinear,setresultlinear]=useState(null);
    const [resultquardratic,setresultquardratic]=useState(null);
    const [resultpolynomial,setresultpolynomial]=useState(null);
    const [solution,setsolution]=useState(0);
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
    const inputtargetX = (e) => {
        settargetX(e.target.value)
    }
    const inputquardratic = (e) => {
        const value = e.target.value.split(',');
        setquardratic(value)
    }
    const inputpolynomiar = (e) => {
        const value = e.target.value.split(',');
        setpolynomial(value)
    }
    const handleSelectChange=(e)=>{
        setsolution(e.target.value);
    }
    const callinear=()=>{
        var p1=linear[0];var p2=linear[1];
        const x = [xarr[p1],xarr[p2]];
        const y = [yarr[p1],yarr[p2]];const n = 1;
        setresultlinear(lagrange_recursive(x,y,n,targetX));
    }
    const calquardratic=()=>{
        var p1=quardratic[0],p2=quardratic[1],p3=quardratic[2];
        const x = [xarr[p1],xarr[p2],xarr[p3]];
        const y = [yarr[p1],yarr[p2],yarr[p3]];const n = 2;
        setresultquardratic(lagrange_recursive(x,y,n,targetX))
    }
    const calpolynomair=()=>{
        var p1=polynomial[0],p2=polynomial[1],p3=polynomial[2],p4=polynomial[3],p5=polynomial[4];
        const x = [xarr[p1],xarr[p2],xarr[p3],xarr[p4],xarr[p5]];
        const y = [yarr[p1],yarr[p2],yarr[p3],yarr[p4],yarr[p5]];const n = 4;
        setresultpolynomial(lagrange_recursive(x,y,n,targetX))
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
            
        
        <select class="form-select"onChange={handleSelectChange} style={{marginTop:"10px"}}>
            <option selected>Open this</option>
            <option value="1">Linear</option>
            <option value="2">Quadratic</option>
            <option value="3">Polynomial</option>
        </select>
            {solution==1&&(
               <div>
               <Form.Label>Linear Interpolation</Form.Label>
                   <Form.Label>Input X :</Form.Label>
                 
                   <input type="text" value={targetX} onChange={inputtargetX} className="form-control" />
                   <Form.Label>Input point :</Form.Label>
                   <input type="text" value={linear} onChange={inputlinear} className="form-control" />
                 <Button variant="dark" onClick={callinear}>callinear</Button>
               
               {resultlinear !== null && (
                 <div className="mt-4">
                   <p>Result: {resultlinear}</p>
                 </div>
               )}
             </div>
             )}
             {solution==2&&(
                <div>
                    <Form.Label>Input X :</Form.Label>
                    <input type="text" value={targetX}onChange={inputtargetX}className="form-control"></input>
                    <Form.Label>Input point :</Form.Label>
                    <input type="text"value={quardratic} onChnage={inputquardratic}className="form-control"></input>
                    <Button variant="dark" onClick={calquardratic}>calquardratic</Button>
                
                {resultquardratic !=null&&(
                    <div className="mt-4">
                    <p>Result : {resultquardratic}</p>
                    </div>
                )}
                </div>
             )}
            {solution==3&&(
                <div>
                    <Form.Label>Input X :</Form.Label>
                    <input type="text" value={targetX}onChange={inputtargetX}className="form-control"></input>
                    <Form.Label>Input point :</Form.Label>
                    <input type="text" value={polynomial} onChange={inputpolynomiar}className="form-control"></input>
                    <Button variant="dark" onClick={calpolynomair}>calPolynomair</Button>
                    {resultpolynomial !== null && (
                        <div className="mt-4">
                          <p>Result: {resultpolynomial}</p>
                        </div>
                      )}
                    </div>
                    
            )}
                
                
                        
                


        </Container>
    )

}
export default Lagange;