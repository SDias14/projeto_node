// eslint-disable-next-line import/no-extraneous-dependencies
import Sequelize from "sequelize";

import config from "../config/database";

import Customer from "../mvc/model/Customer";

import Contact from "../mvc/model/Contact";

import User from "../mvc/model/User";

const models = [Customer, Contact, User];

class Database {
    constructor() {
        this.connection = new Sequelize(config);
        this.init();
    }

    init() {
        models.forEach((model) => model.init(this.connection));
    }
}

export default Database;
