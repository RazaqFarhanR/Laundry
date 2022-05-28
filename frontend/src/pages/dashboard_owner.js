import React from "react"
import Navbar from "../components/navbar"
import { MdPeopleAlt} from "react-icons/md";
import { BsCart2, BsShop } from "react-icons/bs"
import {GoPackage} from "react-icons/go"
import {FaCashRegister} from "react-icons/fa"
import { GrUserSettings } from "react-icons/gr";
import Sidebar from "../components/sidebar";

export default class dashboardOwner extends React.Component{
    constructor(){
        super()
        this.state ={
            adminCount: 0,
            outletCount: 0,
            transaksiCount: 0
        }
    }
    render(){
        return(
            <div style={{backgroundColor: "#c6c6c6"}}>
                <Navbar/>
                <div className='container-fluid'>
                    <div className='row'>
                        <Sidebar/>
                        <div className='col-md-9 ms-sm-auto col-lg-10 px-md-4 ' style={{maxHeight: "92vh", overflowY: "auto", overflowX: "hidden"}}>
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                                <div className="col-lg-12 col-sm-12 p-2 scroll">
                                    <div class="alert alert-dark mb-4" style={{backgroundColor: "#a6051a", border: "none"}}>
                                        <h2 style={{color:"white"}}>Dashboard</h2>
                                    </div>
                                    <div className="row" >
                                        <div className="col">
                                            <div className='card alert alert-secondary' style={{backgroundColor:"transparent", borderColor: "black", borderWidth: "3px", color: "black"}}>
                                                <div className='row'>
                                                    <div className='col-4 text-center isi'><MdPeopleAlt size={70}/></div>
                                                    <div className='col mx-3 isi'>
                                                        <h4 className='text-center'>Total Admin</h4>
                                                        <h3 className='text-center'>{this.state.adminCount}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className='card alert alert-secondary' style={{backgroundColor:"transparent", borderColor: "black", borderWidth: "3px", color: "black"}}>
                                                <div className='row'>
                                                    <div className='col-5 isi'><BsShop size={70}/></div>
                                                    <div className='col isi text-center mx-3'>
                                                        <h4 className=''>Total Outlet</h4>
                                                        <h3 className=''>{this.state.outletCount}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className='card alert alert-secondary' style={{backgroundColor:"transparent", borderColor: "black", borderWidth: "3px", color: "black"}}>
                                                <div className='row'>
                                                    <div className='col-5 isi'><BsCart2 size={68}/></div>
                                                    <div className='col isi text-center'>
                                                        <h4 className=''>Total Transaksi</h4>
                                                        <h3 className=''>{this.state.transaksiCount}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        
                                    <br/>
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="card" style={{ height: '15rem', backgroundColor:'transparent', border: "solid black" }}>
                                                <div className="card-body row" >
                                                    <h5 className='text-danger'>Paket</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card" style={{ height: '15rem', backgroundColor:'transparent', border: "solid black" }}>
                                                <div className="card-body row" >
                                                    <h5 className='text-danger'>Transaksi</h5>
                                                </div>
                                            </div>  
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
