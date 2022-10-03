const { DataTypes,Sequelize} = require('sequelize');


module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('temper', {
      id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull:false,
        primaryKey:true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
  
    },{timestamps:false});
  };