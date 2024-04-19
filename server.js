const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const router = require('./api/routes');
const db = require('./db')
const app = express();
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api/apiRoutes.yaml');
const PORT = 5000;


db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    process.exit(1); // Exit the process if database connection fails
  }
  console.log('Connected to MySQL database');
});

// Function to generate access token

// Middleware to parse JSON body
app.use(express.json());
app.use(router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Close database connection when the server shuts down
process.on('SIGINT', () => {
  db.end((err) => {
    if (err) {
      console.error('Error closing MySQL database connection:', err);
    }
    console.log('Database connection closed');
    process.exit(0);
  });
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
