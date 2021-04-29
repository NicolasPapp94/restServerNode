const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
      await mongoose.connect(process.env.MONGO_DB_ATLAS, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });
      console.log('Conexion a la DB realizada');
    } catch (error) {
      console.log(error);
      throw new Error('Error en la conexion con la BD')
    }
}

module.exports = {
  dbConnection
}