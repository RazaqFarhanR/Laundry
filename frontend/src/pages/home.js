import React from "react"
import Navbar from "../components/navbar"
import Test from "../components/test"

export default class Home extends React.Component{
    render(){
        return(
            <div>
                <Navbar />
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
