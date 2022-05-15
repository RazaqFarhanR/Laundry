import React from "react"
import { Route, Switch } from "react-router-dom";
import Home from "./pages/home"
import Login from "./pages/login";
import Admin from "./pages/admin";
import Kasir from "./pages/kasir";
import Customer from "./pages/customer";
import Paket from "./pages/paket";
import Transaksi from "./pages/transaksi";
import Dashboard from "./pages/dashboard";
import Outlet from "./pages/outlet";

class Main extends React.Component{
    render(){
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/login" component={Login}/>
                <Route path="/admin" component={Admin}/>
                <Route path="/kasir" component={Kasir}/>
                <Route path="/customer" component={Customer}/>
                <Route path="/paket" component={Paket}/>
                <Route path="/transaksi" component={Transaksi}/>
                <Route path="/outlet" component={Outlet}/>
            </Switch>
        )
    }
}
export default Main;