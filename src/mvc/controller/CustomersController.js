import Customer from "../model/Customer"; // importando o model Customer.js

class CustomersController {
    // criando o metodo index - lista todos os registros

    async index(req, res) {
        try {
            const customers = await Customer.findAll(); // buscando todos os registros

            return console.log(customers); // retornando os registros
        } catch (error) {
            return res.json(error); // retornando o erro
        }
    }
}

export default new CustomersController(); // exportando o controller CustomersController.js
