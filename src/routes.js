import { Router } from "express"; // importando o express
//importando os controllers

import customers from "./mvc/controller/CustomersController";
// rotas de customers

const routes = new Router(); // criando uma nova rota

routes.get("/customers", customers.index); // rota para listar todos os registros

routes.get("/customers/:id", customers.show); // rota para listar um registro

routes.post("/customers", customers.create); // rota para criar um registro

routes.put("/customers/:id", customers.update); // rota para atualizar um registro

routes.delete("/customers/:id", customers.delete); // rota para deletar um registro

// fim das rotas de customers



export default routes; // exportando o arquivo routes.js
