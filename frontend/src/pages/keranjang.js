import React from "react";
import axios from "axios";
import Navbar from "../components/navbar";

export default class Keranjang extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            id_customer: "",
            nama_customer: "",
            keranjang:[],
            total:0
        }
        if(localStorage.getItem('token')){
            this.state.token = localStorage.getItem('token')
        }
        else{
            window.location = '/login'
        }
    }
    headerConfig=() =>{
        let header = {
            headers: {Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }
    initCart = () =>{
        let tempCart = []
        if(localStorage.getItem("keranjang") !==null){
            tempCart = JSON.parse(localStorage.getItem("keranjang"))
        }
        if(localStorage.getItem("customer") !==null){
            let customer = JSON.parse(localStorage.getItem("customer"))
            this.setState({
                id_customer: customer.id_customer,
                nama_customer: customer.nama
            })
        }
        let totalHarga = 0;
        tempCart.map(item =>{
            totalHarga +=(item.price * item.qty)
        })
        this.setState({
            cart: tempCart,
            total: totalHarga
        })
    }
    componentDidMount(){
        this.initCart()
    }
    render(){
        return(
            <div className="bg">
                <Navbar/>
                    <div className="card mx-3 mt-4" style={{backgroundColor:"black", border:"none"}}>
                    <div className="card-header" style={{backgroundColor: "rgb(211, 0, 0)", border: "none"}}>
                            <h2 className="text-light text-center">Keranjang</h2>
                        </div>
                        <div className="card-body">
                            <h5 className="text-info">
                                Customer: {this.state.nama_customer}
                            </h5>

                            <table className="table table-bordered text-white mt-4">
                                <thead>
                                    <tr>
                                        <th>Paket</th>
                                        <th>Harga</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                        <th>Option</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.keranjang.map((item,index)=>(
                                        <tr key={index}>
                                            <td>{item.nama}</td>
                                            <td>Rp. {item.harga.toLocaleString('de-DE')}</td>
                                            <td>{item.qty}</td>
                                            <td className="text-right">
                                                Rp {(item.harga * item.qty).toLocaleString('de-DE')}
                                            </td>
                                            <td>
                                            <button className="btn btn-dark m-1 text-success" onClick={()=> this.editItem(item)}>Edit</button>
                                            <button className="btn btn-dark m-1 text-danger" onClick={() => this.dropItem(item)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="3">Total</td>
                                        <td className="text-right">Rp {this.state.total.toLocaleString('de-DE')}</td>
                                        <td className="d-grid gap-2">
                                            {/* <button className="btn btn-sm btn-success m-1" onClick={() => this.checkOut()} disabled={this.state.cart.lenght === 0}>
                                                Checkout
                                            </button> */}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
        )
    }
}