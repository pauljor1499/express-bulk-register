const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Express Products API", // Title of the API
        version: "1.0.0", // Version of the API
        description: "A simple CRUD API for products and books", // Description of the API
    },
    servers: [
        {
            url: "http://localhost:5000", // URL of the API
        },
    ],
};

// Options for the swagger docs
const options = {
    swaggerDefinition,
    apis: ["./routes/*.js", "./swagger/books.js"], // Path to the API docs
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
