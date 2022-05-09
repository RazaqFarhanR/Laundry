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
const member = models.member

//endpoint get data member
app.get("/", (req,res) =>{
    member.findAll()
    .then(member =>{
        res.json({
            count: member.length,
            member: member
        })
    })
    .catch(error =>{
        res.json({
            message: error.message
        })
    })
})

//endpoint menyimpan data member, METHOD POST, FUNCTION create
app.post("/", (req,res)=>{
    let data ={
        nama: req.body.nama,
        alamat: req.body.alamat,
        jenis_kelamin: req.body.jenis_kelamin,
        tlp: req.body.tlp
    }
    member.create(data)
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

//endpoint update Member, METHOD:PUT, FUNCTION: UPDATE
app.put("/:id", (req,res) =>{
    let param = {
        id_member : req.params.id
    }
    let data = {
        nama: req.body.nama,
        alamat: req.body.alamat,
        jenis_kelamin: req.body.jenis_kelamin,
        tlp: req.body.tlp
    }
    member.update(data, {where: param})
    .then(result =>{
        res.json({
            message: "data has been update"
        })
    })
    .catch(error =>{
        res.json({
            message : error.message
        })
    })
})

//endpoint untuk menghapus data member, METHOD: DELETE, FUNCTION: DESTROY
app.delete("/:id", (req,res)=> {
    let param = {
        id_member : req.params.id
    }
    member.destroy({where: param})
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