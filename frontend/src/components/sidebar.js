import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {BsSpeedometer2, BsShop} from "react-icons/bs";
import {GrUserAdmin} from "react-icons/gr";
import {FiUsers} from "react-icons/fi"
import {GoPackage} from "react-icons/go"
import { BsCart2, BsGear } from "react-icons/bs"


export default class Sidebar extends React.Component{
    constructor(){
        super()
        this.state = {
            role : "",
            token : "",
            nama : ""
        }
        if(localStorage.getItem("token")){
            this.state.token = localStorage.getItem("token")
        }else{
            window.location = "/login"
        }
    }
    headerConfig = () =>{
        let header = {
            headers : { Authorization : `Bearer ${this.state.token}` }
        }
        return header
    }
    Logout = () => {
        window.location = "/login"
        localStorage.clear()
    }
    getUser = () => {

        let user = JSON.parse(localStorage.getItem('user'))
        let url = "http://localhost:1305/api/user"

        axios.get(url, this.headerConfig())
        .then(res =>{
            this.setState({
                nama : user.nama,
                role : user.role

            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
    componentDidMount = () =>{
        this.getUser()
    }
    render(){
        return(
            <nav className="col d-none d-md-block sidebar d-flex flex-column flex-shrink-0 p-3" style={{backgroundColor: "black", minHeight: "92vh", height: "auto"}}>
                {/* menu */}
                {(() => {
                    if (this.state.role === "admin") {
                      return (
                        <ul className="nav nav-pills flex-column mt-2">
                            <li>
                                <Link to="/dashboard" className="nav-link" style={{color:"#00d2be"}}>
                                    <span className="bi me-2" width="16" height="16"><BsSpeedometer2 size={25}/></span>
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/kasir" className="nav-link" style={{color:"#00d2be"}}>
                                <span className="bi me-2" width="16" height="16"><FiUsers size={25}/></span>
                                Kasir
                                </Link>
                            </li>
                            <li>
                                <Link to="/paket" className="nav-link" style={{color:"#00d2be"}}>
                                <span className="bi me-2" width="16" height="16"><GoPackage size={25}/></span>
                                Paket
                                </Link>
                            </li>
                            <li>
                                <Link to="/transaksi" className="nav-link" style={{color:"#00d2be"}}>
                                <span className="bi me-2" width="16" height="16"><BsCart2 size={24}/></span>
                                Transaksi
                                </Link>
                            </li>
                        </ul>
                      )
                    }else if (this.state.role === "owner"){
                        return (
                            <ul className="nav nav-pills flex-column mt-2">
                                <li>
                                    <Link to="/dashboard_owner" className="nav-link" style={{color:"#00d2be"}}>
                                        <span className="bi me-2" width="16" height="16"><BsSpeedometer2 size={25}/></span>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin" className="nav-link" style={{color:"#00d2be"}}>
                                        <span className="bi me-2" width="16" height="16"><FiUsers size={25}/></span>
                                        Admin
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/outlet" className="nav-link" style={{color:"#00d2be"}}>
                                        <span className="bi me-2" width="16" height="16"><BsShop size={25}/></span>
                                        Outlet
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin" className="nav-link" style={{color:"#00d2be"}}>
                                        <span className="bi me-2" width="16" height="16"><BsCart2 size={24}/></span>
                                        Transaksi
                                    </Link>
                                </li>
                            </ul>
                        )
                    }
                })()}
                
                <hr className="border"/>
                <div className="dropup" style={{marginTop: "12cm"}}>
                    <a  className="d-flex align-items-center link-light text-decoration-none dropdown-toggle" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="25" height="25" className="rounded-circle me-2 mt-1"/>
                    <strong className="text-light">{this.state.nama}</strong>
                    </a>
                    <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser">
                        <li><a class="dropdown-item" >New project...</a></li>
                        <li><a class="dropdown-item" >Settings</a></li>
                        <li><a class="dropdown-item" >Profile</a></li>
                        <li><hr class="dropdown-divider"/></li>
                        <li><Link className="nav-link" onClick={() => this.Logout()}>
                            Log Out
                        </Link></li>
                    </ul>
                </div>                 
            </nav>
        )
    }
}