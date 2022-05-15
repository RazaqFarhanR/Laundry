const models = require("../../models/index");
const user = models.user;
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../auth/secret.json');

module.exports = {
    controllerGetAll:(req,res) =>{
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
    },
    controllerGetAdmin:(req,res)=>{
        user.findAll({
            where : {role : "admin"}
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
    },
    controllerGetKasir:(req,res)=>{
        let result = user.findAll({
            include: [
                "outlet"
            ],  
            where : {role : "kasir"}
        })
        .then(result => {
            res.json({
                count: result.length,
                user: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    controllerGetCustomer:(req,res)=>{
        user.findAll({
            where : {role : "customer"}
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
    },
    controllerAdd:(req,res)=>{
        let data = {
            nama: req.body.nama,
            alamat : req.body.alamat,
            gender : req.body.gender,
            phone: req.body.phone,
            username: req.body.username,
            password: md5(req.body.password),
            role: req.body.role,
            id_outlet: req.body.id_outlet
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
    },
    controllerEdit:(req,res)=>{
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
        if(req.body.id_outlet){
            data.id_outlet = req.body.id_outlet
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
    },
    controllerDelete: (req,res)=>{
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
    },
    controllerAuth: async (req,res) =>{
        let data= {
            username: req.body.username,
            password: md5(req.body.password)
        }
    
        //cari data user yang username dan password sama dengan input
        let result = await user.findOne({where: data})
        if(result){
            //ditemukan
            // generate token based on payload and secret_key
            let token = jwt.sign({ sub: result.id, role: result.role }, config.secret)
    
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
    }
}
