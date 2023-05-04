import { Sequelize, DataTypes, Model } from "sequelize";
import database from "../../config/database";

const sequelize = new Sequelize(database);

class Customer extends Model {
    static associate(models) {
        this.hasMany(models.Contact);
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
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: "Customer", // We need to choose the model name
    }
);

export default Customer;
