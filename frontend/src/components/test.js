import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

export default class Test extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            user: [],
            Username: ""
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
    Logout = () =>{
        window.location = "/login"
        localStorage.clear()
    }
    getUser = () => {
        let nama = (localStorage.getItem('nama'))
        let url = "http://localhost:1305/api/user"

        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({
                Username : nama,
                user : res.data.user
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
    componentDidMount = () => {
        this.getUser()
    }
    render(){
        return(
            <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand className="nav-item">React-Bootstrap
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#link">Link</Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        )
    }
}