import React from "react"
import axios from "axios"
import {Button} from "react-bootstrap"
import Navbar from "../components/navbar"
import TransaksiList from "../components/transaksiList"
import "../style/transaksi.css"

export default class Transaksi extends React.Component{
    constructor(){
        super()
        this.state={
            token: "",
            transaksis: [],
            selectedItem: null,
            keyword: ""
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
            [e.target.name] : e.target.value
        })
    }
    baru = (e) =>{
        e.preventDefault()
        let url = "http://localhost:2004/transaksi/status"
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
        let url = "http://localhost:2004/transaksi"

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
                {/* <div className="card m-3" style={{backgroundColor:"#DEDEDE"}}>
                    <div className="card-header" style={{backgroundColor: "#A0011B", border: "none"}}>
                        <h2 className="txt-transaksi">Transaksi</h2>
                    </div> */}
                    <div className="card-transaksi">
                        <div className="card-bg">
                            <h2 className="text-transaksi">Transaksi</h2>
                            <div className="card-body-transaksi mt-3"> 
                            <div className="d-flex justify-content-around">
                                <button className="btn-semua" onClick={this.getTransaksi}>
                                    Semua
                                </button>
                                <button className="btn-semua" name="keyword" value={"baru"} onChange={this.handleChange} onClick={e => this.baru(e, "value")}>
                                    Baru
                                </button>
                                <button className="btn-semua" name="keyword" value={"diproses"} onChange={this.handleChange} onClick={e => this.baru(e, "value")}>
                                    Diproses
                                </button>
                                <button className="btn-semua" name="keyword" value={"diambil"} onChange={this.handleChange} onClick={e => this.baru(e, "value")}>
                                    Diambil
                                </button>
                                <button className="btn-semua" name="keyword" value={"selesai"} onChange={this.handleChange} onClick={e => this.baru(e, "value")}>
                                    Selesai
                                </button>
                            </div>
                        </div>


                        {/* <Button className="btn-filter" variant="outline-dark mb-3 w-100 m-1" name="keyword" value={"baru"} onChange={this.handleChange} onClick={e => this.baru(e, "value")}>
                            Baru
                        </Button>{' '}
                        <Button className="btn-filter" variant="outline-dark mb-3 w-100 m-1" name="keyword" value={"diproses"} onChange={this.handleChange} onClick={e => this.baru(e, "value")}>
                            Diproses
                        </Button>{' '}
                        <Button className="btn-filter" variant="outline-dark mb-3 w-100 m-1" name="keyword" value={"diambil"} onChange={this.handleChange} onClick={e => this.baru(e, "value")}>
                            Diambil
                        </Button>{' '}
                        <Button className="btn-filter" variant="outline-dark mb-3 w-100 m-1" name="keyword" value={"selesai"} onChange={this.handleChange} onClick={e => this.baru(e, "value")}>
                            Selesai
                        </Button>{' '} */}
                    {/* </div> */}
                    <div>
                    {this.state.transaksis.map(item => (
                        <TransaksiList
                        key = {item.id_transaksi}
                        id_transaksi= {item.id_transaksi}
                        nama_pelanggan= {item.user.nama}
                        alamat_pelanggan = {item.user.alamat}
                        status= {item.status}
                        time = {item.tgl}
                        pakets = {item.detail_transaksi}
                        />
                    ))}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
