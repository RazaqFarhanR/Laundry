const express = require("express") // engine endpoint
const app = express() // implementasi
app.use(express.json()); // read body

// import multer
const multer = require("multer");
const path = require("path");
const fs = require("fs"); 
//fs = file system

// import model
const models = require("../../models/index");
const paket = models.paket

//import auth
const auth = require("../../auth")
app.use(auth)

//config storage image (menyiapkan tempat menyimpan foto)
const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null, "./image/paket")
    },
    filename:(req,file,cb) =>{
        cb(null, "img" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage: storage})

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
app.post("/", upload.single("image"), (req,res) =>{
    if (!req.file) {
        res.json({
            message : "no uploaded file"
        })
    }else {
        let data ={
            nama: req.body.nama,
            harga: req.body.harga,
            image: req.file.filename
        }
        paket.create(data)
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
    }
})

//endpoint update Paket, METHOD:PUT, FUNCTION: Update
app.put("/:id", upload.single("image"), (req,res) =>{
    let param = {
        id_paket : req.params.id
    }
    let data = {
        nama : req.body.nama,
        harga : req.body.harga
    }
    if (req.file) {
        //get data by id
        const row = paket.findOne({where: param})
        .then(result=>{
            let oldFileName = result.image

            //delete old file
            let dir = path.join(__dirname,"../../image/paket", oldFileName)
            fs.unlink(dir, err => console.log(err))
        })
        .catch(error => {
            console.log(error.message);
        })

        //set new filename
        data.image = req.file.filename
    }

    paket.update(data, {where: param})
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

//endpoint untuk menghapus data paket, METHOD: DELETE, FUNCTION: DESTROY
app.delete("/:id", async (req,res)=> {
    try {
        let param = {
            id_paket : req.params.id
        }
        let result = await paket.findOne({where: param})
        let oldFileName = result.image

        //delete old file
        let dir = path.join(__dirname,"../../image/paket", oldFileName)
        fs.unlink(dir, err => console.log(err))

        //delete data
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
    } catch (error) {
        res.json({
            message: error.messages
        })
    }
})

module.exports = app;

