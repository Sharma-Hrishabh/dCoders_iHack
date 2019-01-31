const express = require('express')
const path = require('path')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const helper = require('./scripts/mysql_helper.js')
const app = express()
const port = 3000

// set engine
app.set('view engine', 'mustache')
app.engine('mustache', require('hogan-middleware').__express)

// connect to mysql db

// connection.query('SELECT * from tb;', function (err, rows, fields) {
//   if (err) throw err
// 
//   console.log('The return is: ', rows[0].id, rows[0].name)
// })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// // create application/json parser
// var jsonParser = bodyParser.json()
// 
// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

// the static directories
app.use(express.static(path.join(__dirname + '/public/js/')))
app.use(express.static(path.join(__dirname + '/views/')))
app.use(express.static(path.join(__dirname + '/public/css')))
app.use(express.static(path.join(__dirname + '/public')))

// the root page content
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'))
})

app.all('/home', function(req, res) {
    if (req.method == "GET")
        res.sendFile(path.join(__dirname + '/views/index.html'))
    else res.send(req.method + " request not supported.")
})

var promise = new Promise((resolve, reject) => {
    var connection = helper.mysql.connect()
    connection.query("select time from events where time > (select now());", (err, rows, fields) => {
        connection.end
        if (!err) resolve(rows)
        else reject(err)
    })
})

async function getTime() {
    await promise.then((result) => {
        time = result[0].time
        return result[0].time
    }).catch((error) => {
        console.log(error)
    })
}

app.all('/timer',async function(req, res) {
    if (req.method == "GET" && req.headers.referer != null) {
        promise.then((result) => {
            if (result.length == 0)
                res.send("No upcoming event")
            else
                res.render('timer', {event_time: result[0].time})
        }).catch((error) => {
            console.log(error)
        })
    // if (req.method == "GET") {
    }
    else res.send(req.method + " request not supported.")
    // res.sendFile(path.join(__dirname + '/views/timer.html'))
})

app.all('/ide', function(req, res) {
    if (req.method == "GET")
        res.sendFile(path.join(__dirname + '/views/ide.html'))
    else res.send(req.method + " request not supported.")
})

app.post('/userreg', function(req, res) {
    console.log('POST userreg: ' + req.body.account)
    if (req.body.account == null) {
        res.send({
            status: 0,
            description: "Invalid post request"
        })
    } else {
        try {
            var connection = helper.mysql.connect()
            connection.query('select * from participants where pubkey like \'' +
                req.body.account + '\' and event like (select id from events where time like (select max(time) from events));',
                function(err, rows, fields) {
                    // console.log(err)
                    connection.end
                    if (err) throw err
                    if (rows.length == 0) {
                        res.send({
                            status: 3
                        })
                    } else if (rows[0].txstatus == 0) {
                        // TODO: recheck the transaction status
                        res.send({
                            status: 2,
                            txid: rows[0].txid
                        })
                    } else if (rows[0].txstatus == 1) {
                        res.send({
                            status: 1
                        })
                    }
                })
        } catch (e) {
            console.log(e)
            res.send({
                error: "Internal server error"
            })
        }
    }
    // return res.send(req.body)
})

app.post('/posttx', function(req, res) {
    if (req.body.txid == null || req.body.account == null)
        res.send({
            error: "Invalid request parameters."
        })
    else {
        try {
            var connection = helper.mysql.connect()
            connection.query('insert into participants values (\'' +
                req.body.account +
                '\', (select id from events where time like (select max(time) from events)), \'' +
                req.body.txid +
                '\', (select now()), 0);',
                function(err, rows, fields) {
                    console.log(err)
                    if (err) throw err;
                })
            res.send({
                status: "Success"
            })
        } catch (e) {
            console.log(e)
            res.send({
                error: "Internal server error"
            })
        }
    }
})

app.listen(port, () => console.log('')) //__dirname+`\nExample app listening on port ${port}!`))
