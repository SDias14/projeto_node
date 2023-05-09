/* eslint-disable func-names */
import { Sequelize, DataTypes, Model } from "sequelize";
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from "bcryptjs";

import database from "../../config/database";

const sequelize = new Sequelize(database);

class User extends Model {
    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

User.init(
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

        password: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
        },

        password_hash: {
            type: DataTypes.STRING,
            allowNull: true,
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
        modelName: "User", // We need to choose the model name
        name: {
            singular: "user",
            plural: "users",
        },
    }
);

User.addHook("beforeSave", async (user) => {
    if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
    }
});

export default User;
