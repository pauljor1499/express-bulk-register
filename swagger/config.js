const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Express API",
        version: "1.0.0",
        description: "A simple CRUD API.",
    },
    servers: [
        {
            url: "http://localhost:5000",
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./routes/*.js", "./swagger/books.js"],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = { swaggerUi, swaggerSpec };
