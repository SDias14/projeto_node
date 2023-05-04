import "./database";
import Customer from "./mvc/model/Customer";
import Contact from "./mvc/model/Contact";

Customer.hasMany(Contact);
Contact.belongsTo(Customer, { foreignKey: "customer_id" }); // Set the foreign key

class Playground {
    static async play() {
        const customer = await Customer.findByPk(1);

        if (customer) {
            await customer.destroy();
        } else {
            console.log("Customer not found");
        }

        console.log("Customer deleted");
    }
}

Playground.play();

/* SELECT
        // count = await Customer.count();
        // const customers = await Customer.max("created_at");
        // scope = await Customer.scope("active").findAll();
        const customers = await Customer.scope("active").findAll({
            include: Contact,
            order: [["id", "DESC"]],
        });

        console.log(JSON.stringify(customers, null, 2));

        /*
        const customer = await Customer.findByPk(2); // it will return the second customer

        console.log(JSON.stringify(customer, null, 2));

        const customer = await Customer.findOne(); // it will return the first customer

        console.log(JSON.stringify(customer, null, 2));

        CREATE

        const customer = await Customer.create({
            name: "Supermercado Zaza",
            email: " johny@gmail.com",
            created_at: new Date(),
            updated_at: new Date("2023-05-10 13:59:56.000000"),
        });

        console.log(JSON.stringify(customer, null, 2));


        UPDATE

        const customer = await Customer.findByPk(1);
        console.log(JSON.stringify(customer, null, 2));

        customer.name = "Supermercado Assai";
        await customer.save();

        console.log(JSON.stringify(customer, null, 2));

        customer.status = "ARCHIVED";

        await customer.save();

        console.log(JSON.stringify(customer, null, 2));

        */
