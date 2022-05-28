import axios from "axios"
import React from "react"
import {Link} from "react-router-dom"
import '../style/navbar.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

export default class Navbar extends React.Component{
    constructor(){
        super()
        this.state = {
            role : "",
            token : "",
            nama: ""
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
            <div>
            {(() =>{
                if(this.state.role === "owner" || this.state.role === "admin"){
                    return(
                        <div>
                            <nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#00d2be",}}>
                                <button class="navbar-toggler ms-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <Link to="/" className="navbar-brand ms-5 me-auto">
                                    <h4 className="fst-italic fw-bold">Laundry Balap</h4>
                                </Link>   
                                <div class="dropdown me-5">
                                    <a  className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://github.com/mdo.png" alt="" width="25" height="25" className="rounded-circle me-2 mt-1"/>
                                    <strong>{this.state.nama}</strong>
                                    </a>
                                    <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser">
                                        <li><a class="dropdown-item" >New project...</a></li>
                                        <li><a class="dropdown-item" >Settings</a></li>
                                        <li><a class="dropdown-item" >Profile</a></li>
                                        <li><hr class="dropdown-divider"/></li>
                                        <li><Link className="nav-link ms-2" onClick={() => this.Logout()}>
                                            Log Out
                                        </Link></li>
                                    </ul>
                                </div>
                            </nav>
                            <div style={{backgroundColor: "#00d2be"}} class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                                <div>
                                    <div class="offcanvas-header">
                                        <Link to="/" className="navbar-brand">
                                            <h4 className="fst-italic fw-bold text-dark" >Laundry Balap</h4>
                                        </Link>
                                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div class="offcanvas-body">
                                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                        <li className="nav-item">
                                            <Link to="/dashboard" className="nav-link">
                                                <h6 className="nav-text">Dashboard</h6>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/admin" className="nav-link">
                                                <h6 className="nav-text">Admin</h6>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/outlet" className="nav-link">
                                                <h6 className="nav-text">Outlet</h6>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" onClick={() => this.Logout()}>
                                                <h6 className="nav-text">Log Out</h6>
                                            </Link>
                                        </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                } else if (this.state.role === "kasir" || this.state.role === "customer"){
                    return(
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#00d2be"}}>
                            {/* <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "rgb(0, 222, 222)" }}> */}
                                <Link to="/" className="navbar-brand ms-5">
                                    <h4 className="fst-italic fw-bold">Laundry Balap</h4>
                                </Link>
            
                                {/* show and hide menu */}
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                {(() => {
                                    if (this.state.role === "kasir" ) {
                                        return (
                                            <div class="collapse navbar-collapse" id="navbarNav">
                                                <ul className="navbar-nav me-5 pe-4 ms-auto">
                                                    <li className="nav-item">
                                                        <Link to="/" className="nav-link">
                                                            <h6>Home</h6>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link to="/customer" className="nav-link">
                                                            <h6>Customer</h6>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link to="/transaksi" className="nav-link">
                                                            <h6>Transaksi</h6>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link to="/keranjang" className="nav-link">
                                                            <h6>Keranjang</h6>
                                                        </Link>
                                                    </li>
                                                    <div class="dropdown ms-3 mt-1 me-2">
                                                        <a  className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <img src="https://github.com/mdo.png" alt="" width="25" height="25" className="rounded-circle me-2 mt-1"/>
                                                        <strong>{this.state.nama}</strong>
                                                        </a>
                                                        <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser">
                                                            <li><a class="dropdown-item" >New project...</a></li>
                                                            <li><a class="dropdown-item" >Settings</a></li>
                                                            <li><a class="dropdown-item" >Profile</a></li>
                                                            <li><hr class="dropdown-divider"/></li>
                                                            <li><Link className="nav-link ms-2" onClick={() => this.Logout()}>
                                                                Log Out
                                                            </Link></li>
                                                        </ul>
                                                    </div>
                                                </ul>
                                            </div>
                                        )
                                    } else if (this.state.role === "customer" ) {
                                        return (
                                            <div class="collapse navbar-collapse" id="navbarNav">
                                                <ul className="navbar-nav me-5 pe-4 ms-auto">
                                                    <li className="nav-item">
                                                        <Link to="/" className="nav-link">
                                                            <h6>Home</h6>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link to="/paket" className="nav-link">
                                                            <h6>Paket</h6>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link to="/transaksi" className="nav-link">
                                                            <h6>Transaksi</h6>
                                                        </Link>
                                                    </li>
                                                    <div class="dropdown ms-3">
                                                        <a  class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2"/>
                                                        <strong>{this.state.nama}</strong>
                                                        </a>
                                                        <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2" style={{}}>
                                                        <li><a class="dropdown-item" >New project...</a></li>
                                                        <li><a class="dropdown-item" >Settings</a></li>
                                                        <li><a class="dropdown-item" >Profile</a></li>
                                                        <li><hr class="dropdown-divider"/></li>
                                                        <li><Link className="nav-link" onClick={() => this.Logout()}>
                                                            Log Out
                                                        </Link></li>
                                                        </ul>
                                                    </div>
                                                </ul>
                                            </div>
                                        )                                           
                                    }
                                })()}
                            </nav>
                    </div>
                    )
                }
            })()}
            </div>
        )
    }
}

