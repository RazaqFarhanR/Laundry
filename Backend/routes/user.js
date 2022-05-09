//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require('../models/index');
const user = models.user;

//endpoint GET data user
app.get("/", (req,res) =>{
    user.findAll()
    .then(user => {
        res.json({
            count: user.length,
            user: user
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint save data admin
app.post("/", (req,res) => {
    let data = {
        nama: req.body.nama,
        username: req.body.username,
        password: md5(req.body.password),
        role: req.body.role
    }
    user.create(data)
    .then(result => {
        res.json({
            message: "data has been inserted"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint update
app.put("/:id", (req,res)=>{
    let param = {
        id_user : req.params.id
    }
    let data = {
        nama: req.body.nama,
        username: req.body.username,
        role: req.body.role
    }
    if(req.body.password){
        data.password = md5(req.body.password)
    }
    user.update(data, {where: param})
    .then(result => {
        res.json({
            message : "data has been updated"
        })
    })
    .catch(error =>{
        res.json({
            message: error.message
        })
    })
})

//endpoint DELETE
app.delete("/:id", (req,res) =>{
    let param = {
        id_user : req.params.id
    }
    user.destroy({where: param})
    .then(result => {
        res.json({
            message: "data has been deleted"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
}) 

module.exports = app;