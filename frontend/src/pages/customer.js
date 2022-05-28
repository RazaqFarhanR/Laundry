import React from "react"
import axios from "axios"
import {Modal, Button, Form} from "react-bootstrap"
import Navbar from "../components/navbar"

export default class Customer extends React.Component{
    constructor(){
        super()
        this.state = {
            customer: [],
            id_user: "",
            nama: "",
            alamat: "",
            gender: "",
            phone: "",
            username: "",
            password: "",
            cart: localStorage.getItem("cart"),
            modalCustomer: false,
            modalTransaksi: false,
            fillPassword: true,
            token: "",
            action: ""
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
            role: "customer",
            action: "insert",
            modalCustomer: true,
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
            role: "customer",
            fillPassword: false,
            action: "update",
            modalCustomer: true
        })
    }
    handleClose = () =>{
        this.setState({
            modalCustomer: false,
            modalTransaksi: false
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
        let url = ""

        if (this.state.action === "insert"){
            
            url = "http://localhost:1305/api/user"

            axios.post(url, form, this.headerConfig())
            .then(res =>{
                this.getCustomer()
                this.handleClose()

                window.alert("Data berhasil ditambah");
            })
            .catch(err => {
                console.log(err.message)
                window.alert("Data gagal ditambah");
            })
        }else if (this.state.action === "update"){
            url = "http://localhost:1305/api/user/" + this.state.id_user

            axios.put(url, form, this.headerConfig())
            .then(res =>{
                this.getCustomer()
                this.handleClose()

                window.alert("Data berhasil diubah");
            })
            .catch(err => {
                console.log(err.message)
                window.alert("Data gagal diubah");
            })
        }
    }
    handleDelete = (id_user) =>{
        let url = "http://localhost:1305/api/user/" + id_user

        if (window.confirm('Anda yakin ingin menghapus data ini?')){
            axios.delete(url, this.headerConfig())
            .then(res =>{
                console.log(res.data.message)
                this.getCustomer()
            })
            .catch(err =>{
                console.log(err.message)
            })
        }
    }
    handleSearch = (e) =>{
        let url = "http://localhost:1305/api/user/cari"
        this.setState({
            [e.target.name]: e.target.value
        })
            // console.log("search")
            let data ={
                keyword: this.state.keyword,
                role: "customer"
            }
            axios.post(url, data, this.headerConfig())
            .then(res =>{
                this.setState({
                    customer : res.data.user
                })
            })
            .catch(err =>{
                console.log(err.message)
            })
    }
    addTransaksi = (selectedItem) =>{
        this.setState({
            //modalTransaksi: true
        })
        let data_customer = selectedItem

        localStorage.setItem('customer', JSON.stringify(data_customer))
        window.location = "/keranjang"

    }
    getCustomer = () =>{
        let url = "http://localhost:1305/api/user/by"
        let data ={
            role : "customer"
        }
        axios.post(url, data, this.headerConfig())
        .then(res =>{
            this.setState({
                customer: res.data.user
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
    componentDidMount = () => {
        this.getCustomer()
    }
    render(){
        return(
            <div>
                <Navbar/>
            <div className="card m-3">
                <div className="card-header" style={{backgroundColor: "#a6051a", border: "none"}}>
                    <h2 className="text-light">Customer</h2>
                </div>
                <div className="mx-3">
                <input type="text" name="keyword" className="form-control mt-3" placeholder="Cari nama "
                    value={this.state.keyword} onChange={this.handleChange} onKeyUp={e => this.handleSearch(e)}/>
                </div>
                <button className="col-2 btn ms-3 my-2 mt-3" onClick={() => this.handleAdd()} style={{backgroundColor: "black", color: "rgb(0, 222, 222)"}}>
                    Tambah Customer
                </button>
                <div className="mx-3">
                    <table className="table text-left border-dark me-2">
                        <thead>
                            <tr className="">
                                <th scope="col" width="4%">No</th>
                                <th scope="col" width="20%">Nama</th>
                                <th scope="col" width="17%">Alamat</th>
                                <th scope="col" width="17%">Jenis Kelamin</th>
                                <th scope="col" width="17%">Telp</th>
                                <th scope="col" width="10%" className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.customer.map((item, index) =>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.alamat}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.phone}</td>
                                    <td className="text-center">
                                        {(() =>{
                                            if (this.state.cart === null || this.state.cart.length === 0) {
                                                return(
                                                <div>
                                                    <button className="btn btn-light btn-sm mx-1 text-success" onClick={() => this.handleEdit(item)}>Edit</button> 
                                                    <button className="btn btn-light btn-sm mx-1 text-danger" onClick={() => this.handleDelete(item.id_user)}>Delete</button> 
                                                </div>
                                                )
                                            }
                                            else{
                                                return(
                                                <div>
                                                    <button className="btn btn-light m-1 text-success" onClick={() => this.addTransaksi(item)}>Pilih</button>  
                                                </div>
                                                )
                                            }
                                        })()}
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* modal customer */}
                <Modal show={this.state.modalCustomer} onHide={this.handleClose}
                      size="xl"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered>
                    <Modal.Header closeButton>
                        <Modal.Title>form customer</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.handleSave(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="nama">
                                <Form.Label >Nama</Form.Label>
                                <Form.Control type="text" name="nama" placeholder="Masukkan Nama" value={this.state.nama}
                                    onChange={e => this.setState({ nama: e.target.value })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="alamat">
                                <Form.Label >Alamat</Form.Label>
                                <Form.Control type="text" name="alamat" placeholder="Masukkan alamat" value={this.state.alamat}
                                    onChange={e => this.setState({ alamat: e.target.value })}
                                    required
                                />                                
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="jenisKelamin">
                                <Form.Label>Jenis Kelamin</Form.Label>
                                    <select name="gender" value={this.state.gender} onChange={this.handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option selected>---Masukan Jenis Kelamin---</option>
                                        <option value={"Laki-laki"} onChange={e => this.handleChange({ gender: e.target.value })}>Laki-laki</option>
                                        <option value={"Perempuan"} onChange={e => this.handleChange({ gender: e.target.value })}>Perempuan</option>
                                    </select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="telepon">
                                <Form.Label >Telepon</Form.Label>
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
                                <Button className="btn btn-primary mb-1 btn-block"
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

                {/* modal transaksi */}
                <Modal show={this.state.modalTransaksi} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Form Transaksi</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.findCustomer(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="nama">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text" name="nama" placeholder="Masukkan Nama" value={this.state.nama_customer}
                                    onChange={e => this.setState({ nama_customer: e.target.value })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="nama">
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control type="text" name="alamat" placeholder="Masukkan Alamat" value={this.state.alamat}
                                    onChange={e => this.setState({ alamat: e.target.value })}
                                    required
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="btn btn-danger m-1" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button className="btn btn-success m-1" type="submit" onClick={this.handleClose}>
                                Next
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
            </div>
        )
    }
}
