/* eslint-disable prettier/prettier */
/* eslint-disable linebreak-style */
import express from "express";
// import authMiddleware from "./middlewares/auth";
import routes from "./routes"; // importando o arquivo routes.js
import "./database";

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.server.use(express.json());
    // this.server.use(authMiddleware);
  }

  // usando as rotas
  routes() {
    this.server.use(routes); // usando o metodo routes
  }
}

export default new App().server; // exportando o arquivo app.js
