const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
  },
  apis: ['./api/*.js'], // Path to the API routes folder
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
