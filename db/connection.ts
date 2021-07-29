import { Sequelize } from 'sequelize';


const db = new Sequelize('curso-node', 'root', '', {
    host: 'localhost', // en vaso deremoto seria toda direction http y path
    dialect: 'mysql',
    // logging: false,
});

export default db;
