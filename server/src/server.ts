import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import transactionRouter from "./controllers/transactionController";

const app = express();
const PORT = 8080;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Transaction Management API",
      version: "1.0.0",
      description: "API documentation for the transaction management server.",
    },
    servers: [{ url: `http://localhost:${PORT}`, description: "Local server" }],
  },
  apis: ["./src/server.ts", "./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(transactionRouter);
app.get("/api-docs.json", (_req, res) => {
  res.json(swaggerSpec);
});

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Check server health
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Welcome to the Transaction Management API. Server is running!"
 */
app.get("/health", (_req, res) => { // health check endpoint
  res.json({ status: "Welcome to the Transaction Management API. Server is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
});