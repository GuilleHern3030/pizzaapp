const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Article", // Nombre del modelo
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        //defaultValue: DataTypes.UUIDV4,
        autoIncrement: true, // el id se autoincrementa
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      coin: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      register: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      imageuri: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      details: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    // Extra options
    { 
      timestamps: false,// Fecha en que se crea la celda
      tableName: "articles"// Nombre literal de la tabla
    }
  );
};

