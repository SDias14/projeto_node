/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.removeColumn("users", "provider");
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("users", "provider", {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        });
    },
};
