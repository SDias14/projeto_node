import { Op } from "sequelize"; // importando o operador de comparação do sequelize
import { parseISO } from "date-fns";
import * as Yup from "yup";
import Customer from "../model/Customer"; // importando o model Customer.js
import Contact from "../model/Contact"; // importando o model Contact.js
import "../../database"; // importando o arquivo database.js

Customer.hasMany(Contact);
Contact.belongsTo(Customer, { foreignKey: "customer_id" }); // Set the foreign key

class ContactController {
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

        let where = { customer_id: req.params.customerId };
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

        const contact = await Contact.findAll({
            where,
            include: [
                {
                    model: Customer,
                    attributes: ["id", "status"],
                    required: true,
                },
            ],
            order,
            limit,
            offset: limit * page - limit,
        });

        return res.json(contact);
    }

    async show(req, res) {
        const contact = await Contact.findOne({
            where: {
                customer_id: req.params.customerId,
                id: req.params.id,
            },
            include: [
                {
                    model: Customer,
                    attributes: ["id", "name"],
                    required: true,
                },
            ],
            attributes: {
                exclude: [
                    "name",
                    "customer_id",
                    "customerId",
                    "createdAt",
                    "updatedAt",
                ],
            },
        });

        if (!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        return res.json(contact);
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

        const contact = await Contact.create({
            customer_id: req.params.customerId,
            ...req.body,
        });

        return res.json(contact);
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

        const contact = await Contact.findOne({
            where: {
                customer_id: req.params.customerId,
                id: req.params.id,
            },
            include: [
                {
                    model: Customer,
                    attributes: ["id", "name"],
                    required: true,
                },
            ],
            attributes: {
                exclude: [
                    "name",
                    "customer_id",
                    "customerId",
                    "createdAt",
                    "updatedAt",
                ],
            },
        });

        if (!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        await contact.update(req.body);

        return res.json(contact);
    }

    async delete(req, res) {
        const contact = await Contact.findByPk(req.params.id);

        if (!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        await contact.destroy();

        return res.status(200).json("Contact deleted");
    }
}

export default new ContactController();
