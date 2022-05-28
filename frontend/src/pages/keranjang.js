import React from "react";
import axios from "axios";
import {Modal, Form, Button} from "react-bootstrap"
import {BsPlusCircleFill} from "react-icons/bs"
import Navbar from "../components/navbar";

export default class Keranjang extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            id_customer: "",
            id_pegawai: "",
            id_outlet: "",
            batas_waltu: "",
            tgl_bayar: "",
            nama_customer: "",
            cart:[],
            paket: [],
            paketDipilih: "",
            qty: "",
            cekCart: localStorage.getItem('cart'),
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
    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleClose = () =>{
        this.setState({
            isModalOpen: false
        })
    }
    editItem = selectedItem =>{
        let tempCart = []
        if(localStorage.getItem("cart") !==null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        let index = tempCart.findIndex(it => it.id_paket === selectedItem.id_paket)

        let promptJumlah = window.prompt(`Masukan jumlah ${selectedItem.nama} yang akan Anda beli`,selectedItem.qty)
        tempCart[index].qty = promptJumlah

        localStorage.setItem("cart", JSON.stringify(tempCart))

        this.initCart()
    }
    dropItem = selectedItem =>{
        if (window.confirm(`Apakah anda yakin menghapus ${selectedItem.namaa} dari Keranjang`)){
            let tempCart = []
            if(localStorage.getItem("cart") !==null){
                tempCart = JSON.parse(localStorage.getItem("cart"))
            }

            let index = tempCart.findIndex(it => it.id_paket === selectedItem.id_paket)
            tempCart.splice(index, 1)

            localStorage.setItem("cart", JSON.stringify(tempCart))

            this.initCart()

        }
    }
    checkOut = () =>{
        console.log("checkout")
        let tempCart = []
        let customer = JSON.parse(localStorage.getItem("customer"))
        if(localStorage.getItem("cart") !==null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        let data = {
            id_customer: this.state.customer.id_customer,
            detail_transaksi: tempCart
        }

        let url = "http://localhost:8080/transaksi/"

        axios.post(url, data, this.headerConfig())
        .then(res =>{
            window.alert(res.data.message)
            localStorage.removeItem("cart")
            window.location = "/transaksi"
        })
        .catch(err =>{
            if(err.res){
                if(err.res.status) {
                    window.alert(err.res.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(err);
            }
        })

    } 
    addCustomer = (e) => {
        let tempCustomer = []

        localStorage.setItem('cart', JSON.stringify(tempCustomer))
        window.location = "/customer"
    }
    addToCart = (e) => {
        this.setState({
            isModalOpen : true,
            paketDipilih: this.state.paketDipilih,
            qty: "",
            action: "paket"
        })
    }
    addPaket = () => {
        window.location = "/paket"
    }
    getPaket = () =>{
        let url = "http://localhost:1305/paket"
        axios.get(url, this.headerConfig())
        .then(res =>{
            this.setState({
                paket: res.data.paket
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
    initCart = () =>{
        let tempCart = []
        if(localStorage.getItem("cart") !==null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        if(localStorage.getItem("customer") !==null){
            let customer = JSON.parse(localStorage.getItem("customer"))
            this.setState({
                id_customer: customer.id_user,
                nama_customer: customer.nama
            })
            console.log(customer.id_user)
        }
        let totalHarga = 0;
        tempCart.map(item =>{
            totalHarga +=(item.harga * item.qty)
        })
        this.setState({
            cart: tempCart,
            total: totalHarga
        })
    }
    componentDidMount(){
        this.initCart()
        this.getPaket()
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
                            {(() =>{
                                if (this.state.cekCart === null || this.state.cekCart.length === 0) {
                                    return(
                                        <div>
                                            <h5 className="text-info">Customer: <button style={{backgroundColor: "transparent"}}><BsPlusCircleFill className="text-success" onClick={(e) => this.addCustomer()}/></button></h5>
                                        </div>
                                    )
                                } else {
                                    return( 
                                    <h5 className="text-info">
                                        Customer: {this.state.nama_customer}
                                    </h5>
                                    )
                                }
                            })()}

                        <button className="col-2 btn btn-success" onClick={() => this.addPaket()}>
                            Tambah Paket
                        </button>
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
                                    {this.state.cart.map((item,index)=>(
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
                                            <button className="btn btn-sm btn-success m-1" onClick={() => this.checkOut()} disabled={this.state.cart.length === 0}>
                                                Checkout
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                {/* modal tambah paket */}
                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Form Transaksi</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.addPaket(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Paket</Form.Label>
                                <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                                    <option selected>pilih Paket</option>
                                    {this.state.paket.map(item => (
                                        <option value={item} onChange={e => this.setState({ tempCart : e.target.value })}>{item.nama}</option>
                                        )
                                    )}
                                </select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>qty</Form.Label>
                                <Form.Control type="text" name="qty" placeholder="Masukkan jumlah" value={this.state.qty}
                                    onChange={e => this.setState({ qty: e.target.value })}
                                    required
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="btn btn-danger m-1" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button className="btn btn-success m-1" type="submit" onClick={this.handleClose}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }
}