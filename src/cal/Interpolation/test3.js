import { ClassNames } from "@emotion/react";
import { evaluate } from "mathjs";
import { useState } from "react"
import { Button, Container,Table } from "react-bootstrap";
import Plot from "react-plotly.js";
const Test3=()=>{
    const [equation,setEquation]=useState("");
    const [a,seta]=useState(0);
    const [b,setb]=useState(0);
    const [n,setn]=useState(0);
    const [result,setresult]=useState(0);
    const [xarr,setxarr]=useState([]);
    const [yarr,setyarr]=useState([]);
    const [html,sethtml]=useState(null);
    const inputequation=(e)=>{
        setEquation(e.target.value)
    }
    const inputa=(e)=>{
        seta(e.target.value);
    }
    const inputb=(e)=>{
        setb(e.target.value);
    }
    const inputn=(e)=>{
        setn(e.target.value);
        setxarr([]);
        setyarr([]);
    }
    const cal=(e)=>{
        var x0=parseInt(a),x1=parseInt(b),sum=0;
        var h=(b-a)/n;
        
        var tempxarr=[],tempyarr=[];
        var fx0=evaluate(equation,({x:x0}));
        var fx1=evaluate(equation,({x:x1}));
        tempxarr.push(x0);
        tempyarr.push(fx0);
        for(let i=1;i<n;i++){
            var xi=x0+(i*h);
            console.log(xi)
            sum=evaluate(equation,({x:xi}))+sum;
            tempxarr.push(xi);
            tempyarr.push(evaluate(equation,({x:xi})));
        }
        tempxarr.push(x1);
        tempyarr.push(fx1);
        var I=(h/2)*(fx1+fx0+2*sum);
        setresult(
            <h5>Ans :{I}</h5>
        )
        setxarr(tempxarr)
        setyarr(tempyarr)
        console.log(xarr)
        console.log(yarr)
    }
    return (
       <>
        <Container>
            <label>input equation :</label>
            <input type="text" value={equation} onChange={inputequation}className="form-control"></input>
            <label>input a :</label>
            <input type="text" value={a} onChange={inputa}className="form-control"></input>
            <label>input b :</label>
            <input type="text" value={b} onChange={inputb}className="form-control"></input>
            <h3>Composite Trapzodal</h3>
            <label>input n :</label>
            <input type="text" value={n} onChange={inputn}className="form-control"></input>
            
            <Button onClick={cal}>calComposite</Button>
            {n>0&&(
            <Table>
                {/* <thead>

                {xarr.map((row,rowindex)=>(
                    <th>
                    x :{rowindex}
                    </th>
                ))}
                </thead> */}
                <tbody>
                    <td>
                        x:
                    </td>
                {xarr.map((row,rowindex)=>(
                    <td>
                    {xarr[rowindex]}
                    </td>
                ))}
        
                </tbody>
                <tbody>
                    <td>
                        f(x) :
                    </td>
                {yarr.map((row,rowindex)=>(
                    <td>
                    {yarr[rowindex]}
                    </td>
                ))}
                </tbody>
            </Table>
        )}
        {result}
        <Plot data={[{
            x:xarr,
            y:yarr,
            type:"scatter",
            mode:"lines+markers",
            marker:{color:'red'},
        },]
    }   layout={{width:1000,height:800,title:'Indigate'}}
        />
        </Container>
    
        </>
    )
}
export default Test3;