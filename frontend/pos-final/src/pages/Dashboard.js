import React from 'react'
import './Homepage.css'
import Cookies from 'js-cookie'
import jwt from 'jwt-decode'
class Dashboard extends React.Component{

    DB2(){
        console.log("login")
        window.location.href = "/dashboard2"
    }

    pageHome(){
        console.log("login")
        window.location.href = "/"
    }

    display(){
        if(Cookies.get('jwt')){
            if (jwt(Cookies.get('jwt')).role=="Cashier"){
                return this.DB2()
            }
            return 
        }else{
          return this.pageHome()
        }
      }

    render(){
        return(
            <>
            {this.display()}
                <div id="maindivtop">
                
                <div id="toptitle1">Users
                <div id="topdivider"></div>

                <form action="/register" >
                    <input type="submit" value="Add User" id="registerButton"/>
                </form>
        

                <form action="/edit-user">  
                    <input type="submit" value="Edit User" id="editUserButton" />
                </form>
                </div>

                <div id="toptitle2">Products
                <div id="topdivider"></div>

                <form action="/add-product" >
                    <input type="submit" value="Add Product" id="addProductButton"/>
                </form>

                <form action="/edit-product" >
                    <input type="submit" value="Edit Product" id="editProductButton"/>
                </form>

                <form action="/inventory" >
                    <input type="submit" value="View Inventory" id="viewInventoryButton" />
                </form></div>

                
                <div id="toptitle3">Transactions
                <div id="topdivider"></div>


                <form action="/add-transaction" >
                    <input type="submit" value="Add Transaction" id="addTransButton"/>
                </form>

                <form action="/view-transactions" >
                    <input type="submit" value="View Transaction" id="viewTransButton"/>
                </form>
    
                </div>
                
                

                




            </div>




            <div id="maindivtop2">
            <div id="Divider"></div>
            <div id="mmessage">
                <b>Welcome to Homepage</b>
                </div>
                <div id="text">
                This is Pos-Final, an inventory app made in completion for the 
                CMSC 100 course. This is made by the following students: 
                Adryan Phyllip Ramos, Julian Fuertes, Redeemyrrh Ysrael Manalo, 
                headed by Earl Samuel Capuchino.
            </div>
            </div>

            <div id="maindiv2">
            <div id="Divider3"></div>
            <div id="picturebox"><div id="picture1"><div id="title1">
            <p>Ramos, Adryan:</p><p>Back End</p>
            </div></div></div>
            <div id="picturebox1"><div id="picture2"><div id="title2">
            <p>Manalo, Ysrael:</p><p>Front End</p>
            </div></div></div>
            <div id="picturebox2"><div id="picture3"><div id="title3">
            <p>Fuertes, Julian:</p><p>Database</p>
            </div></div></div>
            <div id="picturebox3"><div id="picture4"><div id="title4">
            <p>Capuchino, Earl:</p><p>Team Head</p>
            </div></div></div>
            </div>
            
            <div id="maindiv3">
            <div id="Divider4"></div>
            <div id="mmessage1">
                <b>About Us</b>
                </div>
                <div id="text1">
                We are a team of students from CMSC 100: Web Programming. Currently, we are made of 4 members, 
                3 of which came from Institute of Statistics, and the last one came from the Institute of Computer Science,
                 either on sophomore or junior standing.
            </div>
            </div>
            </>
            
        )
    }
}

export default Dashboard