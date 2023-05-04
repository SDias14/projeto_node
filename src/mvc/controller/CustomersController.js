/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import Customer from "../model/Customer"; // importando o model Customer.js

class CustomersController {
    // criando o metodo index - lista todos os registros

    async index(req, res) {
        const customers = await Customer.findAll(); // busca todos os registros da tabela Customers

        return res.json(customers); // retorna os registros em formato json
    }
}

export default new CustomersController(); // exportando o controller CustomersController.js
