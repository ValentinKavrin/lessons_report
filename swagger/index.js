const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Lessons report API",
            description: "Lessons_Report API documentation",
            servers: [`http://localhost:3333`],
        },
        basepath: "/api",
    },
    apis: ["./swagger/*jsdoc.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;