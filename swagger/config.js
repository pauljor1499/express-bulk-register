const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Express API",
        version: "1.0.0",
        description: "User management APIs",
    },
    servers: [
        {
            url: "http://localhost:5000",
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./routes/*.js", "./swagger/teachers.js"],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = { swaggerUi, swaggerSpec };
