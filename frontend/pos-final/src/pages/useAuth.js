import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
///// front end resources /////

///accounts
import Homepage from './Homepage';
import Login from './accounts/Login';
import SetUpAccount from './accounts/SetUpAccount';
import AddUser from './accounts/AddUser';
import EditUser from './accounts/EditUser';
import Dashboard from './Dashboard';

///product
import AddProduct from './product/AddProduct'
import EditProduct from './product/EditProduct'
import Inventories from './product/Inventories'

//transaction
import AddTransaction from './transactions/AddTransaction';
import ViewTransaction from './transactions/ViewTransaction';


//prompts
import Error from '../prompts/Error';
import Success from '../prompts/Success';
import NotFound from '../prompts/NotFound'
import Unauthorized from '../prompts/Unauthorized'

//auth and protected routes 

import Cookies from 'js-cookie';
import jwt from 'jwt-decode'

export default function useAuth() {

  function addUser(){
    if ((Cookies.get('jwt')) !== undefined){
      if  ( (jwt(Cookies.get('jwt')).role) ==="Admin"){
        return(<AddUser/>)
      }else{
        return( <Unauthorized/>)
      }
    }else{
      return(<Login/>)
    }
  }
 
  return [addUser];
}