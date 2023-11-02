const mongoose = require('mongoose')

const conectarDB =  async () => {
    const conn = await mongoose.connect(
        'mongodb://127.0.0.1:27017/devcamp-ptech'
    )
     console.log("mongodb conectado".bgWhite.cyan.underline)
}

module.exports = conectarDB