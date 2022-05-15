import React from "react";
import axios from "axios";
// import '../style/login.css'

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
                let nama = res.data.data.nama
                let role = res.data.data.role
                let user = res.data.data
                let token = res.data.token
                localStorage.setItem("nama", nama)
                localStorage.setItem("role", role)
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)
                
                let user_role = (localStorage.getItem('role'))
                if (user_role === "owner"){
                  
                  window.location = '/dashboard'
                }
                else if (user_role === "admin"){
                  let outlet = res.data.data.id_outlet
                  localStorage.setItem("id_outlet", outlet)
                  
                  window.location = '/dashboard'
                }
                else if (user_role === "kasir"){
                  let outlet = res.data.data.id_outlet
                  localStorage.setItem("id_outlet", outlet)

                  window.location = "/"
                }
                else if (user_role === "customer"){
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
            <div>
            <img className="wave" src="img/wave.png"/>
            <div className="container">
              <div className="img">
                <img src="img/bg.svg"/>
              </div>
              <div className="login-content">
              <form onSubmit={(e) => this.handleLogin(e)}>
                  <h2 className="title">Welcome</h2>
                  <div className="input-div one">
                    <div className="i">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="div">
                      <h5>Username</h5>
                      <input name="username" type="text" required="" autofocus="" className="form-control" onChange={this.handleChange} value={this.state.username}/> 
                    </div>
                  </div>
                  <div className="input-div pass">
                    <div className="i"> 
                      <i className="fas fa-lock"></i>
                    </div>
                    <div className="div">
                      <h5>Password</h5>
                      <input name="password" type="password" required="" className="form-control" onChange={this.handleChange} value={this.state.password}/>
                    </div>
                  </div>
                  <a href="#">Forgot Password?</a>
                  <input type="submit" className="btn"/>
                </form>
              </div>
            </div>
            <script type="text/javascript" src="../js/main.js"></script>
            </div>

        // <div className="container-fluid">
        //     <div className="row no-gutter">
        //         <div className="col-md-6 d-none d-md-flex bg-dark bg-image"></div>
        //         <div className="col-md-6 bg-dark">
        //             <div className="login d-flex align-items-center py-5">
        //                 <div className="container ">
        //                     <div className="row">
        //                         <div className="col-lg-7 col-xl-6 mx-auto">
        //                             <h3 className="display-4 text-danger">LOGIN!!</h3> <br/>
        //                             <form onSubmit={(e) => this.handleLogin(e)}>
        //                                 <div className="form-group mb-3"> 
        //                                     <input name="username" type="text" placeholder="Username" required="" autofocus="" className="form-control rounded-pill border-0 shadow-sm px-4 text-danger" style={{backgroundColor:"black"}} onChange={this.handleChange} value={this.state.username}/> 
        //                                 </div>
        //                                 <div className="form-group mb-3"> 
        //                                     <input name="password" type="password" placeholder="Password" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-danger" style={{backgroundColor:"black"}} onChange={this.handleChange} value={this.state.password}/><br/> 
        //                                 </div>
        //                                 <button type="submit" className="btn btn-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm">Sign in</button>
        //                                 <div className="text-center d-flex justify-content-between mt-4">
        //                                     {/* <p> OR &nbsp<a href=" " className="font-italic text-muted"> <u>Create Account</u></a></p> */}
        //                                 </div>
        //                             </form>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        )
    }
}