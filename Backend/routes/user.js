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

//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan"

//endpoint GET data user
app.get("/", auth, (req,res) =>{
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

//endpoint GET data user where role: kasir
app.get("/kasir", auth, (req,res) =>{
    user.findAll({
        where : {role : "kasir"}
    })
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
app.post("/", auth, (req,res) => {
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
app.put("/:id", auth, (req,res)=>{
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
app.delete("/:id", auth, (req,res) =>{
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

//endpoint login user (authorization), METHOD: POST, function: findOne
app.post("/auth", async (req,res) => {
    let data= {
        username: req.body.username,
        password: md5(req.body.password)
    }

    //cari data user yang username dan password sama dengan input
    let result = await user.findOne({where: data})
    if(result){
        //ditemukan
        //set payload from data
        let payload = JSON.stringify({
            id_user: result.id_user,
            nama: result.nama,
            username: result.username
        })

        // generate token based on payload and secret_key
        let token = jwt.sign(payload, SECRET_KEY)

        //set output
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }
    else{
        //tidak ditemukan
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

module.exports = app;