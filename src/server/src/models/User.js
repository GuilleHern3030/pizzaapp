const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "User", // Nombre del modelo
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        //defaultValue: DataTypes.UUIDV4,
        autoIncrement: true, // el id se autoincrementa
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      authtoken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      authdate: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    // Extra options
    { 
      timestamps: false,// Fecha en que se crea la celda
      tableName: "users"// Nombre literal de la tabla
    }
  );
};