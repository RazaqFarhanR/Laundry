import React from "react"
import axios from "axios"
import {Modal, Button, Form} from "react-bootstrap"

export default class Member extends React.Component{
    constructor(){
        super()
        this.state = {
            member: [],
            id_member: "",
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: "",
            isModalOpen: false,
            token: "",
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
            jenis_kelamin: "",
            tlp: "",
            isModalOpen: true,
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
    getMember = () =>{
        let url = "http://localhost:2004/member"
        
        axios.get(url, this.headerConfig())
        .then(res =>{
            this.setState({
                member: res.data.member
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
    componentDidMount = () => {
        this.getMember()
    }
    render(){
        return(
            <div className="container-fluid">
                <div className="alert alert-dark mb-4">
                    <h2>Member</h2>
                </div>
                <button className="col-2 btn btn-light my-1 mb-3 text-primary" onClick={() => this.handleAdd()}>
                    Tambah Member
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
                        {this.state.member.map((item, index) =>(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.nama}</td>
                                <td>{item.alamat}</td>
                                <td>{item.jenis_kelamin}</td>
                                <td>{item.tlp}</td>
                                <td>
                                    <button className="btn btn-light m-1 text-success" onClick={() => this.handleEdit(item)}>Edit</button> 
                                    <button className="btn btn-light m-1 text-danger" onClick={() => this.handleDelete(item)}>Delete</button> 
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
                        <Modal.Title>form member</Modal.Title>
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
                                <Form.Control className="text-warning bg-dark" type="text" name="jenis_kelamin" placeholder="Masukkan jenis kelamin" value={this.state.alamat}
                                    onChange={e => this.setState({ alamat: e.target.value })}
                                    required
                                />                                
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="telepon">
                                <Form.Label className="text-white" >Telepon</Form.Label>
                                <Form.Control className="text-warning bg-dark" type="text" name="Telepon" placeholder="Masukkan Telepon" value={this.state.alamat}
                                    onChange={e => this.setState({ alamat: e.target.value })}
                                    required
                                />                                
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label className="text-white">Username</Form.Label>
                                <Form.Control className="text-warning bg-dark" type="text" name="username" placeholder="Masukkan  Username" value={this.state.username}
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
        )
    }
}
