let customers = [
    {id: 1, name: "DevSamurai", site : "https://devsamurai.com.br"},
    {id: 2, name: "Google", site : "https://google.com.br"},
    {id: 3, name: "Udemy", site : "https://udemy.com.br"},
]

class CustomersController{

//criando o metodo index - lista todos os registros
    index(req, res){

        return res.json(customers);
        
        }

    //criando o metodo show - lista um registro

    show(req, res){
        const {id} = req.params;
        const customer = customers.find(customer => customer.id == id);
        const status = customer ? 200 : 404;
        return res.status(status).json(customer);

    }
    //criando o metodo create - cria um registro

    create(req, res){
        const {name, site} = req.body;
        const id = customers[customers.length - 1].id + 1;
        const newCustomer = {id, name, site};
        customers.push(newCustomer);
        
        return res.status(201).json(newCustomer);
}

    //criando o metodo update - atualiza um registro

    update(req, res){
        const {id} = req.params;
        const {name, site} = req.body;
        const customer = customers.find(customer => customer.id == id);
        if(!customer){
            return res.status(404).json({error: "Customer not found"});
        } 
        customer.name = name;
        customer.site = site;
        return res.json(customer);

        
    }

    //criando o metodo delete - deleta um registro

    delete(req, res){
        const {id} = req.params;
        const customerIndex = customers.findIndex(customer => customer.id == id);
        if(customerIndex < 0){
            return res.status(404).json({error: "Customer not found"});
        }
        customers.splice(customerIndex, 1);
        return res.send ("customer deleted");

    }
}

export default new CustomersController();