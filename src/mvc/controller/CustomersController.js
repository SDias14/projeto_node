/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import { Op } from "sequelize"; // importando o operador de comparação do sequelize
import { parse, parseISO } from "date-fns";
import * as Yup from "yup";
import Customer from "../model/Customer"; // importando o model Customer.js
import Contact from "../model/Contact"; // importando o model Contact.js
import "../../database"; // importando o arquivo database.js

Customer.hasMany(Contact);
Contact.belongsTo(Customer, { foreignKey: "customer_id" }); // Set the foreign key

class CustomersController {
    async index(req, res) {
        const {
            name,
            email,
            status,
            createdBefore,
            createdAfter,
            updatedBefore,
            updatedAfter,
            sort,
        } = req.query;

        const page = req.query.page || 1;
        const limit = req.query.limit || 25;

        let where = {};
        let order = [];

        if (name) {
            where = {
                ...where,
                name: {
                    [Op.iLike]: name,
                },
            };
        }

        if (email) {
            where = {
                ...where,
                email: {
                    [Op.iLike]: email,
                },
            };
        }

        if (status) {
            where = {
                ...where,
                status: {
                    [Op.in]: status
                        .split(",")
                        .map((item) => item.toUpperCase()),
                },
            };
        }

        if (createdBefore) {
            where = {
                ...where,
                createdAt: {
                    [Op.lte]: parseISO(createdBefore),
                },
            };
        }

        if (createdAfter) {
            where = {
                ...where,
                createdAt: {
                    [Op.gte]: parseISO(createdAfter),
                },
            };
        }

        if (updatedBefore) {
            where = {
                ...where,
                updatedAt: {
                    [Op.gte]: parseISO(updatedBefore),
                },
            };
        }

        if (updatedAfter) {
            where = {
                ...where,
                updatedAt: {
                    [Op.lte]: parseISO(updatedAfter),
                },
            };
        }

        console.log(where);

        if (sort) {
            order = sort.split(",").map((item) => item.split(":"));
        }

        const customers = await Customer.findAll({
            where,
            include: [
                {
                    model: Contact,
                    attributes: ["id", "status"],
                },
            ],
            order,
            limit,
            offset: limit * page - limit,
        });

        return res.json(customers);
    }

    async show(req, res) {
        const customer = await Customer.findByPk(req.params.id, {
            include: [
                {
                    model: Contact,
                    attributes: ["id", "status"],
                },
            ],
        });

        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        return res.json(customer);
    }

    async create(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            status: Yup.string().uppercase(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fails" });
        }

        const customer = await Customer.create(req.body);

        return res.json(customer);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            status: Yup.string().uppercase(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fails" });
        }

        const customer = await Customer.findByPk(req.params.id);

        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        await customer.update(req.body);

        return res.json(customer);
    }

    async delete(req, res) {
        const customer = await Customer.findByPk(req.params.id);

        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        await customer.destroy();

        return res.status(200).json("Customer deleted");
    }
}

export default new CustomersController();
