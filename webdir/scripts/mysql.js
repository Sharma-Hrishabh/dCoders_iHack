function getall(table, connection) {
    connection.query('SELECT * from '+table+';', function (err, rows, fields) {
        if (err) throw err
        else return [err, rows, fields]
    })
}
