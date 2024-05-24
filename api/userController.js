// userController.js
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const util = require('util');
const User = require('../models/User');


const db = mysql.createConnection({
    host: '172.31.33.19',
    user: 'root',
    password: 'new_password',
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
    console.log('request---',rows);

    if (!rows) {
      console.log('rows---',rows);

      return res.status(401).json({ message: 'Invalid username or password' });

    }

    const user = rows;

    console.log('user---', rows.id)
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    console.log("Valid password");
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    console.log('access token----', accessToken)
    res.json({userData:user, accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const checkUserExistence = async ( req, res ) =>{
  const { username } = req.body;
  console.log('request--- checkUserExistence', req.body, req.headers);

  try{
    const [rows, fields]= await dbQuery('Select * from users where username = ?', [username])

    if(!rows || rows.length === 0 ){
      res.status(401).json("No user found for the username!");

    }else{
      console.log('user---', rows)
      res.status(200).json({isUser:true, message:`Hi, ${rows.username} please enter your password to login!`})

    }
  }catch(err){
    console.error(err);
    res.status(500).json("No user found for the username!");

  }
}

const saveUser= async(req, res)=>{
const data = req.body;
const {id, name,username, email, phone, dob} = req.body;
const defaultPassword = 'Welcome@123'
const saltRounds = 10;
console.log("New user", data);
try{
  const [rows, fields]= await dbQuery('Select * from users where email = ? or phone = ?', [email,phone])
  if(!rows || rows.length === 0 ){
    const hashedPassword = await bcrypt.hash(defaultPassword, saltRounds);
    const userData = {
      id,
      name,
      email,
      username: username || email,
      phone,
      dob,
      password:hashedPassword
    }
    const user = new User(userData);
  
    const savedUser = await user.save();
  
    res.status(200).json(savedUser.id)
  }else{
    res.status(500).json({isUser:true, message:`Already registered email or phone!`})
  }
 

}catch(err){
  console.error(err);
  res.status(500).json("User registration failure!");
}
}

module.exports = {
    getAllUsers,
    getUserLoginDetails,
    checkUserExistence,
    saveUser
  };
  
