import React from "react";
import axios from "axios";
// import '../style/login.css'

export default class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            username : "",
            password : ""
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleLogin = (e) => {
        e.preventDefault() 
        let data = {
            username : this.state.username,
            password : this.state.password
        }
        let url = "http://localhost:2004/user/auth"
        axios.post(url, data)
        .then(res => {
            if (res.data.logged){
                let name = res.data.data.name
                let user = res.data.data
                let token = res.data.token
                localStorage.setItem("name", name)
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)
                window.location = '/'
            }
            else{
                window.alert(res.data.message)
            }
        })
    }
    render(){
        return(
        <div className="container-fluid">
            <div className="row no-gutter">
                <div className="col-md-6 d-none d-md-flex bg-dark bg-image"></div>
                <div className="col-md-6 bg-dark">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container ">
                            <div className="row">
                                <div className="col-lg-7 col-xl-6 mx-auto">
                                    <h3 className="display-4 text-danger">LOGIN!!</h3> <br/>
                                    <form onSubmit={(e) => this.handleLogin(e)}>
                                        <div className="form-group mb-3"> 
                                            <input name="username" type="text" placeholder="Username" required="" autofocus="" className="form-control rounded-pill border-0 shadow-sm px-4 text-danger" style={{backgroundColor:"black"}} onChange={this.handleChange} value={this.state.username}/> 
                                        </div>
                                        <div className="form-group mb-3"> 
                                            <input name="password" type="password" placeholder="Password" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-danger" style={{backgroundColor:"black"}} onChange={this.handleChange} value={this.state.password}/><br/> 
                                        </div>
                                        <button type="submit" className="btn btn-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm">Sign in</button>
                                        <div className="text-center d-flex justify-content-between mt-4">
                                            {/* <p> OR &nbsp<a href=" " className="font-italic text-muted"> <u>Create Account</u></a></p> */}
                                        </div>
                                    </form>
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