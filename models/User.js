// models/User.js
const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('mysql://root:new_password@172.31.33.19:3306/linx');

const User = sequelize.define('User', {
  // Define model attributes
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  dob: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Define additional options here
  tableName: 'users', // Specify the table name explicitly
  timestamps: true // Automatically add createdAt and updatedAt columns
});

// Sync the model with the database
User.sync({ alter: true })
  .then(() => {
    console.log('User model synchronized with database.');
  })
  .catch(err => {
    console.error('Error synchronizing user model:', err);
  });

module.exports = User;
