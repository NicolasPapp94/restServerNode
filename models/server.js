const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config.db');
class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth:       '/api/auth',
      categories: '/api/categories',
      products:   '/api/products',
      searchs:    '/api/search',
      users:      '/api/users'
      
    }
    
    //CONEXION A LA DB
    this.conectarDB();
    
    //Middlewares: Funciones que agregan mas funcionalidad
    //al web server
    this.middlewares();

    // RUTAS
    this.routes();

  }

  middlewares() {
    // Directorio publico
    this.app.use(express.static('public'));
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth.routes'));
    this.app.use(this.paths.categories, require('../routes/categories.routes'));
    this.app.use(this.paths.searchs, require('../routes/search.routes'));
    this.app.use(this.paths.products, require('../routes/products.routes'));
    this.app.use(this.paths.users, require('../routes/users.routes'));

  }

  listening() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en el puerto', this.port);
    });
  }

  async conectarDB() {
    await dbConnection();
  }


}


module.exports = Server;