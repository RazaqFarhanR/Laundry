import React from "react"
import { Route, Switch } from "react-router-dom";
import Home from "./pages/home"
import Login from "./pages/login";
import Kasir from "./pages/kasir";
import Member from "./pages/member";
import Paket from "./pages/paket";
import Transaksi from "./pages/transaksi";
import User from "./pages/user";

class Main extends React.Component{
    render(){
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login}/>
                <Route path="/kasir" component={Kasir}/>
                <Route path="/member" component={Member}/>
                <Route path="/paket" component={Paket}/>
                <Route path="/transaksi" component={Transaksi}/>
                <Route path="/user" component={User}/>
            </Switch>
        )
    }
}
export default Main;