import React from "react"
import { Route, Switch } from "react-router-dom";
import Home from "./pages/home"
import Login from "./pages/login";
import Admin from "./pages/admin";
import Kasir from "./pages/kasir";
import Customer from "./pages/customer";
import Paket from "./pages/paket";
import Transaksi from "./pages/transaksi";
import DashboardAdmin from "./pages/dashboard_admin";
import dashboardOwner from "./pages/dashboard_owner";
import Outlet from "./pages/outlet";
import Keranjang from "./pages/keranjang";

class Main extends React.Component{
    render(){
        return (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/dashboard_owner" component={dashboardOwner}/>
                <Route path="/dashboard_admin" component={DashboardAdmin}/>
                <Route path="/login" component={Login}/>
                <Route path="/admin" component={Admin}/>
                <Route path="/kasir" component={Kasir}/>
                <Route path="/customer" component={Customer}/>
                <Route path="/paket" component={Paket}/>
                <Route path="/transaksi" component={Transaksi}/>
                <Route path="/outlet" component={Outlet}/>
                <Route path="/keranjang" component={Keranjang}/>
            </Switch>
        )
    }
}
export default Main;