/* eslint-disable linebreak-style */
import express from 'express'; // importando o express
import routes from './routes'; // importando o arquivo routes.js

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.server.use(express.json());
  }

  // usando as rotas
  routes() {
    this.server.use(routes); // usando o metodo routes
  }
}

export default new App().server; // exportando o arquivo app.js
