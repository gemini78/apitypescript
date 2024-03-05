import express from "express";
import { Application, Request, Response } from "express";
import { myRouter } from "./router";
import Morgan from "morgan";
import favicon from "serve-favicon"
import bodyParser from "body-parser";
const sequelise = require("./db/sequelize");

const app: Application = express();
const port = 3000;

sequelise.initDb();

app
    .use(favicon(__dirname + '/../favicon.ico'))
    .use(Morgan("dev"))
    .use(bodyParser.json())

app.get('/', (req: Request, res: Response) => res.send('Hello'))

app.use('/api/pokemons', myRouter);

// Error management
app.use(({ res }) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.';
    res.status(404).json({ message });
})

app.listen(port, () => {
    console.log(`Serveur démarré à l'url: http://localhost:${port}`);
})