
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
///// front end resources /////

///accounts
import Homepage from './pages/Homepage';
import Login from './pages/accounts/Login';
import SetUpAccount from './pages/accounts/SetUpAccount';
import AddUser from './pages/accounts/AddUser';
import EditUser from './pages/accounts/EditUser';
import Dashboard from './pages/Dashboard';

///product
import AddProduct from './pages/product/AddProduct'
import EditProduct from './pages/product/EditProduct'
import Inventories from './pages/product/Inventories'

//transaction
import AddTransaction from './pages/transactions/AddTransaction';
import ViewTransaction from './pages/transactions/ViewTransaction';
//props
import Footer from './Design/Footer';
import Header from './Design/Header';
import './App.css'

//prompts
import Error from './prompts/Error';
import Success from './prompts/Success';
import NotFound from './prompts/NotFound'
import Unauthorized from './prompts/Unauthorized'

//auth and protected routes 
import ProtectedRoute from './pages/ProtectedRoute';
import useAuth from "./pages/useAuth";
import Cookies from 'js-cookie';
import jwt from 'jwt-decode'


function App() {
const [addUser, editUser, addProduct, editProduct] = useAuth()
  return (
    <div className="App">
      <video src="https://cdn.discordapp.com/attachments/759381457893982219/927813921358876682/Backeng.mp4" autoplay="autoplay" loop="loop" muted id="video">
      </video>
      <div id = "fix">   </div>
      <Header/>
      <BrowserRouter>
      <Routes>

      <Route exact ={true} path="/" element={<Homepage />}/> 
      <Route exact ={true} path="/login" element={<Login />}/>
      <Route exact ={true} path="/set-up-account" element={<SetUpAccount />}/>
      <Route exact ={true} path="/register" element={addUser()}/>
      <Route exact ={true} path="/edit-user" element={editUser()}/>

      <Route exact ={true} path="/add-product" element={addProduct()}/>
      <Route exact ={true} path="/edit-product" element={editProduct()}/>
      <Route exact ={true} path="/inventory" element={<Inventories/>}/>

      <Route exact ={true} path="/add-transaction" element={<AddTransaction/>}/>
      <Route exact ={true} path="/view-transactions" element={<ViewTransaction/>}/>

      <Route exact ={true} path="/success" element={<Success/>}/>
      <Route exact ={true} path="/error" element={<Error/>}/>

      <Route exact ={true} path="/dashboard" element={<Dashboard/>}/>
      <Route path="*" element={<NotFound/>} />
    
       
      </Routes>
   
      </BrowserRouter>
  
      <Footer />
    </div>
  );
}

export default App;
