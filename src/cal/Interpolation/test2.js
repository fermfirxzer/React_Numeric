import React from "react";
import { Link } from 'react-router-dom';
const test2=()=>{
    return(
        <>
        <div class="container">
            <h5 style={{textAlign:"center"}}>Numerical</h5>
        <div class="row">
            <div class="col-sm-4">
            <ui>
                <h5>Rootofequation</h5>
                <li><Link to="url">GrapicalMethod</Link></li>
                <li><Link to="url">Bisection</Link></li>
                <li><Link to="url">Falseposition</Link></li>
                <li><Link to="url">Onepointiteration</Link></li>
                <li><Link to="url">NewtonRaphson</Link></li>
                <li><Link to="url">Secantmethod</Link></li>
            </ui>
            </div>
            <div class="col-sm-4">
                <h5>Matrix</h5>
                <ui>
                    <li><Link to="url">CramerRule</Link></li>
                    <li><Link to="url">Gausselimination</Link></li>
                    <li><Link to="url">Gauss_jordan</Link></li>
                    <li><Link to="url">MatrixInverse</Link></li>
                    <li><Link to="url">LU Decompos</Link></li>
                    <li><Link to="url">Jacobi</Link></li>
                    <li><Link to="url">Gauss_seidel</Link></li>
                    <li><Link to="url">Conjugate</Link></li>
                </ui>
                </div> 
            <div class="col-sm-4">
                <h5>INTERPOLATION</h5>
                <ui>
                    <li><Link to="url">Linear Interpolation</Link></li>
                    <li><Link to="url">Lagange</Link></li>
                    <li><Link to="url">Linear REGRESSION</Link></li>
                    <li><Link to="url">Splines</Link></li>
                    <h5>Integration&&Diff</h5>
                    <li><Link to="url">Diff</Link></li>
                    <li><Link to="url">Integration</Link></li>
                </ui>
            </div> 
        </div>
            
        </div>
        </>
    )
}
export default test2;