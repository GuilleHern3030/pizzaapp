const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT, DB_PARAMS } = require('./config')

const fs = require("fs"); // lectura de archivos
const path = require("path"); // manipulación de path

// Define la base de datos y su tipo
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}${DB_PARAMS?'?'+DB_PARAMS:""}`,
  { logging: false, native: false }
);

// Load models
const basename = path.basename(__filename);
const modelDefiners = [];
fs.readdirSync(path.join(__dirname, "/models"))
  .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach((file) => { modelDefiners.push(require(path.join(__dirname, "/models", file))) });
modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(entries);

// Modelos
/*const { Driver, Team } = sequelize.models;
Driver.belongsToMany(Team, { through: "driver_team" });
Team.belongsToMany(Driver, { through: "driver_team" });*/

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
};
