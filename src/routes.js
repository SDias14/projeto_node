import { Router } from "express"; // importando o express

// importando os controllers

import customers from "./mvc/controller/CustomersController";
import contacts from "./mvc/controller/ContactsController";
import users from "./mvc/controller/UsersController";
import auth from "./middlewares/auth";
import sessions from "./mvc/controller/SessionsController";

const routes = new Router(); // criando uma nova rota

// rotas de sessions

routes.post("/sessions", sessions.create); // rota para criar um registro

// to this point all routes will be protected by the auth middleware

routes.use(auth); // usando o middleware auth
// rotas de customers

routes.get("/customers", customers.index); // rota para listar um registro

routes.get("/customers/:id", customers.show); // rota para listar todos os registros

routes.post("/customers", customers.create); // rota para criar um registro

routes.put("/customers/:id", customers.update); // rota para atualizar um registro

routes.delete("/customers/:id", customers.delete); // rota para deletar um registro

// rotas de contacts

routes.get("/customers/:customerId/contacts", contacts.index); // rota para listar um registro
routes.get("/customers/:customerId/contacts/:id", contacts.show); // rota para listar todos os registros
routes.post("/customers/:customerId/contacts", contacts.create); // rota para criar um registro
routes.put("/customers/:customerId/contacts/:id", contacts.update); // rota para atualizar um registro
routes.delete("/customers/:customerId/contacts/:id", contacts.delete); // rota para deletar um registro

// rotas de users

routes.get("/users", users.index); // rota para listar um registro
routes.get("/users/:id", users.show); // rota para listar todos os registros
routes.post("/users", users.create); // rota para criar um registro
routes.put("/users/:id", users.update); // rota para atualizar um registro
routes.delete("/users/:id", users.delete); // rota para deletar um registro

export default routes; // exportando o arquivo routes.js
