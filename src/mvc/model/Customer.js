/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line no-unused-vars
import Sequelize, { Model } from "sequelize";

class Customer extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                // status: Sequelize.ENUM("active", "inactive"),
            },
            {
                sequelize,
            }
        );
    }
}

export default Customer;
