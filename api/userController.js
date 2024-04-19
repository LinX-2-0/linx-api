// userController.js
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const util = require('util');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'StrongPassword123!',
    database: 'linx'
  });

const dbQuery = util.promisify(db.query).bind(db);

const getAllUsers = (req, res) => {
    // Logic to fetch all users
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json({users: results});
    });
};

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'dfsdfgsdfbsdgbsg';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'gefyh8erthqehnauyfgh';
const refreshTokenExpiry = 60 * 60 * 24 * 7; // 7 days

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, accessTokenSecret, { expiresIn: '15m' }); // 15 minutes
};

// Function to generate refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, refreshTokenSecret, { expiresIn: refreshTokenExpiry });
};

const getUserLoginDetails = async (req, res) => {
  console.log('request---', req.body);
  const { username, password } = req.body;

  try {
    const [rows, fields] = await dbQuery('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = rows;

    console.log('user---', rows.id)
    const validPassword = true;
    // await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.json({ accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const checkUserExistence = async ( req, res ) =>{
  const { username } = req.body;
  console.log('request---', req.body);

  try{
    const [rows, fields]= await dbQuery('Select * from users where username = ?', [username])

    if(!rows || rows.length === 0 ){
      res.status(401).json("No user found for the username?");

    }else{
      console.log('user---', rows)
      res.status(200).json({isUser:true, message:'User found with the given username'})

    }
  }catch(err){
    console.error(err);
    res.status(500).json("No user found for the username?");

  }
}

module.exports = {
    getAllUsers,
    getUserLoginDetails,
    checkUserExistence
  };
  