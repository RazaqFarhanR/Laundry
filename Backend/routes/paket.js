//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require('../models/index');
const paket = models.paket

//endpoint get data paket
app.get("/", (req,res) =>{
    paket.findAll()
    .then(paket =>{
        res.json({
            count: paket.length,
            paket: paket
        })
    })
    .catch(error =>{
        res.json({
            message: error.message
        })
    })
})

//endpoint menyimpan data paket
app.post("/", (req,res) =>{
    let data ={
        jenis: req.body.jenis,
        harga: req.body.harga
    }
    paket.create(data)
    .then(result =>{
        res.json({
            message: "data has been inserted"
        })
    })
    .catch(error =>{
        res.json({
            error_message: error.message
        })
    })
})

//endpoint update Paket, METHOD:PUT, FUNCTION: Update
app.put("/:id", (req,res) =>{
    let param = {
        id_paket : req.params.id
    }
    let data = {
        jenis : req.body.jenis,
        harga : req.body.harga
    }
    paket.update(data, {where: param})
    .then(result =>{
        res.json({
            message: "data has been updated"
        })
    })
    .catch(error =>{
        res.json({
            message: error.message
        })
    })
})

//endpoint untuk menghapus data paket, METHOD: DELETE, FUNCTION: DESTROY
app.delete("/:id", (req,res)=> {
    let param = {
        id_paket : req.params.id
    }
    paket.destroy({where: param})
    .then(result => {
        res.json({
            message : "data has been deleted"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

module.exports = app;

