import React from "react"
import axios from "axios"
import {Modal, Button, Form} from "react-bootstrap"
import Navbar from "../components/navbar"

export default class Admin extends React.Component{
    constructor(){
        super()
        this.state = {
            admin:[],
            id_user: "",
            nama:"",
            alamat: "",
            gender: "",
            phone: "",
            username: "",
            password: "",
            role: "",
            fillPassword: true,
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
            fillPassword: false,
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
            role: this.state.role
        }
        if (this.state.fillPassword){
            form.password = this.state.password
        }
        let url = "http://localhost:1305/api/user"

        if (this.state.action === "insert"){
            
            url = "http://localhost:1305/api/user"

            axios.post(url, form, this.headerConfig())
            .then(res =>{
                this.getAdmin()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }else if (this.state.action === "update"){
            url = "http://localhost:1305/api/user/" + this.state.id_user

            axios.put(url, form, this.headerConfig())
            .then(res =>{
                this.getAdmin()
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
    }
    render(){
        return(
            <div>
                <Navbar/>
                <div className="card m-3">
                <div className="card-header" style={{backgroundColor: "rgb(211, 0, 0)", border: "none"}}>
                    <h2 className="text-light">Admin</h2>
                </div>
                <button className="col-2 btn ms-3 my-2" onClick={() => this.handleAdd()} style={{backgroundColor: "black", color: "rgb(0, 222, 222)"}}>
                    Tambah Admin
                </button>
                <table className="table text-center border-dark me-2">
                    <thead>
                        <tr className="">
                            <th>#</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Jenis Kelamin</th>
                            <th>Telp</th>
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
                                <td>
                                    <button className="btn btn-light m-1 text-success" onClick={() => this.handleEdit(item)}>Edit</button> 
                                    <button className="btn btn-light m-1 text-danger" onClick={() => this.handleDelete(item.id_user)}>Delete</button> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                    {/* modal member */}
                    <Modal show={this.state.isModalOpen} onHide={this.handleClose}
                      size="xl"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered>
                    <Modal.Header closeButton className="">
                        <Modal.Title>form admin</Modal.Title>
                    </Modal.Header>
                    <Form className="bg-dark bg-opocity-10" onSubmit={e => this.handleSave(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="nama">
                                <Form.Label className="text-white" >Nama</Form.Label>
                                <Form.Control className="text-warning bg-dark" type="text" name="nama" placeholder="Masukkan Nama" value={this.state.nama}
                                    onChange={e => this.setState({ nama: e.target.value })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="alamat">
                                <Form.Label className="text-white" >Alamat</Form.Label>
                                <Form.Control className="text-warning bg-dark" type="text" name="alamat" placeholder="Masukkan alamat" value={this.state.alamat}
                                    onChange={e => this.setState({ alamat: e.target.value })}
                                    required
                                />                                
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="jenisKelamin">
                                <Form.Label className="text-white">Jenis Kelamin</Form.Label>
                                    <div className="form-check text-light">
                                        <input className="form-check-input" type="radio" name="exampleRadios" value={"Laki-laki"} onChange={e => this.setState({ gender: e.target.value })}/>
                                        <label className="form-check-label" for="exampleRadios1">
                                            Laki-laki
                                        </label>
                                    </div>
                                    <div className="form-check text-light">
                                        <input className="form-check-input" type="radio" name="exampleRadios" value={"Perempuan"} onChange={e => this.setState({ gender: e.target.value })}/>
                                        <label className="form-check-label" for="exampleRadios2">
                                            Perempuan
                                        </label>
                                    </div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="telepon">
                                <Form.Label className="text-white" >Telepon</Form.Label>
                                <Form.Control className="text-warning bg-dark" type="text" name="phone" placeholder="Masukkan Telepon" value={this.state.phone}
                                    onChange={e => this.setState({ phone: e.target.value })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label className="text-white">Username</Form.Label>
                                <Form.Control className="text-warning bg-dark" type="text" name="username" placeholder="Masukkan Username" value={this.state.username}
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
                                    <Form.Label className="text-white">Password</Form.Label>
                                    <Form.Control className="text-warning bg-dark" type="password" name="password" placeholder="Masukkan Password"
                                        onChange={e => this.setState({ password: e.target.value })}
                                    />
                                </Form.Group>
                            )}
                        </Modal.Body>
                        <Modal.Footer>

                            <Button className="btn btn-dark m-1 text-danger" style={{backgroundColor:"black"}} onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button className="btn btn-dark m-1 text-success" type="submit" style={{backgroundColor:"black"}} onClick={this.handleClose}>
                                Save
                            </Button>

                        </Modal.Footer>
                    </Form>
                </Modal>
                </div>
            </div>
        )
    }
}
