import React from 'react'

export default class TransaksiList extends React.Component{
    getAmount = pakets =>{
        let total = 0
        pakets.map(it => {
            total += Number(it.harga) * Number(it.qty)
        })
        return total
    }
    ConvertTime = time => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }
    render(){
        return( 
            <div>
                {/* list */}
                <div className='card col-sm-12 my-1' style={{backgroundColor:"rgb(24, 19, 19)"}}>
                    <div className='card-body row'>
                        <div className='col-lg-2 col-sm-12'>
                            <small className='text-info'>Customer</small>
                            <h6 className='text-light'>{this.props.nama_customer}</h6>
                        </div>
                        <div className='col-lg-2 col-sm-12'>
                            <small className='text-info'>Alamat</small>
                            <h6 className='text-light'>{this.props.alamat_customer}</h6>
                        </div>
                        <div className='col-lg-2 col-sm-12'>
                            <small className='text-info'>Status</small>
                            <h6 className='text-light'>{this.props.status}</h6>
                        </div>
                        <div className='col-lg-2 col-sm-12'>
                            <small className='text-info'>Pembayaran</small>
                            <h6 className='text-light'>{this.props.pembayaran}</h6>
                        </div>
                        <div className='col-lg-2 col-sm-12'>
                            <small className='text-info'>Total Amount</small>
                            <h6 className='text-danger'>Rp {this.getAmount(this.props.pakets).toLocaleString('de-DE')}</h6>
                        </div>
                        <div className='col-lg-1 col-sm-12'>
                            <small className='text-bold text-info'>Tgl-masuk {this.ConvertTime(this.props.time)}</small>
                        </div>
                        <div className='col-lg-1 col-sm-12'>
                        <button type="button" class="btn btn-sm btn-danger m-2" data-bs-toggle="modal" data-bs-target={`#modalDetail${this.props.id_transaksi}`}>
                                Details
                        </button>
                        </div>
                    </div>
                </div>

                {/*modal component */}
                {/* <div className="modal fade" id="modalDetail"> */}
                <div className='modal fade' id={`modalDetail${this.props.id_transaksi}`}>
                    <div className='modal-dialog modal-lg'>
                        <div className='modal-content'>
                            <div className='modal-header bg-success text-white'>
                                <h5>Detail Transaksi</h5>
                            </div>
                            <div className='modal-body'>
                                <h5>Customer: {this.props.nama_customer}</h5>
                                <h6>Time:{this.ConvertTime(this.props.time)}</h6>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Paket</th>
                                            <th>Harga</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.pakets.map((item, index) => (
                                            <tr key={item.id_paket}>
                                                <td>{`${index + 1}`}</td>
                                                <td>{item.paket.nama}</td>
                                                <td>Rp {item.harga.toLocaleString('de-DE')}</td>
                                                <td>{item.qty}</td>
                                                <td className='text-right'>Rp {(item.harga * item.qty).toLocaleString('de-DE')}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan="4" className="text-danger text-bold"><h4>Total</h4></td>
                                            <td className='text-right text-danger text-bold'>
                                                <h4>Rp {this.getAmount(this.props.pakets).toLocaleString('de-DE')}</h4>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}