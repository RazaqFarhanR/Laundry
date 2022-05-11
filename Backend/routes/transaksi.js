const express = require("express")
const app = express()
app.use(express.json())

//import model
const models = require("../models/index")
const transaksi = models.transaksi
const detail_transaksi = models.detail_transaksi

//import auth
const auth = require("../auth")
app.use(auth) // harus login untuk bisa akses endpoint

//endpoint GET all data Transaksi
app.get("/", (req,res) =>{
    let result = transaksi.findAll({
        include : [
            "member",
            "user",
            {
                model: models.detail_transaksi,
                as : "detail_transaksi",
                include: ["paket"]
            }
        ]
    })
    .then(result =>{
        res.json({
            count: result.length,
            transaksi: result
        })
    })
    .catch(error =>{
        res.json({
            message: error.message
        })
    })
})

//endpoint GET data Transaksi where status
app.post("/status", (req,res) =>{
    let keyword = req.body.keyword
    let result = transaksi.findAll({
        where: {status : keyword},
        include : [
            "member",
            "user",
            {
                model: models.detail_transaksi,
                as : "detail_transaksi",
                include: ["paket"]
            }
        ]
    })
    .then(result =>{
        res.json({
            count: result.length,
            transaksi: result
        })
    })
    .catch(error =>{
        res.json({
            message: error.message
        })
    })
})

//endpoint menyimpan transaksi METHOD: POST, FUNCTION: CREATE
app.post("/", async (req,res) =>{
    let current = new Date().toISOString().split('T')[0]
    let data = {
        id_member: req.body.id_member,
        tgl: current,
        batas_waktu: req.body.batas_waktu,
        tgl_bayar: req.body.tgl_bayar,
        status: req.body.status,
        dibayar: req.body.dibayar,
        id_user: req.body.id_user
    }
    transaksi.create(data)
    .then(result =>{
        let lastID = result.id_transaksi
        console.log(lastID);
        detail = req.body.detail_transaksi
        console.log(detail);
        detail.forEach(element => {
            element.id_transaksi = lastID
        });
        detail_transaksi.bulkCreate(detail)
        .then(result => {
            res.json({
                message: "Data has been inserted"
            })  
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    })
    .catch(error => {
        console.log(error.message);
    })
})

//endpoint UPDATE transaksi, METHOD:PUT, FUNCTION: UPDATE
app.put("/:id_transaksi", (req,res) =>{
    let param = {
        id_transaksi : req.params.id_transaksi
    }
    let data = {
        id_member: req.body.id_member,
        batas_waktu: req.body.batas_waktu,
        tgl_bayar: req.body.tgl_bayar,
        status: req.body.status,
        dibayar: req.body.dibayar,
        id_user: req.body.id_user
    }
    transaksi.update(data, {where: param})
    .then(result =>[
        res.json({
            message: "data has been updated"
        })
    ])
    .catch(error =>{
        res.json({
            message: error.message
        })
    })
})

//endpoint Delete transaksi, METHOD: DELETE, FUNCTION: DESTROY
app.delete("/:id_transaksi", async (req, res) =>{
    let param = { id_transaksi: req.params.id_transaksi}
    try {
        await detail_transaksi.destroy({where: param})
        await transaksi.destroy({where: param})
        res.json({
            message : "data has been deleted"
        })
    } catch(error) {
        res.json({
            message: error.message
        })
    }
})

module.exports = app