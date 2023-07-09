const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'Your API description',
    },
    servers: [
      {
        url: 'http://localhost:8080', // Specify your server URL
      },
    ],
  },
  apis: ['./routes/*.js'], // Specify your API route files
};

const specs = swaggerJSDoc(options);

module.exports = specs;
