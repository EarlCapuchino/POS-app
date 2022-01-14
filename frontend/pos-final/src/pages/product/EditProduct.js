import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {Badge, Button} from "react-bootstrap";
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
import {host} from "../../utils/get-host"
import './prod.css'

class EditProduct extends React.Component{
    constructor(props){
        super(props)

        this.state={
            cookies: Cookies.get('jwt'),
            deleteID:"",
            delName: "",
            products:[
                {
                    _id:"",
                    name:'',
                    price:'',
                    stock: ''
                }
            ],
            s_id:"",
            index:'',
            s_name:'',
            s_price:'',
            s_stock:''

        }
        this.delProduct = this.delProduct.bind(this);
        this.selectID = this.selectID.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
        this.change_s_name = this.change_s_name.bind(this)
        this.change_s_price = this.change_s_price.bind(this)
        this.change_s_stock = this.change_s_stock.bind(this)
    }

    pageSuccess(){ //success and error prompts
        window.location.href = "/success"
    }
    pageError(){
        window.location.href = "/error"
    }

    componentDidMount=()=>{
        fetch(`${host}view-inventory`)
        .then(response=>response.json()) //app.get('/find-all', controller.findAll)
        .then(body=>{
            this.setState({products: body})
        })
    }


    submitHandler = (e) =>{ //shows if editing the product was a success or a failure
        if (this.state.s_price=="" || this.state.s_name=="" || this.state.s_stock==""){
            return 
        }
        e.preventDefault()
        axios.post(`${host}edit-product`,this.state)
        .then(response=>{
            if (response.data.status == "ok"){
                this.pageSuccess();
            }else{
                this.pageError();
            }
        })

    }

    findIndex(_target){ //finds the index of the product
        var p = this.state.products
        var s = _target
        let _index=0;
            for(let i=0;i<p.length;i++){
            if(p[i]._id===s){
            _index=i
        }}

        return _index
    }

    changeInitial_s_name(ind){ //change the name of the product
        this.setState({ s_name: this.state.products[ind].name})
    }
    changeInitial_s_price(ind){ //change price
        this.setState({ s_price: this.state.products[ind].price})
    }
    changeInitial_s_stock(ind){ //change stock
        this.setState({ s_stock: this.state.products[ind].stock})
    }
    change_s_name=(e)=>{ 
        this.setState({ s_name: e.target.value})
    }
    change_s_price=(e)=>{
        if ((e.target.value)<0) {
            this.setState({ s_price: -(e.target.value)}); //avoid negative number
        }else{  this.setState({ s_price: e.target.value})}
    }
    change_s_stock=(e)=>{
        if ((e.target.value)<0) {
            this.setState({ s_stock: -(e.target.value)}); //avoid negative number
        }else{  this.setState({ s_stock: e.target.value})}
    }

    selectID=(e)=>{
       this.setState({ s_id: e.target.value})
    
       var ind = this.findIndex(e.target.value) 
       this.setState({ index: ind})
       this.changeInitial_s_name(ind)
       this.changeInitial_s_price(ind)
       this.changeInitial_s_stock(ind)
    }
    delProduct = (e) =>{ //delete product
        
        var ind = this.findIndex(e.target.value)
        this.setState({ index: ind})
        this.setState({delName:this.state.products[ind].name })
        this.setState({deleteID: e.target.value})


    }

    delPost = (e) =>{
        axios.post(`${host}delete-product`,({deleteID: this.state.deleteID,
        delName: this.state.delName}))
        .then(response=>{
            if (response.data.status == "ok"){
                this.pageSuccess();
            }else{
                this.pageError();
            }
        })
    }
    
    promptPage(){
        window.location.href = "/success"
    }

    render(){
        const products = this.state.products
        // const {name, price, stock} = this.state
        return(
            <>
            <div id="setfooterprod">
            <div id="margin2"></div>

                <div id = "titleditprod">
                Edit/Delete Item
                </div>
                <br/>
                {this.state.delName}

                {
                        this.state.products.map((product, i)=>{
                            return(
                            <p key={i}>
                                <pre>
                                    <div id = "proddiv">
                                
                            <Badge pill bg="warning" text="dark">
                            {product.name}
                            </Badge><br/><div id="margin2"></div>
                            <Button variant="outline-success" bg = "blue"
                            value={product._id}
                            onClick={this.selectID}>
                            edit
                            </Button>{' '}
                           <Button variant="outline-danger"
                            value={product._id}
                            onClick={this.delProduct}
                            //onChange = {this.delProduct}
                           >delete</Button>
                           <br/>
                           </div>
                           </pre>
                            </p>
                            )
                        })
                }
                <div id="margin3"></div>
                <div id="actions">
                <div class = "div5">
                    <font color = "white">
                <h5>Delete item</h5>
                </font>
                <Badge pill bg="warning" text="dark">{this.state.delName}</Badge>
                <br/>     
                <Button variant="outline-info"
                onClick={this.delPost}>submit deletion</Button>
                </div>
                <br/>

                <div id="actionEI">
                    Edit Item:</div>
                <font color = "black">
                  <h2><b>{this.state.s_name}</b></h2>
                  </font>
                 <form onSubmit={this.submitHandler}>
                    <div id = "div">
                    <div><label id="finaltexts">change product name</label></div>
                        <input type="text"
                        name="name"
                        value={this.state.s_name}
                        onChange={this.change_s_name}></input>
                    </div>
                    <div id= "div">
                        <div><label id="finaltexts">change price: (Php)</label></div>
                        <input type="number"
                        name="name"
                        value={this.state.s_price}
                        onChange={this.change_s_price}
                        ></input>
                    </div>
                    <div id = "div">
                    <div><label id="finaltexts">change stock</label></div>
                        <input
                        type="number"
                        name="stock"
                        value={this.state.s_stock}
                        onChange={this.change_s_stock}></input>


                    </div>
                       <input type="submit" id="submitbutinv" onClick={this.promptPage} ></input>
                </form>
                <form action="/" >
                    <input type="submit" value="Return" id="returndashinv"/>
                </form>
                </div>
                </div>
                
            </>
        )
    }
}


export default EditProduct