import "./database";
import Customer from "./mvc/model/Customer";

class Playground {
    static async play() {
        const customers = await Customer.findAll();

        console.log(JSON.stringify(customers, null, 2));

        /*
        const customer = await Customer.findByPk(2); // it will return the second customer

        console.log(JSON.stringify(customer, null, 2));

        const customer = await Customer.findOne(); // it will return the first customer

        console.log(JSON.stringify(customer, null, 2));

        */
    }
}

Playground.play();
