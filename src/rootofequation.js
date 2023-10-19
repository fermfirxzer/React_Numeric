import React from "react";
import { Link } from 'react-router-dom';
import './rootofequation.css';
function Rootofequation() {
    return (
        <div>
            <div class="jumbotron text-center">
                <h1>Numerical</h1>
            </div>
            <div class="container">
                <div class="row">
                <div class="col-sm-4">
                    <h3>Rootofequation</h3>
                    <ui>
                        <li><Link to="/rootofequation/GrapicalMethod">GrapicalMethod</Link></li>
                        <li><Link to="/rootofequation/Bisection">Bisection</Link></li>
                        <li><Link to="/rootofequation/Falseposition">Falseposition</Link></li>
                        <li><Link to="/rootofequation/Onepointiteration">Onepointiteration</Link></li>
                        <li><Link to="/rootofequation/NewtonRaphson">NewtonRaphson</Link></li>
                        <li><Link to="/rootofequation/Secantmethod">Secantmethod</Link></li>
                    </ui>
                </div>
                <div class="col-sm-4">
                    <h3>Matrix</h3>
                    <ui>
                    <li><Link to="/rootofequation/CramerRule">CramerRule</Link></li>
                    <li><Link to="/rootofequation/Gausselimination">Gauss elimination</Link></li>
                    <li><Link to="/rootofequation/Gaussjordan">Gauss jordan</Link></li>
                    <li><Link to="/rootofequation/Matrixinverse">Matrixinverse</Link></li>
                    <li><Link to="/rootofequation/LU Decompos Method">LU Decompos Method</Link></li>
                    <li><Link to="/rootofequation/Jacobi">Jacobi</Link></li>
                    </ui>
                    
                </div>
                <div class="col-sm-4 text-left">
                    <h3>Rootofequation</h3>
                    <ui>
                    <li><Link to="/rootofequation/INTERPOLATION">INTERPOLATION</Link></li>
                        <li><Link to="/rootofequation/Lagange">Lagange</Link></li>
                    </ui>
                    
                </div>
                </div>
            </div>

        </div>
    );
}
export default Rootofequation;


