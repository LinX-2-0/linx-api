// models/User.js
const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('mysql://root:StrongPassword123!@localhost:3306/linx');

const User = sequelize.define('User', {
  // Define model attributes
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
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
