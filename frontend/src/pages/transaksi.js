import React from "react"
import axios from "axios"
import {Button} from "react-bootstrap"
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
            <div className="container-fluid">
                <div class="alert alert-dark mb-4" style={{backgroundColor: "black", border: "none"}}>
                    <h2 style={{color:"red"}}>Transaksi</h2>
                </div>
                <div className="d-flex justify-content-around">
                    <Button className="btn-filter" variant="outline-dark mb-3 w-100 m-1" name="keyword" onClick={this.getTransaksi}>
                        Semua
                    </Button>{' '}
                    <Button className="btn-filter" variant="outline-dark mb-3 w-100 m-1" name="keyword" value={"baru"} onChange={this.handleChange} onClick={e => this.baru(e, "value")}>
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
                    </Button>{' '}
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
        )
    }
}
