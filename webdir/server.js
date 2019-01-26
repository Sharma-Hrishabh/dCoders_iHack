const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// const mysql = require('mysql');
// 
// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root"
// });
// 
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
// the static directories
app.set('views',path.join(__dirname,'views'))
app.set('view engine','mustache')
app.engine('mustache',require('hogan-middleware').__express)
app.use(express.static(path.join(__dirname,'public')))

// app.use(express.static(path.join(__dirname+'/static/js/')))
// app.use(express.static(path.join(__dirname+'/templates/')))
// app.use(express.static(path.join(__dirname+'/static/css')))
// app.use(express.static(path.join(__dirname+'/static')))

// the root page content
app.get('/', function (req, res) {
    // res.sendFile(path.join(__dirname+'/templates/index.html'))
    res.render('index',null)
})

app.get('/home', function (req, res) {
    res.render('index', null)
    // res.sendFile(path.join(__dirname+'/views/index.html'))
})

app.get('/timer', function (req, res) {
    res.sendFile(path.join(__dirname+'/views/timer.html'))
})

app.get('/ide', function (req, res) {
    res.sendFile(path.join(__dirname+'/views/ide.html'))
})

app.listen(port, () => console.log(__dirname+`\nExample app listening on port ${port}!`))
