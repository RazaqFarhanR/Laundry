import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Test extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            user: [],
            Username: ""
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
    Logout = () =>{
        window.location = "/login"
        localStorage.clear()
    }
    getUser = () => {
        let nama = (localStorage.getItem('nama'))
        let url = "http://localhost:1305/api/user"

        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({
                Username : nama,
                user : res.data.user
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
    componentDidMount = () => {
        this.getUser()
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "black"}}>
                 <div class="container-fluid">
                    <Link className="navbar-brand ms-5" style={{color:"red"}} to="/">Toko Komputer</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
                         <li className="nav-item" >
                             <Link to="/" className="nav-link" style={{color: "red"}}>
                                 Dashboard
                             </Link>
                         </li>
                         
                         <li className="nav-item">
                             <Link to="/customer" className="nav-link" style={{color: "red"}}>
                                 Customer
                             </Link>
                         </li>
                         <li className="nav-item">
                             <Link to="/product" className="nav-link" style={{color: "red"}}>
                                 Product
                             </Link>
                         </li>
                         <li className="nav-item">
                             <Link to="/transaksi" className="nav-link" style={{color: "red"}}>
                                 Transaction
                             </Link>
                         </li>
                         <li className="nav-item">
                             <Link to="/admin" className="nav-link" style={{color: "red"}}>
                                 Adminstrator
                             </Link>
                         </li>
                         <li className="nav-item">
                             <Link to="/testpage" className="nav-link" style={{color: "red"}}>
                                 test
                             </Link>
                         </li>
                         <li className="nav-item">
                            <Link className="nav-link" onClick={() => this.Logout()}>
                                Log Out
                            </Link>
                            <Link href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="bi me-2" width="16" height="16"></span>
                        <strong>{this.state.Username}</strong>
                    </Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        )
    }
}