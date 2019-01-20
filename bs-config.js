module.exports = {
    port: process.env.PORT,
    files: ["./**/*.{html,html,css,js}"],
    server: {
        baseDir:["./src","./build/contracts"]
    }

}