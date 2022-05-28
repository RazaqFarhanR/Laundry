import axios from "axios"
import React from "react"
import {Link} from "react-router-dom"
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

export default class NavbarTest extends React.Component{
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
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#00d2be"}}>
            {/* <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "rgb(0, 222, 222)" }}> */}
                <Link to="/" className="navbar-brand ms-5">
                    <h4 className="fst-italic fw-bold">Laundry Balap</h4>
                </Link>

                {/* show and hide menu */}
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                {/* menu */}
                {(() => {
                    if (this.state.role === "owner") {
                      return (
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav me-5 pe-4 ms-auto">
                                <li className="nav-item">
                                    <Link to="/dashboard" className="nav-link">
                                        <h6>Dashboard</h6>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin" className="nav-link">
                                        <h6>Admin</h6>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/outlet" className="nav-link">
                                        <h6>Outlet</h6>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={() => this.Logout()}>
                                        Log Out
                                    </Link>
                                </li>
                            </ul>
                        </div>
                      )
                    } else if (this.state.role === "admin") {
                      return (
                        <div class="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav me-5 pe-4 ms-auto">
                                    <li className="nav-item">
                                        <Link to="/dashboard" className="nav-link">
                                            <h6>Dashboard</h6>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/kasir" className="nav-link">
                                            <h6>kasir</h6>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/paket" className="nav-link">
                                            <h6>Paket</h6>
                                        </Link>
                                    </li>
                                    <div class="dropdown ms-3">
                                        <Link  className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="https://github.com/mdo.png" alt="" width="25" height="25" className="rounded-circle me-2 mt-1"/>
                                        <strong>{this.state.nama}</strong>
                                        </Link>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownUser">
                                            <li><a class="dropdown-item" >New project...</a></li>
                                            <li><a class="dropdown-item" >Settings</a></li>
                                            <li><a class="dropdown-item" >Profile</a></li>
                                            <li><hr class="dropdown-divider"/></li>
                                            <li><Link className="dropdown-item" onClick={() => this.Logout()}>
                                                Log Out
                                            </Link></li>
                                        </ul>
                                    </div>  
                                </ul>
                            </div>
                      )
                    } else if (this.state.role === "kasir" ) {
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
                                    <div class="dropdown ms-3 mt-1">
                                        <a  className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="https://github.com/mdo.png" alt="" width="25" height="25" className="rounded-circle me-2 mt-1"/>
                                        <strong>{this.state.nama}</strong>
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
        )
    }
}

