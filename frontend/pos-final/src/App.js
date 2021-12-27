
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
//front end resources 
import Homepage from './pages/Homepage';



//prompts
//import Error from './prompts/Error'
//import Success from './prompts/Success';
function App() {
  return (
    <div className="App">
      Nav Bars 
      <BrowserRouter>
      <Routes>
      <Route exact ={true} path="/" element={<Homepage />}/> 
      </Routes>
      </BrowserRouter>
      Footer ©
    </div>
  );
}

export default App;
