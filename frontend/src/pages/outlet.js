import React from "react";
import { Modal } from "bootstrap";
import axios from "axios";
// import { baseUrl, authorization } from "../config.js";

class Outlet extends React.Component {
    getData() {
        let url = "http://localhost:1305/outlet"
        axios.get(url)
        .then(res =>{
            this.setState({
                outlet : res.data.outlet
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
    componentDidMount = () =>{
        this.getData()
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <div className="card-header bg-secondary">
                            <h4 className="text-white">
                                List of outlet
                            </h4>
                        </div>
                    </div>
                    <div className="card-body">
                        <ul className="list-group">
                            {this.state.outlet.map(outlet => (
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <small className="text-info">Nama Outlet</small> <br />
                                            <h5>{outlet.nama}</h5>
                                        </div>
                                        <div className="col-lg-5">
                                            <small className="text-info">Alamat Outlet <br /></small>
                                            <h5>{outlet.alamat}</h5>
                                        </div>
                                        <div className="col-lg-2">
                                            <small className={`text-info ${this.state.visible ? `` : `d-none`}`}>Action <br /></small>
                                            <button className={`btn btn-warning btn-sm mx-1 ${this.state.visible ? `` : `d-none`}`}
                                                onClick={() => this.ubahData(outlet.id_outlet)}>
                                                Edit
                                            </button>

                                            <button className={`btn btn-danger btn-sm ${this.state.visible ? `` : `d-none`}`}
                                                onClick={() => this.hapusData(outlet.id_outlet)}>
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button className={`btn btn-outline-success my-2 ${this.state.visible ? `` : `d-none`}`}
                            onClick={() => this.tambahData()}>
                            Tambah Data
                        </button>
                    </div>
                    <div className="modal" id="modal_outlet">
                        <div className="modal-dialog modal-md">
                            <div className="modal-content">
                                <div className="modal-header bg-secondary">
                                    <h4 className="text-title">
                                        Form Data outlet
                                    </h4>
                                </div>

                                <div className="modal-body">
                                    <form onSubmit={ev => this.simpanData(ev)}>
                                        Nama Outlet
                                        <input type="text" className="form-control mb-2"
                                            value={this.state.nama_outlet}
                                            onChange={(ev) => this.setState({ nama_outlet: ev.target.value })} />


                                        Alamat Outlet
                                        <input type="text" className="form-control mb-2"
                                            value={this.state.alamat}
                                            onChange={(ev) => this.setState({ alamat: ev.target.value })} />


                                        <button className="btn btn-success" type="submit">Simpan</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Outlet