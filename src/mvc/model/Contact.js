/* eslint-disable import/no-cycle */
// eslint-disable-next-line no-unused-vars
import { Sequelize, DataTypes, Model } from "sequelize";
import database from "../../config/database";

const sequelize = new Sequelize(database);

class Contact extends Model {
    static associate(models) {
        this.belongsTo(models.Customer, { foreignKey: "customer_id" });
    }
}

Contact.init(
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

        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        status: {
            type: DataTypes.ENUM("ACTIVE", "ARCHIVED"),
            allowNull: false,
            defaultValue: "ACTIVE",
        },

        customer_id: {
            type: DataTypes.INTEGER,
            references: { model: "customers", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            allowNull: false,
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Contact", // We need to choose the model name
    }
);

export default Contact;
