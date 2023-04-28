/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line no-unused-vars
import Sequelize, { Model } from "sequelize";

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: sequelize.STRING,
                email: sequelize.STRING,
                password_hash: sequelize.STRING,
                provider: sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
        );
    }
}

export default User;