import React from "react";
// import { Modal } from "bootstrap";
import axios from "axios";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

export default class Outlet extends React.Component {
    constructor(){
        super()
        this.state = {
            outlet: []
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
    getOutlet() {
        let url = "http://localhost:1305/outlet"
        axios.get(url)
        .then(res =>{
            this.setState({
                outlet : res.data.outlet
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
    componentDidMount = () =>{
        this.getOutlet()
    }

    render() {
        return (
            <div style={{backgroundColor: "#c6c6c6"}}>
                <Navbar/>
                <div className='container-fluid'>
                    <div className='row'>
                        <Sidebar/>
                        <div className='col-md-9 ms-sm-auto col-lg-10 px-md-4 ' style={{maxHeight: "92vh", overflowY: "auto", overflowX: "hidden"}}>
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                                <div className="col-lg-12 col-sm-12 scroll">
                                    <div className="card">
                                        <div className="card-header" style={{backgroundColor: "#a6051a", border: "none"}}>
                                            <h2 className="text-light text-center">Outlet</h2>
                                        </div>
                                        <button className="col-2 btn ms-3 my-2" onClick={() => this.handleAdd()} style={{backgroundColor: "black", color: "rgb(0, 222, 222)"}}>
                                            Tambah Outlet
                                        </button>
                                        <div className="mx-3">
                                            <table className="table text-center">
                                                <thead>
                                                    <tr className="">
                                                        <th>#</th>
                                                        <th>Nama</th>
                                                        <th>Alamat</th>
                                                        <th>Telp</th>
                                                        <th>Option</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.outlet.map((item, index) =>(
                                                        <tr key={index}>
                                                            <td>{index+1}</td>
                                                            <td>{item.nama_outlet}</td>
                                                            <td>{item.alamat}</td>
                                                            <td>{item.tlp}</td>
                                                            <td>
                                                                <button className="btn btn-light m-1 text-success" onClick={() => this.handleEdit(item)}>Edit</button> 
                                                                <button className="btn btn-light m-1 text-danger" onClick={() => this.handleDelete(item.id_user)}>Delete</button> 
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
