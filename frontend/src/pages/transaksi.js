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
            nama_customer: "",
            alamat: "",
            token: "",
            selectedItem: null,
            keyword: "",
            isModalOpen: false
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
            jenis: "",
            harga: "",
            image: null,
            uploadFile: true,
            action: "insert",
            isModalOpen: true
        })
    }
    handleClose = () =>{
        this.setState({
            isModalOpen: false
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
                    <div className="card-header" style={{backgroundColor: "rgb(211, 0, 0)", border: "none"}}>
                        <h2 className="text-light text-center">Transaksi</h2>
                    </div>
                    <button className="col-2 btn ms-3 mt-2" onClick={() => this.handleAdd()} style={{backgroundColor: "black", color: "rgb(0, 222, 222)"}}>
                        Tambah Pesanan
                    </button>
                    <div className="d-flex justify-content-around mx-3  my-3">
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
                    {this.state.transaksis.map(item => (
                        <TransaksiList
                        key = {item.id_transaksi}
                        id_transaksi= {item.id_transaksi}
                        member_nama= {item.member.nama}
                        member_alamat = {item.member.alamat}
                        status= {item.status}
                        time = {item.tgl}
                        pakets = {item.detail_transaksi}
                        />
                    ))}
                </div>

                {/* modal transaksi */}
                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Form Transaksi</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.handleSave(e)}>

                    </Form>
                </Modal>
            </div>
        )
    }
}