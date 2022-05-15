import React from 'react'

export default class PaketList extends React.Component {

    render() {
        return(
            <div className="card m-2" style={{width: "12rem", backgroundColor:"black"}}>
                <img className='card-img-top' src={this.props.image} alt={this.props.name}/> 
                <div className="card-body text-light">
                    <div className='row-sm-2'>
                        <h6 className="text-bold text-card">{this.props.nama}</h6>
                        <h6 className='text-card'>Harga : Rp. {this.props.harga}</h6>                 
                    </div>
                        <button className="btn btn-dark m-1 text-success" onClick={this.props.onEdit}>Edit</button>
                        <button className="btn btn-dark m-1 text-danger" onClick={this.props.onDrop}>Delete</button>
                </div>
            </div>
        )
    }
}