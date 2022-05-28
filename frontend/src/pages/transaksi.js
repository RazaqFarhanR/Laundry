import React from "react"
import axios from "axios"
import {Button, Modal, Form} from "react-bootstrap"
import TransaksiList from "../components/transaksiList"
import Navbar from "../components/navbar"
// import "../style/transaksi.css"

export default class Transaksi extends React.Component{
    constructor(){
        super()
        this.state={
            transaksis: [],
            cart: [],
            nama_customer: "",
            alamat: "",
            token: "",
            selectedItem: null,
            keyword: "",
            modalCustomer: false,
            modalPaket: false
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
    handleAdd = () =>{
        this.setState({
            nama_customer: "",
            alamat:"",
            action: "insert",
            modalCustomer: true
        })
    }
    handleClose = () =>{
        this.setState({
            modalCustomer: false
        })
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleStatus = (e) =>{
        e.preventDefault()
        let url = "http://localhost:1305/transaksi/status"
        let data ={
            keyword: e.target.value
        }
        console.log(data)
        axios.post(url, data, this.headerConfig())
        .then(res =>{
            this.setState({
                transaksis: res.data.transaksi
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    
    }
    // findCustomer = (e) =>{
    //     e.preventDefault()
    //     let data = {
    //         nama: this.state.nama_customer,
    //         alamat: this.state.alamat
    //     }
    //     let url = "http://localhost:1305/api/user/find"
    //     axios.post(url, data, this.headerConfig())
    //     .then(res => {
    //         if (res.data.data){
    //             let id_customer = res.data.data.id_user
    //             let customer = res.data.data
    //             localStorage.setItem("id_customer", id_customer)
    //             localStorage.setItem("customer", JSON.stringify(customer))
    //             window.location = "/keranjang"
    //         }
    //         else{
    //             window.alert(res.data.message)
    //             // window.reload();
    //         }
    //     })
    // }
    addCart = (e) => {
        let tempCart = []

        localStorage.setItem('cart', JSON.stringify(tempCart))
        window.location = "/customer"
    }
    getTransaksi = () =>{
        let url = "http://localhost:1305/transaksi"

        axios.get(url, this.headerConfig())
        .then(res =>{
            this.setState({
                transaksis: res.data.transaksi
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
    componentDidMount = () =>{
        this.getTransaksi()
    }
    render(){
        return(
            <div>
                <Navbar/>
                <div className="card m-3 rounded-4">
                    <div className="card-header" style={{backgroundColor: "#a6051a", border: "none"}}>
                        <h2 className="text-light text-center">Transaksi</h2>
                    </div>
                    {/* <button className="col-2 btn ms-3 mt-2" onClick={(e) => this.addCart()} style={{backgroundColor: "black", color: "rgb(0, 222, 222)"}}>
                        Tambah Pesanan
                    </button> */}
                    <div className="d-flex justify-content-around mx-3  mt-3">
                        <Button className="btn-filter" variant="outline-dark mb-3 w-100 m-1" name="keyword" onClick={this.getTransaksi}>
                            Semua
                        </Button>
                        <Button className="btn-filter" variant="outline-dark mb-3 w-100 m-1" name="keyword" value={"baru"} onChange={this.handleChange} onClick={e => this.handleStatus(e, "value")}>
                            Baru
                        </Button>
                        <Button className="btn-filter" variant="outline-dark mb-3 w-100 m-1" name="keyword" value={"diproses"} onChange={this.handleChange} onClick={e => this.handleStatus(e, "value")}>
                            Diproses
                        </Button>
                        <Button className="btn-filter" variant="outline-dark mb-3 w-100 m-1" name="keyword" value={"diambil"} onChange={this.handleChange} onClick={e => this.handleStatus(e, "value")}>
                            Diambil
                        </Button>
                        <Button className="btn-filter" variant="outline-dark mb-3 w-100 m-1" name="keyword" value={"selesai"} onChange={this.handleChange} onClick={e => this.handleStatus(e, "value")}>
                            Selesai
                        </Button>   
                    </div>
                    <div className="mx-3">
                    {this.state.transaksis.map(item => (
                        <TransaksiList
                        key = {item.id_transaksi}
                        id_transaksi= {item.id_transaksi}
                        nama_customer= {item.customer.nama}
                        alamat_customer = {item.customer.alamat}
                        status= {item.status}
                        pembayaran= {item.pembayaran}
                        time = {item.tgl}
                        pakets = {item.detail_transaksi}
                        />
                    ))}
                    </div>
                </div>

                {/* modal transaksi */}
                <Modal show={this.state.modalCustomer} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Form Transaksi</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.findCustomer(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="nama">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text" name="nama" placeholder="Masukkan Nama" value={this.state.nama_customer}
                                    onChange={e => this.setState({ nama_customer: e.target.value })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="nama">
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control type="text" name="alamat" placeholder="Masukkan Alamat" value={this.state.alamat}
                                    onChange={e => this.setState({ alamat: e.target.value })}
                                    required
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="btn btn-danger m-1" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button className="btn btn-success m-1" type="submit" onClick={this.handleClose}>
                                Next
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }
}