/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("customers", "status", {
            type: Sequelize.ENUM("ACTIVE", "ARCHIVED"),
            allowNull: false,
            defaultValue: "ACTIVE",
        });
    },

    down: async (queryInterface) =>
        queryInterface.sequelize.transaction((t) =>
            Promise.all([
                queryInterface.removeColumn("customers", "status", {
                    transaction: t,
                }),
                queryInterface.sequelize.query(
                    'DROP TYPE IF EXISTS "enum_customers_status";',
                    { transaction: t }
                ),
            ])
        ),

    // await queryInterface.removeColumn("customers", "status");
};
