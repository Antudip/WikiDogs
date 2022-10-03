const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('breed', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        height:{
            type: DataTypes.STRING,
            allowNull:false,
            
        },
        weight:{
            type: DataTypes.STRING,
            allowNull: false
        },
        image:{
            type: DataTypes.STRING,
            allowNull: false   
        },
        temperaments:{
            type: DataTypes.STRING
        }
       
    },{timestamps: false});
};