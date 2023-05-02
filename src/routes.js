import { Router } from "express"; // importando o express

// importando os controllers

import customers from "./mvc/controller/CustomersController";

// rotas de customers

const routes = new Router(); // criando uma nova rota

routes.get("/customers", customers.index); // rota para listar um registro

export default routes; // exportando o arquivo routes.js
