import axios from "axios"
import React from "react"
import {Link} from "react-router-dom"

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
        let user_role = (localStorage.getItem('role'))
        let user_nama = (localStorage.getItem('nama'))
        let url = "http://localhost:1305/api/user"

        axios.get(url, this.headerConfig())
        .then(res =>{
            this.setState({
                nama : user_nama,
                role : user_role

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
            <div className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "rgb(0, 222, 222)" }}>
                <Link to="/" className="navbar-brand ms-5">
                    <h4>Laundry</h4>
                </Link>

                {/* show and hide menu */}
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                {/* menu */}
                {(() => {
                    if (this.state.role === "owner") {
                      return (
                        <div id="menu" className="navbar-collapse collpase">
                            <ul className="navbar-nav me-5 ms-auto">
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
                            <div id="menu" className="navbar-collapse collpase">
                                <ul className="navbar-nav me-5 pe-4 ms-auto">
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link">
                                            <h6>Home</h6>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/kasir" className="nav-link">
                                            <h6>kasir</h6>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/customer" className="nav-link">
                                            <h6>Customer</h6>
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

                                    <div class="dropdown ms-3 mt-1">
                                        <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="https://github.com/mdo.png" alt="" width="25" height="25" className="rounded-circle me-2 mt-1"/>
                                        <strong>{this.state.nama}</strong>
                                        </a>
                                        <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2" style={{}}>
                                        <li><a class="dropdown-item" href="#">New project...</a></li>
                                        <li><a class="dropdown-item" href="#">Settings</a></li>
                                        <li><a class="dropdown-item" href="#">Profile</a></li>
                                        <li><hr class="dropdown-divider"/></li>
                                        <li><Link className="nav-link" onClick={() => this.Logout()}>
                                            Log Out
                                        </Link></li>
                                        </ul>
                                    </div>
                                    {/* DROPDOWN */}
                                            {/* <li class="nav-item dropdown">
                                                <h6 class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">{this.state.nama}</h6>
                                                <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#"></a></li>
                                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                <li><hr class="dropdown-divider"/></li>
                                                <li className="dropdown-item">
                                                <Link className="nav-link" onClick={() => this.Logout()}>
                                                    Log Out
                                                </Link>
                                            </li> */}
                                </ul>
                            </div>
                      )
                    } else if (this.state.role === "kasir" ) {
                        return (
                            <div id="menu" className="navbar-collapse collpase">
                                <ul className="navbar-nav me-5 pe-3 ms-auto">
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
                                    <div class="dropdown ms-3">
                                        <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2"/>
                                        <strong>{this.state.nama}</strong>
                                        </a>
                                        <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2" style={{}}>
                                        <li><a class="dropdown-item" href="#">New project...</a></li>
                                        <li><a class="dropdown-item" href="#">Settings</a></li>
                                        <li><a class="dropdown-item" href="#">Profile</a></li>
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
                            <div id="menu" className="navbar-collapse collpase">
                                <ul className="navbar-nav me-5 pe-3 ms-auto">
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
                                        <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2"/>
                                        <strong>{this.state.nama}</strong>
                                        </a>
                                        <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2" style={{}}>
                                        <li><a class="dropdown-item" href="#">New project...</a></li>
                                        <li><a class="dropdown-item" href="#">Settings</a></li>
                                        <li><a class="dropdown-item" href="#">Profile</a></li>
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
            </div>
        )
    }
}

