import React from 'react'

export default class PaketList extends React.Component {

    render() {
        return(
            <div className="card mb-3 " style={{maxWidth: "540px", backgroundColor: "black"}}>
                <div class="row g-0">
                    <div class="col-md-4">
                        <img className='img-fluid rounded-start py-2 px-1' src={this.props.image} alt={this.props.name}/> 
                    </div>
                    <div class="col-md-8">
                        <div className="card-body text-light">
                            <div className='row-sm-2 mt-3 ms-2'>
                                <h6 className="text-bold text-card">Paket : {this.props.nama}</h6>
                                <h6 className='text-card'>Harga : Rp. {this.props.harga}</h6>                 
                            </div>
                        </div>
                        <div className='card-footer'>
                        <button className="btn btn-dark m-1 text-success" onClick={this.props.onEdit}>Edit</button>
                        <button className="btn btn-dark m-1 text-danger" onClick={this.props.onDrop}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}