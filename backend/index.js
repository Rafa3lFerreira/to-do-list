import express from 'express';
import routes from "./routes/TaskRoutes.js";

const app = express();
app.use(express.json());
routes(app);

app.listen(5000, () => {
    console.log(`Servidor rodando na porta 5000`)
});
