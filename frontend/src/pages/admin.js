import React from "react"
import axios from "axios"
import {Modal, Button, Form} from "react-bootstrap"
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"

export default class Admin extends React.Component{
    constructor(){
        super()
        this.state = {
            admin:[],
            outlets: [],
            id_user: "",
            nama:"",
            alamat: "",
            gender: "",
            phone: "",
            username: "",
            password: "",
            role: "",
            id_outlet: "",
            fillPassword: true,
            fillOutlet: true,
            token: "",
            action: "",
            isModalOpen: false
        }
        if(localStorage.getItem('token')){
            this.state.token = localStorage.getItem('token')
        }
        else{
            window.location = '/login'
        }
    }
    headerConfig=() =>{
        let header = {
            headers: {Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }
    handleAdd = () =>{
        this.setState({
            nama: "",
            alamat: "",
            gender: "",
            phone: "",
            username: "",
            password: "",
            role: "admin",
            id_outlet: "",
            action: "insert",
            isModalOpen: true,
        })
    }
    handleEdit = (SelectedItem) =>{
        this.setState({
            id_user: SelectedItem.id_user,
            nama: SelectedItem.nama,
            alamat: SelectedItem.alamat,
            gender: SelectedItem.gender,
            phone: SelectedItem.phone,
            username: SelectedItem.username,
            password: SelectedItem.password,
            role: "admin",
            id_outlet: SelectedItem.id_outlet,
            fillPassword: false,
            fillOutlet: false,
            action: "update",
            isModalOpen: true
        })
    }
    handleClose = () =>{
        this.setState({
            isModalOpen: false
        })
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSearch = (e) =>{
        let url = "http://localhost:2004/user/cari"
        if (e.keyCode === 13){
            let data ={
                keyword: this.state.keyword
            }
            axios.post(url, data, this.headerConfig())
            .then(res =>{
                this.setState({
                    users: res.data.user
                })
            })
            .catch(err =>{
                console.log(err.message)
            })
        }
    }
    handleSave = (e) =>{
        e.preventDefault()
        let form = {
            id_user: this.state.id_user,
            nama: this.state.nama,
            alamat: this.state.alamat,
            gender: this.state.gender,
            phone: this.state.phone,
            username: this.state.username,
            role: this.state.role,
            id_outlet: this.state.id_outlet
        }
        if (this.state.fillPassword){
            form.password = this.state.password
        }
        let url = ""

        if (this.state.action === "insert"){
            
            url = "http://localhost:1305/api/user"

            axios.post(url, form, this.headerConfig())
            .then(res =>{
                this.getAdmin()
                this.getOutlet()
                this.handleClose()
                console.log(this.state.id_outlet)
            })
            .catch(err => {
                console.log(err.message)
            })
        }else if (this.state.action === "update"){
            url = "http://localhost:1305/api/user/" + this.state.id_user

            axios.put(url, form, this.headerConfig())
            .then(res =>{
                this.getAdmin()
                this.getOutlet()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }
    handleDelete = (id_user) =>{
        let url = "http://localhost:1305/api/user/" + id_user

        if (window.confirm('Anda yakin ingin menghapus data ini?')){
            axios.delete(url, this.headerConfig())
            .then(res =>{
                console.log(res.data.message)
                this.getAdmin()
            })
            .catch(err =>{
                console.log(err.message)
            })
        }
    }
    // getOutlet = () =>{
    //     let url = "http://localhost:1305/outlet"
    //     axios.get(url)
    //     .then(res =>{
    //         this.setState({
    //             outlets : res.data.outlet
    //         })
    //     })
    //     .catch(err =>{
    //         console.log(err.message)
    //     })
    // }
    getAdmin = () => {
        let url = "http://localhost:1305/api/user/admin"
        axios.get(url, this.headerConfig())
        .then(res =>{
            this.setState({
                admin : res.data.user
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
    componentDidMount = () =>{
        this.getAdmin()
        // this.getOutlet()
    }
    render(){
        return(
            <div style={{backgroundColor: "#c6c6c6"}}>
                <Navbar/>
                <div className='container-fluid'>
                    <div className='row'>
                        <Sidebar/>
                        <div className='col-md-9 ms-sm-auto col-lg-10 px-md-4 ' style={{maxHeight: "92vh", overflowY: "auto", overflowX: "hidden"}}>
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                                <div className="col-lg-12 col-sm-12 scroll">
                                    <div className="card">
                                        <div className="card-header" style={{backgroundColor: "#a6051a", border: "none"}}>
                                            <h2 className="text-light">Admin</h2>
                                        </div>
                                        <button className="col-2 btn ms-3 my-2" onClick={() => this.handleAdd()} style={{backgroundColor: "black", color: "rgb(0, 222, 222)"}}>
                                            Tambah Admin
                                        </button>
                                        <div className="mx-3">
                                            <table className="table text-center me-2">
                                                <thead>
                                                    <tr className="">
                                                        <th>#</th>
                                                        <th>Nama</th>
                                                        <th>Alamat</th>
                                                        <th>Jenis Kelamin</th>
                                                        <th>Telp</th>
                                                        <th>Outlet</th>
                                                        <th>Option</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.admin.map((item, index) =>(
                                                        <tr key={index}>
                                                            <td>{index+1}</td>
                                                            <td>{item.nama}</td>
                                                            <td>{item.alamat}</td>
                                                            <td>{item.gender}</td>
                                                            <td>{item.phone}</td>
                                                            <td>{item.outlet.nama_outlet}</td>
                                                            <td>
                                                                <button className="btn btn-light m-1 text-success" onClick={() => this.handleEdit(item)}>Edit</button> 
                                                                <button className="btn btn-light m-1 text-danger" onClick={() => this.handleDelete(item.id_user)}>Delete</button> 
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* modal member */}
                <Modal show={this.state.isModalOpen} onHide={this.handleClose}
                      size="xl"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered>
                    <Modal.Header closeButton>
                        <Modal.Title>form admin</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.handleSave(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="nama">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text" name="nama" placeholder="Masukkan Nama" value={this.state.nama}
                                    onChange={e => this.setState({ nama: e.target.value })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="alamat">
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control type="text" name="alamat" placeholder="Masukkan alamat" value={this.state.alamat}
                                    onChange={e => this.setState({ alamat: e.target.value })}
                                    required
                                />                                
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="jenisKelamin">
                                <Form.Label>Jenis Kelamin</Form.Label>
                                    <select name="gender" value={this.state.gender} onChange={this.handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option selected></option>
                                        <option value={"Laki-laki"} onChange={e => this.handleChange({ gender: e.target.value })}>Laki-laki</option>
                                        <option value={"Perempuan"} onChange={e => this.handleChange({ gender: e.target.value })}>Perempuan</option>
                                    </select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="telepon">
                                <Form.Label>Telepon</Form.Label>
                                <Form.Control type="text" name="phone" placeholder="Masukkan Telepon" value={this.state.phone}
                                    onChange={e => this.setState({ phone: e.target.value })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" placeholder="Masukkan Username" value={this.state.username}
                                    onChange={e => this.setState({ username: e.target.value })}
                                    required
                                />
                            </Form.Group>
                            {this.state.action === "update" && this.state.fillPassword === false ? (
                                <Button className="btn btn-dark mb-1 btn-block text-warning" style={{backgroundColor:"black"}}
                                    onClick={() => this.setState({ fillPassword: true })}>
                                    Change Password
                                </Button>

                            ) : (

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="Masukkan Password"
                                        onChange={e => this.setState({ password: e.target.value })}
                                    />
                                </Form.Group>
                            )}
                            {this.state.action === "update" && this.state.fillOutlet === false ? (
                                <Button className="btn btn-dark mb-1 btn-block text-warning" style={{backgroundColor:"black"}}
                                    onClick={() => this.setState({ fillOutlet: true })}>
                                    Change Outlet
                                </Button>

                            ) : (
                                <Form.Group className="mb-3" controlId="outlet">
                                    <Form.Label>outlet</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                    <option>--- select outlet ---</option>
                                    {this.state.outlets.map((item) =>(
                                        <option name="outlet" value={item.id_outlet} onChange={e => this.setState({ id_outlet: e.target.value })} >{item.nama_outlet}</option>
                                        )
                                    )}
                                    </Form.Select>
                                </Form.Group>
                            )}
                        </Modal.Body>
                        <Modal.Footer>

                            <Button className="btn btn-danger" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button className="btn btn-success" type="submit" onClick={this.handleClose}>
                                Save
                            </Button>

                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }
}
