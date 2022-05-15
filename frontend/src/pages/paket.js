import React from "react"
import axios from "axios";
import {Modal, Button, Form} from "react-bootstrap"
import Navbar from "../components/navbar";
import PaketList from "../components/paketList";

export default class Paket extends React.Component{
    constructor(){
        super()
        this.state = {
            paket: [],
            id_paket: "",
            jenis: "",
            harga: "",
            image: null,
            uploadFile: true,
            isModalOpen: false,
            token: ""
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
            jenis: "",
            harga: "",
            image: null,
            uploadFile: true,
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
            image: null,
            uploadFile: false,
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
    handleFile = (e) =>{
        this.setState({
            image: e.target.files[0]
        })
    }
    handleSave = (e) =>{
        e.preventDefault()
        let form = new FormData() 
        form.append("nama",this.nama)
        form.append("harga",this.state.harga)
        form.append("image". this.state.image)

        let url = ""

        if (this.state.action === "insert") {
            url = "http://localhost:1305/paket"

            axios.post(url, form)
            .then(res =>{
                this.getPaket()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }else if (this.state.action === "update"){
            url = "http://localhost:1305/paket/" + this.state.id_paket

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
    handleDelete = (id_paket) =>{
        let url = "http://localhost:1305/paket/" + id_paket

        if (window.confirm('Anda yakin ingin menghapus data ini?')){
            axios.delete(url, this.headerConfig())
            .then(res =>{
                console.log(res.data.message)
                this.getPaket()
            })
            .catch(err =>{
                console.log(err.message)
            })
        }
    }
    getPaket = () =>{
        let url = "http://localhost:1305/paket"
        axios.get(url, this.headerConfig())
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
            <div>
                <Navbar/>
                <div className="card m-3">
                    <div className="card-header" style={{backgroundColor: "rgb(211, 0, 0)", border: "none"}}>
                        <h2 className="text-light">Paket</h2>
                    </div>
                    <button className="col-2 btn ms-3 my-2" onClick={() => this.handleAdd()} style={{backgroundColor: "black", color: "rgb(0, 222, 222)"}}>
                        Tambah Paket
                    </button>
                    <div className='ms-2 my-3'>
                        {this.state.paket.map(item => (
                            <PaketList
                            key = {item.id_paket}
                            nameimage={item.image}
                                image={"http://localhost:1305/image/paket/" + item.image}
                                nama={item.nama}
                                harga={item.harga.toLocaleString('de-DE')}
                                onEdit={() => {this.handleEdit(item)}}
                                onDrop={() => {this.handleDelete(item.id_paket)}}
                            />
                        ))}
                    </div>

                {/* modal paket */}
                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>form paket</Modal.Title>
                    </Modal.Header>
                    <Form className="bg-opocity-10" onSubmit={e => this.handleSave(e)}>
                        <Modal.Body>
                        <Form.Group className="mb-3" controlId="jenis">
                            <Form.Label className="" >Jenis</Form.Label>
                            <Form.Control className="" type="text" name="jenis" placeholder="Masukkan Jenis" value={this.state.jenis}
                                onChange={e => this.setState({ jenis: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="harga">
                                <Form.Label className="" >Harga</Form.Label>
                                <Form.Control className="" type="text" name="harga" placeholder="Masukkan Harga" value={this.state.harga}
                                    onChange={e => this.setState({ harga: e.target.value })}
                                    required
                                />
                        </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="btn btn-danger m-1" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button className="btn btn-success m-1" type="submit" onClick={this.handleClose}>
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
