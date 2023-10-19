import Sample from './cal/Rootofequation/Bisection';
import Rootofequation from './rootofequation';
import {Route,Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Page404 from './Page404';
import AppHeader from './AppHeader';
import GrapicalMethod from './cal/Rootofequation/GrapicalMethod';
import Falseposition from './cal/Rootofequation/Falseposition';
import Onepointiteration from './cal/Rootofequation/Onepointiteration';
import MatrixInput from './cal/Matrix/CramerRule';
import NewtonRaphson from './cal/Rootofequation/NewtonRaphson';
import TaylorSeries from './cal/Rootofequation/TaylorSeries';
import Secantmethod from './cal/Rootofequation/Secantmethod';
import INTERPOLATION from './cal/Rootofequation/INTERPOLATION';
import Lagange from './cal/Rootofequation/Lagange';

import CramerRule from './cal/Matrix/CramerRule';
import Gausselimination from './cal/Matrix/Gausselimination';
import Gaussjordan from './cal/Matrix/Gaussjordan';
import Matrixinverse from './cal/Matrix/MatrixInverse';
import LU from './cal/Matrix/LU';
import Jacobi from './cal/Matrix/Jacobi';
function App() {
  return (
    <div>
      <AppHeader/>
    <Routes>
      <Route path="/" element={<Rootofequation/>}/>
      <Route path="/rootofequation" element={<Rootofequation/>} />
      <Route path="/rootofequation/bisection" element={<Sample />} />
      <Route path="/rootofequation/GrapicalMethod" element={<GrapicalMethod/>} />
      <Route path="/rootofequation/Falseposition" element={<Falseposition/>} />
      <Route path="/rootofequation/Onepointiteration" element={< Onepointiteration/>} />
      <Route path="/rootofequation/NewtonRaphson" element={< NewtonRaphson/>} />
      <Route path="/rootofequation/CramerRule" element={<MatrixInput/>}/>
      <Route path="/rootofequation/TaylorSeries" element={<TaylorSeries/>}/>
      <Route path="/rootofequation/Secantmethod" element={<Secantmethod/>}/>\

      <Route path="/rootofequation/Gausselimination" element={<Gausselimination/>}/>
      <Route path="/rootofequation/Gaussjordan" element={<Gaussjordan/>}/>
      <Route path="/rootofequation/CramerRule" element={<CramerRule/>}/>
      <Route path="/rootofequation/Matrixinverse" element={<Matrixinverse/>}/>
      <Route path="/rootofequation/LU Decompos Method" element={<LU/>}/>
      <Route path="/rootofequation/Jacobi" element={<Jacobi/>}/>

      <Route path="/rootofequation/INTERPOLATION" element={<INTERPOLATION/>}/>
      <Route path="/rootofequation/Lagange" element={<Lagange/>}/>
      <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
