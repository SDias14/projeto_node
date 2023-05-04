/* eslint-disable import/no-named-as-default-member */
// eslint-disable-next-line import/no-extraneous-dependencies
import Sequelize from "sequelize";

import config from "../config/database";

// eslint-disable-next-line import/no-named-as-default
import Customer from "../mvc/model/Customer";

import Contact from "../mvc/model/Contact";

import User from "../mvc/model/User";

const models = [Customer, Contact, User];

class Database {
    constructor() {
        this.connection = new Sequelize(config);
        this.init();
        this.associate();
    }

    init() {
        models.forEach((model) => model.init(this.connection));
    }

    associate() {
        models.forEach((model) => {
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });
    }
}

export default Database;
