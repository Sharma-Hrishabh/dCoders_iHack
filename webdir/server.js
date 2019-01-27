const express = require('express')
const path = require('path')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// connect to mysql db
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'ujjwal',
  password : 'root',
  database : 'newdb'
});

connection.connect()

connection.query('SELECT * from tb;', function (err, rows, fields) {
  if (err) throw err

  console.log('The return is: ', rows[0].id, rows[0].name)
})

connection.end()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// // create application/json parser
// var jsonParser = bodyParser.json()
// 
// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

// the static directories
app.use(express.static(path.join(__dirname+'/static/js/')))
app.use(express.static(path.join(__dirname+'/templates/')))
app.use(express.static(path.join(__dirname+'/static/css')))
app.use(express.static(path.join(__dirname+'/static')))

// the root page content
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/templates/index.html'))
})

app.all('/home', function (req, res) {
    if (req.method == "GET")
        res.sendFile(path.join(__dirname+'/templates/index.html'))
    else res.send(req.method+" request not supported.")
})

app.all('/timer', function (req, res) {
    if (req.method == "GET")
        res.sendFile(path.join(__dirname+'/templates/timer.html'))
    else res.send(req.method+" request not supported.")
})

app.all('/ide', function (req, res) {
    if (req.method == "GET")
        res.sendFile(path.join(__dirname+'/templates/ide.html'))
    else res.send(req.method+" request not supported.")
})

app.post('/userreg', function (req, res) {
    // console.log(req.body.account)
    if (req.body.account == null)
        res.send({"Error": "Account not provided"});
    else {
        res.send({status: true})
    }
    // return res.send(req.body)
})

app.listen(port, () => console.log(__dirname+`\nExample app listening on port ${port}!`))
