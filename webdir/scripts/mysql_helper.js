const Mysql = require('mysql')
var mysql = {
    connect: function () {
        var connection = Mysql.createConnection({
            host: 'localhost',
            user: 'ujjwal',
            password: 'root',
            database: 'newdb'
        });

        connection.connect()
        return connection
    },
    
    disconnect: function (connection) {
        connection.end
    },

    test: function () {
        console.log('hello')
    }
}

exports.mysql = mysql
