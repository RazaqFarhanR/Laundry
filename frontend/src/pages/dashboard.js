import React from "react"
import Navbar from "../components/navbar"

export default class Dashboard extends React.Component{
 
    render(){
        return(
            <div>
                <Navbar/>
                <div className="container-fluid">
                    <div className="alert alert-success">
                        Ini adalah Halaman Dashboard
                    </div>
                </div>
            </div>
        )
    }
}
