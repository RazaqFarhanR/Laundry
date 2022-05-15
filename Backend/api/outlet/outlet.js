//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require('../../models/index');
const outlet = models.outlet

//endpoint menampilkan data outlet METHOD: GET, FUNCTION: findAll
app.get("/", (req,res) =>{
    outlet.findAll()
    .then(outlet =>{
        res.json({
            count: outlet.length,
            outlet : outlet
        })
    })
    .catch(error =>{
        res.json({
            message: error.message
        })
    })
})

//endpoint menyimpan data outlet METHOD: POST, FUNCTION: create
app.post("/", (req,res) =>{
    let data = {
        nama_outlet: req.body.nama_outlet,
        alamat: req.body.alamat,
        tlp: req.body.tlp
    }
    outlet.create(data)
    .then(result =>{
        res.json({
            message: "1 data has been inserted",
            data: result,data
        })
    })
    .catch(error =>{
        res.json({
            message: error.message
        })
    })
})

//endpoint update data outlet METHOD: PUT, FUNCTION: update
app.use("/:id", (req,res) =>{
    let param = {
        id_outlet : req.params.id
    }
    let data = {
        id_outlet : req.params.id,
        nama_outlet: req.body.nama_outlet,
        alamat: req.body.alamat,
        tlp: req.body.tlp
    }
    outlet.update(data, {where: param})
    .then(result =>{
        res.json({
            message: "1 data has been updated",
            data: result,data
        })
    })
    .catch(error =>{
        res.json({
            message: error.message
        })
    })
})
//endpoint delete data outlet METHOD: DELETE, FUNCTION: DESTROY
app.use("/:id", (req,res) =>{
    let param = {
        id_outlet : req.params.id
    }
    outlet.destroy({where: param})
    .then(result => {
        res.json({
            message: "1 data hass been deleted"
        })
    })
    .catch(error =>{
        res.json({
            message: error.message
        })
    })
})
module.exports = app;