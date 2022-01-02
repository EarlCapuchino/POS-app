
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
//front end resources 
import Homepage from './pages/Homepage';
import Login from './pages/accounts/Login';
import SetUpAccount from './pages/accounts/SetUpAccount';
import AddUser from './pages/accounts/AddUser';
import EditUser from './pages/accounts/EditUser';

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
      <Route exact ={true} path="/login" element={<Login />}/>
      <Route exact ={true} path="/set-up-account" element={<SetUpAccount />}/>
      <Route exact ={true} path="/register" element={<AddUser/>}/>
      <Route exact ={true} path="/edit-user" element={<EditUser/>}/>
      </Routes>
      </BrowserRouter>
      Footer ©
    </div>
  );
}

export default App;
