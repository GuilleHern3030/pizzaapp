const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Message", // Nombre del modelo
    // Cuando se ejecute una query a la base de datos, 
    // sequelize plurizará el nombre del modelo.
    // Es decir, la query la hará a la tabla "Messages"
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
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true, // no se puede repetir
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false, // puede ser null
      }
    },
    // Extra options
    { 
      timestamps: false,// Fecha en que se crea la celda
      tableName: "messages"// Nombre literal de la tabla
    }
  );
};

