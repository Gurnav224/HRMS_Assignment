const mongoose = require('mongoose');


const databaseConnection = async () => {
    try {
        await mongoose.connect(process.env.dbUri,{dbName:'Hr_db'});
        console.log('connected to database successfully')
    } catch (error) {
        console.error('failed database connection')
    }
}


module.exports = databaseConnection;