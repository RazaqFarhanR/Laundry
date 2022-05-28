//import
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//implementasi
app.use(cors())
app.use(express.static(__dirname))

const outlet = require('./api/outlet/outlet');
app.use("/outlet", outlet);

const userRouter = require('./api/user/user.routes');
app.use("/api/user", userRouter);

//endpoint user
const user = require('./routes/user');
app.use("/user", user)

//endpoint paket
const paket = require('./api/paket/paket');
app.use("/paket", paket)

//endpoint transaksi
const transaksi = require('./routes/transaksi');
app.use("/transaksi", transaksi)

//run server
app.listen(1305, () => {
    console.log("server run on port 1305")
})