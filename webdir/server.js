const express = require('express')
const path = require('path')
const mysql = require('mysql')
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
// the static directories
app.use(express.static(path.join(__dirname+'/static/js/')))
app.use(express.static(path.join(__dirname+'/templates/')))
app.use(express.static(path.join(__dirname+'/static/css')))
app.use(express.static(path.join(__dirname+'/static')))

// the root page content
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/templates/index.html'))
})

app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname+'/templates/index.html'))
})

app.get('/timer', function (req, res) {
    res.sendFile(path.join(__dirname+'/templates/timer.html'))
})

app.get('/ide', function (req, res) {
    res.sendFile(path.join(__dirname+'/templates/ide.html'))
})

app.listen(port, () => console.log(__dirname+`\nExample app listening on port ${port}!`))
