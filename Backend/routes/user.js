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

//import operator sequelize
const { Op } = require("sequelize");

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

//endpoint GET data user where keyword
app.post("/cari", auth, (req,res) =>{
    let keyword = req.body.keyword
    user.findAll({
        where : {
            [Op.or]:{
                nama : { [Op.like] : '%' + keyword + '%' }
            }
        }
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

//endpoint GET data user where role: pelanggan
app.get("/pelanggan", auth, (req,res) =>{
    user.findAll({
        where : {role : "pelanggan"}
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

//endpoint GET data user where role: admin & kasir
app.get("/pegawai", auth, (req,res) =>{
    user.findAll({
        where : {
            [Op.or] : {
                role : "admin"
            },
            // [Op.or]:{
            //     role : "kasir"
            // }
        }
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
app.post("/", (req,res) => {
    let data = {
        nama: req.body.nama,
        alamat : req.body.alamat,
        gender : req.body.gender,
        phone: req.body.phone,
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
        alamat : req.body.alamat,
        gender : req.body.gender,
        phone: req.body.phone,
        username: req.body.username,
    }
    if(req.body.password){
        data.password = md5(req.body.password)
    }
    if(req.body.role){
        data.role = req.body.role
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