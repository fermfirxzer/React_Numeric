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
import INTERPOLATION from './cal//Interpolation/INTERPOLATION';
import Lagange from './cal/Interpolation/Lagange';

import CramerRule from './cal/Matrix/CramerRule';
import Gausselimination from './cal/Matrix/Gausselimination';
import Gaussjordan from './cal/Matrix/Gaussjordan';
import Matrixinverse from './cal/Matrix/MatrixInverse';
import LU from './cal/Matrix/LU';
import Jacobi from './cal/Matrix/Jacobi';
import Gauss_seidel from './cal/Matrix/Gauss_seidel';
import Conjugate from './cal/Matrix/Conjugate Gradient';
import LINEARREGRESSION from './cal/Interpolation/LINEAR REGRESSION';
import Integration from './cal/Interpolation/Integration';
import MULTIPLEREGRESSION from './cal/Interpolation/MULTIPLE LINEAR REGRESSION';
import Splines from './cal/Interpolation/Splines';
import Diff from './cal/Interpolation/Diff';
import Test from './cal/Interpolation/test';
import Test2 from './cal/Interpolation/test2';
import Test3 from './cal/Interpolation/test3'; 
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
      <Route path="/rootofequation/Gauss_seidel" element={<Gauss_seidel/>}/>
      <Route path="/rootofequation/Conjugate" element={<Conjugate/>}/>

      <Route path="/rootofequation/INTERPOLATION" element={<INTERPOLATION/>}/>
      <Route path="/rootofequation/Lagange" element={<Lagange/>}/>
      <Route path="/rootofequation/LINEARREGRESSION" element={<LINEARREGRESSION/>}/>
      <Route path="/rootofequation/Integration" element={<Integration/>}/>
      <Route path="/rootofequation/MULTIPLEREGRESSION" element={<MULTIPLEREGRESSION/>}/>
      <Route path="/rootofequation/Splines" element={<Splines/>}/>
  
      <Route path="/rootofequation/DIFFERENTIATION" element={<Diff/>}/>
      <Route path="/rootofequation/Test1" element={<Test/>}/>
      <Route path="/rootofequation/Test2" element={<Test2/>}/>
      <Route path="/rootofequation/Test3" element={<Test3/>}/>
      <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
