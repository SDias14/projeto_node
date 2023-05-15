/* eslint-disable no-shadow */
import { Op } from "sequelize"; // importando o operador de comparação do sequelize
import { parseISO } from "date-fns";
import * as Yup from "yup";
import User from "../model/User";
import "../../database"; // importando o arquivo database.js

class UsersController {
    async index(req, res) {
        const {
            name,
            email,
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

        if (sort) {
            order = sort.split(",").map((item) => item.split(":"));
        }

        const users = await User.findAll({
            attributes: { exclude: ["password", "password_hash"] },
            where,
            order,
            limit,
            offset: limit * page - limit,
        });

        console.log({ userId: req.userId });

        return res.json(users);
    }

    async show(req, res) {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ["password", "password_hash"] },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json(user);
    }

    async create(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8),
            passwordConfirmation: Yup.string().when(
                "password",
                // eslint-disable-next-line no-shadow
                (password, field) =>
                    password
                        ? field
                              .required()
                              .oneOf(
                                  [Yup.ref("password")],
                                  "Passwords must match"
                              )
                        : field
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: "Could not complete the task" });
        }

        const { id, name, email, createdAt, updatedAt } = await User.create(
            req.body
        );

        return res.json({ id, name, email, createdAt, updatedAt });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(8),
            password: Yup.string()
                .min(8)
                .when("oldPassword", (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            passwordConfirmation: Yup.string().when(
                "password",
                (password, field) =>
                    password
                        ? field
                              .required()
                              .oneOf(
                                  [Yup.ref("password")],
                                  "Passwords must match"
                              )
                        : field
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: "Could not complete the task" });
        }

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const { oldPassword } = req.body;

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: "Password does not match" });
        }

        const { id, name, email, createdAt, updatedAt } = await user.update(
            req.body
        );

        return res.json({ id, name, email, createdAt, updatedAt });
    }

    async delete(req, res) {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.destroy();

        return res.json({ message: "User deleted" });
    }
}

export default new UsersController();
