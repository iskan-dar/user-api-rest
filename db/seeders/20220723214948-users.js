const fs = require('fs').promises;

// function to retrieve users data from users.txt file to seed the Users table
async function usersFromTxtFile() {
    const stringArrOfUsers = await fs
        .readFile('./files/users.txt', 'utf-8')
        .then((result) => result.split('\n'))
        .catch(console.error);

    console.log(stringArrOfUsers);

    const users = stringArrOfUsers
        .slice(0, stringArrOfUsers.length - 1)
        .map((str) => {
            const userVariables = str.split(' ');
            return {
                firstName: userVariables[0],
                lastName: userVariables[1],
                age: userVariables[2],
                isFree: userVariables[3],
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        });
    return users;
}

// seeder
module.exports = {
    // up is used to seed the table
    async up(queryInterface, Sequelize) {
        // let's retrieve data from users.txt
        const users = await usersFromTxtFile();

        // lets seed Users table with users arrayOfObjects
        await queryInterface.bulkInsert('Users', users, {});
    },

    // down is used to delete data from table
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
