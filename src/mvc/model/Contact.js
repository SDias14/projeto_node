/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line no-unused-vars
import Sequelize, { Model } from "sequelize";

class Contact extends Model {
    static init(sequelize) {
        super.init(
            {
                name: sequelize.STRING,
                email: sequelize.STRING,
                status: sequelize.ENUM("ACTIVE", "ARCHIVED"),
            },
            {
                sequelize,
            }
        );
    }

    static associate(model) {
        this.belongsTo(model.Customer, { foreignKey: "customer_id" });
    }
}

export default Contact;
