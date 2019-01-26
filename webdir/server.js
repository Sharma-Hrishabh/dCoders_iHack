const express = require('express')
const path = require('path')
const app = express()
const port = 3000

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
