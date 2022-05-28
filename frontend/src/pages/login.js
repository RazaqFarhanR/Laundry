import React from "react";
import axios from "axios";
import "../style/login.css"

export default class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            username : "",
            password : "",
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
        let url = "http://localhost:1305/api/user/auth"
        axios.post(url, data)
        .then(res => {
            if (res.data.logged){
                let user = res.data.data
                let token = res.data.token
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)
                
                let user_role = JSON.parse(localStorage.getItem('user'))
                if (user_role.role === "owner"){
                  
                  window.location = '/dashboard_owner'
                }
                else if (user_role.role === "admin"){
                  let outlet = res.data.data.id_outlet
                  localStorage.setItem("id_outlet", outlet)
                  
                  window.location = '/dashboard_admin'
                }
                else if (user_role.role === "kasir"){
                  let outlet = res.data.data.id_outlet
                  localStorage.setItem("id_outlet", outlet)

                  window.location = "/"
                }
                else if (user_role.role === "customer"){
                  window.location = "/"
                }
            }
            else{
                window.alert(res.data.message)
            }
        })
    }
    render(){
        return(
          <div className="container-fluid bg-login">
            <div className="row no-gutter">
                <div className="col-md-6 d-none d-md-flex"></div>
                <div className="col-md-6">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container ">
                            <div className="row">
                                <div className="col-lg-7 col-xl-6 mx-auto">
                                    <form onSubmit={(e) => this.handleLogin(e)}>
                                    <h3 className="display-4" style={{color: "#00a19c"}}>LOGIN!!</h3> <br/>
                                    <div className="mb-3" style={{borderBottom: "2px solid #00a19c"}}>
                                      <div className="form-floating">
                                        <input style={{color: "#00a19c", backgroundColor: "transparent", border:"none"}} name="username" type="text" required="" autofocus="" id="floatingInput" className="form-control" placeholder="username" onChange={this.handleChange} value={this.state.username}/> 
                                        <label className="placeholder-login" for="floatingInput">Username</label>
                                      </div>
                                    </div>
                                    <div className="mb-3" style={{borderBottom: "2px solid #00a19c"}}>
                                      <div className="form-floating">
                                        <input style={{color: "#00a19c", backgroundColor: "transparent", border:"none"}} name="password" type="password" required="" autofocus="" id="floatingInput" className="form-control" placeholder="username" onChange={this.handleChange} value={this.state.password}/> 
                                        <label className="placeholder-login" for="floatingInput">Password</label>
                                      </div>
                                    </div>
                                    <div class="d-grid gap-2">
                                      <button style={{backgroundColor: "#00a19c"}} type="submit" className="bt-login btn text-uppercase my-3 rounded-pill shadow-sm">Sign in</button>
                                      <div className="text-center d-flex justify-content-between mt-4">
                                          <p>
                                            <a href=" " className="font-italic text-muted"> 
                                              <u>Create Account</u>
                                            </a>
                                          </p>
                                      </div>
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