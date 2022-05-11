import React from "react"
import axios from "axios";
import {Modal, Button, Form, ModalBody} from "react-bootstrap"

export default class Paket extends React.Component{
    constructor(){
        super()
        this.state = {
            paket: [],
            id_paket: "",
            jenis: "",
            harga: "",
            isModalOpen: false,
        }
    }
    handleAdd = () =>{
        this.setState({
            jenis: "",
            harga: "",
            action: "insert",
            isModalOpen: true
        })
    }
    handleEdit = (selectedItem) =>{
        this.setState({
            isModalOpen: true,
            id_paket: selectedItem.id_paket,
            jenis: selectedItem.jenis,
            harga: selectedItem.harga,
            action: "update"
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
    handleSave = (e) =>{
        e.preventDefault()
        let form = {
            id_paket: this.state.id_paket,
            jenis: this.state.jenis,
            harga: this.state.harga
        }
        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:2004/paket"

            axios.post(url, form)
            .then(res =>{
                this.getPaket()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }else if (this.state.action === "update"){
            url = "http://localhost:2004/paket/" + this.state.id_paket

            axios.put(url, form)
            .then(res =>{
                this.getPaket()
                this.handleChange()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }
    getPaket = () =>{
        let url = "http://localhost:2004/paket"
        axios.get(url)
        .then(res =>{
            this.setState({
                paket: res.data.paket
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
    componentDidMount = () => {
        this.getPaket()
    }
    render(){
        return(
            <div className="container">
                <div className="alert alert-success">
                    <h2>paket</h2>
                </div>
                <button onClick={() => this.handleAdd()}>
                    Tambah Paket
                </button>
                <table className="table">
                    <thead>
                        <tr className="">
                            <th>#</th>
                            <th>Jenis</th>
                            <th>Harga</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.paket.map((item, index) =>(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.jenis}</td>
                                <td>{item.harga}</td>
                                <td>
                                    <button className="btn btn-light m-1 text-success" onClick={() => this.handleEdit(item)}>Edit</button> 
                                    <button className="btn btn-light m-1 text-danger" onClick={() => this.handleDelete(item.id_paket)}>Delete</button> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* modal paket */}
                <Modal show={this.state.isModalOpen} onHide={this.handelClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>form paket</Modal.Title>
                    </Modal.Header>
                    <Form className="bg-dark bg-opocity-10" onSubmit={e => this.handleSave(e)}>
                        <Modal.Body>
                        <Form.Group className="mb-3" controlId="jenis">
                            <Form.Label className="text-white" >Jenis</Form.Label>
                            <Form.Control className="text-warning bg-dark" type="text" name="jenis" placeholder="Masukkan Jenis" value={this.state.jenis}
                                onChange={e => this.setState({ jenis: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="harga">
                                <Form.Label className="text-white" >Harga</Form.Label>
                                <Form.Control className="text-warning bg-dark" type="text" name="harga" placeholder="Masukkan Harga" value={this.state.harga}
                                    onChange={e => this.setState({ harga: e.target.value })}
                                    required
                                />
                        </Form.Group>
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
