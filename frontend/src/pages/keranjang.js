import React from "react";
import axios from "axios";
import Navbar from "../components/navbar"

export default class Keranjang extends React.Component{
    constructor(){
        this.state = {
            token: "",
            id_customer: "",
            nama_customer: "",
            id_kasir: "",
            total: 0
        }
    }
    render(){
        return(
            <div className="bg">
                <Navbar/>
                <div className="container">
                    <div className="card col-12 mt-4" style={{backgroundColor:"black", border:"none"}}>
                        <div className="card-header bg-warning text-dark">
                            <h4>Keranjang</h4>
                        </div>
                        <div className="card-body">
                            <h5 className="text-info">
                                Customer: {this.state.customerName}
                            </h5>

                            <table className="table table-bordered text-white mt-4">
                                <thead>
                                    <tr>
                                        <th>Paket</th>
                                        <th>harga</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                        <th>Option</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.cart.map((item,index)=>(
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>Rp. {item.price.toLocaleString('de-DE')}</td>
                                            <td>{item.qty}</td>
                                            <td className="text-right">
                                                Rp {(item.price * item.qty).toLocaleString('de-DE')}
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
                                            <button className="btn btn-sm btn-success m-1" onClick={() => this.checkOut()} disabled={this.state.cart.lenght === 0}>
                                                Checkout
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}