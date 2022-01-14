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
import ChangePassword from './accounts/ChangePassword';

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

  //     accounts     //
  // only admin can access this
  function addUser(){
    if ((Cookies.get('jwt')) !== undefined){
      if  ( (jwt(Cookies.get('jwt')).role) ==="Admin"){
        return(<AddUser/>) //if cookies exist and is an authorized role
      }else{
        return( <Unauthorized/>) //cookies exists but unauthorized role
      }
    }else{
      return(<Login/>) //no cookies present, not logged-in
    }
  }

  function editUser(){
    if ((Cookies.get('jwt')) !== undefined){
      if  ( (jwt(Cookies.get('jwt')).role) ==="Admin"){
        return(<EditUser/>)
      }else{
        return( <Unauthorized/>)
      }
    }else{
      return(<Login/>)
    }
  }

  function changePassword(){
    if ((Cookies.get('jwt')) !== undefined){
      return(<ChangePassword/>)
    }else{
      return(<Login/>) //no cookies present, not logged-in
    }
  }

  //     products     //
  // only admin and staff can access this
  function addProduct(){
    if ((Cookies.get('jwt')) !== undefined){
      if  ( ((jwt(Cookies.get('jwt')).role) ==="Admin") || ((jwt(Cookies.get('jwt')).role) ==="Staff") ){
        return(<AddProduct/>)
      }else{
        return( <Unauthorized/>)
      }
    }else{
      return(<Login/>)
    }
  }

  function editProduct(){
    if ((Cookies.get('jwt')) !== undefined){
      if  ( ((jwt(Cookies.get('jwt')).role) ==="Admin") || ((jwt(Cookies.get('jwt')).role) ==="Staff") ){
        return(<EditProduct/>)
      }else{
        return( <Unauthorized/>)
      }
    }else{
      return(<Login/>)
    }
  }

  //    view inventory     //
  //accessible for all users as long as logged in

  function viewInventory(){
    if ((Cookies.get('jwt')) !== undefined){
      if  ( ((jwt(Cookies.get('jwt')).role) ==="Admin") || ((jwt(Cookies.get('jwt')).role) ==="Staff") ){
        return(<Inventories/>)
      }else{
        return( <Unauthorized/>)
      }
    }else{
      return(<Login/>)
    }
  }

  //     transactions     //
  //accessible for all users as long as logged in
  function addTransaction(){
    if ((Cookies.get('jwt')) !== undefined){
      return(<AddTransaction/>)
    }else{
      return(<Login/>)
    }
  }
  function viewTransaction(){
    if ((Cookies.get('jwt')) !== undefined){
      return(<ViewTransaction/>)
    }else{
      return(<Login/>)
    }
  }
 
  return [addUser, editUser, changePassword, addProduct, editProduct, viewInventory, addTransaction, viewTransaction];
}