/* eslint-disable import/no-cycle */
import { Sequelize, DataTypes, Model } from "sequelize";
import database from "../../config/database";
// eslint-disable-next-line no-unused-vars
import Contact from "./Contact";

const sequelize = new Sequelize(database);

class Customer extends Model {
    static associate() {
        Customer.hasMany(Contact, { foreignKey: "customer_id" });
    }
}

Customer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("ACTIVE", "ARCHIVED"),
            allowNull: false,
            defaultValue: "ACTIVE",
        },

        email: {
            type: DataTypes.STRING,
            // allowNull defaults to true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: "Customer", // We need to choose the model name
        name: {
            singular: "customer",
            plural: "customers",
        },
    }
);

export default Customer;
