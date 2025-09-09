import express from "express";
import questionRouter from "./routes/questions.mjs";
import answerRouter from "./routes/answers.mjs";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
const port = 4000;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Q&A API',
      description: 'Q&A API Documentation',
      contact: {
        name: 'Orathai',
      },
      server: ['http://localhost:4000']
    }
  },
  apis: ["./docs/*.js"]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));




app.use(express.json());
app.use('/questions', questionRouter);
app.use('/answers', answerRouter);

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
