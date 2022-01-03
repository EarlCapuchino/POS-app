import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {Badge, Button} from "react-bootstrap";
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

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
            // productPtice:'',
            // productStock:''

        }
        this.delProduct = this.delProduct.bind(this);
        this.selectID = this.selectID.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
        this.change_s_name = this.change_s_name.bind(this)
        this.change_s_price = this.change_s_price.bind(this)
        this.change_s_stock = this.change_s_stock.bind(this)
    }

    pageSuccess(){
        window.location.href = "http://localhost:3000/success"
    }
    pageError(){
        window.location.href = "http://localhost:3000/error"
    }

    componentDidMount=()=>{
        fetch('http://localhost:4000/view-inventory')
        .then(response=>response.json()) //app.get('/find-all', controller.findAll)
        .then(body=>{
            this.setState({products: body})
        })
    }


    submitHandler = (e) =>{
        e.preventDefault()
        console.log(this.state)
        axios.post('http://localhost:4000/edit-product',this.state)
        .then(response=>{
            if (response.data.status == "ok"){
                this.pageSuccess();
            }else{
                this.pageError();
            }
        })

    }

    findIndex(_target){
        console.log("find index")
        var p = this.state.products
        var s = _target
        let _index=0;
            for(let i=0;i<p.length;i++){
            if(p[i]._id===s){
            _index=i
        }}
        console.log(_index)

        return _index
    }
    changeInitial_s_name(ind){
        this.setState({ s_name: this.state.products[ind].name})
    }
    changeInitial_s_price(ind){
        this.setState({ s_price: this.state.products[ind].price})
    }
    changeInitial_s_stock(ind){
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
    
       var ind = this.findIndex(e.target.value) //KASE HINDI AGAD NA-UUPDATE YUNG STATE
       this.setState({ index: ind})
       this.changeInitial_s_name(ind)
       this.changeInitial_s_price(ind)
       this.changeInitial_s_stock(ind)
    //    var n = this.state.products[this.state.index].name
    //    this.setState({ s_name: n })
    }
    delProduct = (e) =>{
        //e.preventDefault()
        
        var ind = this.findIndex(e.target.value)
        console.log("index"+ind)
        this.setState({ index: ind})
        this.setState({delName:this.state.products[ind].name })
        this.setState({deleteID: e.target.value})
       

        console.log("DEL NAME "+ this.state.delName)


    }
    delPost = (e) =>{
        axios.post('http://localhost:4000/delete-product',({deleteID: this.state.deleteID,
        delName: this.state.delName}))
        .then(response=>{
            console.log(response)
            if (response.data.status == "ok"){
                this.pageSuccess();
            }else{
                this.pageError();
            }
        })
    }
    promptPage(){
        window.location.href = "http://localhost:3000/success"
    }

    render(){
        const products = this.state.products
        // const {name, price, stock} = this.state
        return(
            <>

                <h2>Edit Item</h2>
                <h3>Click the ID</h3>
                {this.state.delName}

                {
                        this.state.products.map((product, i)=>{
                            return(
                            <p key={i}>

                            <Badge pill bg="warning" text="dark">
                            {product.name}
                            </Badge><br/>
                            <Button variant="outline-success"
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
                            </p>
                            )
                        })
                }
                <h2>Delete item</h2>
                {this.state.delName}
                <Button variant="outline-info"
                onClick={this.delPost}>submit deletion</Button>

                  <h2>Edit item</h2>
                  <h4>{this.state.s_name}</h4>
                 <form onSubmit={this.submitHandler}>
                    <div>
                        <label>change product name</label>
                        <input type="text"
                        name="name"
                        value={this.state.s_name}
                        onChange={this.change_s_name}></input>
                    </div>
                    <div>
                        <label>change price: </label>
                        ₱<input type="number"
                        name="name"
                        value={this.state.s_price}
                        onChange={this.change_s_price}
                        ></input>
                    </div>
                    <div>
                        <label>change stock</label>
                        <input
                        type="number"
                        name="stock"
                        value={this.state.s_stock}
                        onChange={this.change_s_stock}></input>


                    </div>
                       <input type="submit" onClick={this.promptPage} ></input>
                </form>

            </>
        )
    }
}

export default EditProduct