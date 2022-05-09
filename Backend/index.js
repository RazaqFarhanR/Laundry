//import
const express = require('express')
const cors = require('cors')
const app = express()

//implementasi
app.use(cors())
app.use(express.static(__dirname))

//endpoint member
const member = require('./routes/member');
app.use("/member", member)

//endpoint user
const user = require('./routes/user');
app.use("/user", user)

//endpoint paket
const paket = require('./routes/paket');
app.use("/paket", paket)

//run server
app.listen(2004, () => {
    console.log("server run on port 2004")
})