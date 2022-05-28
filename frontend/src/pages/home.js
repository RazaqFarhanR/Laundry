import React from "react"
import Navbar from "../components/navbar"
import NavbarTest from "../components/navbartest"


export default class Home extends React.Component{
    render(){
        return(
            <div>
                <NavbarTest />
                <div className="container-fluid">
                    <img src="..." className="img-fluid" alt="..."/>
                    <div className="alert alert-success">
                        Ini adalah Halaman Home
                    </div>
                </div>
            </div>
        )
    }
}
