const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {
    // set up method to run on instance data (per user) to check password 
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}

User.init(
  {
    id: {
        // type is an integer
        type: DataTypes.INTEGER,
        // has to have a value
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        // type is a string
        type: DataTypes.STRING,
        // has to have value
        allowNull:false,
        unique: true
    },
    password: {
        // type is a string
        type: DataTypes.STRING,
        // has to have a value
        allowNull: false,
        validate: {
            len: [4]
        }
    }
  },
  {
    hooks: {
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;