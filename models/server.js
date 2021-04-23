const express = require('express')
const cors = require('cors')
class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosRoutes = '/api/users';
    //Middlewares: Funciones que agregan mas funcionalidad
    //al web server
    this.middlewares();


    this.routes();



  }

  middlewares() {
    // Directorio publico
    this.app.use(express.static('public'));
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.usuariosRoutes, require('../routes/users.routes'));
  }

  listening() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en el puerto', this.port);
    });
  }


}


module.exports = Server;