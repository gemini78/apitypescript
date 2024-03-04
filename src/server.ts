import express from "express";
import { Application, Request, Response } from "express";
import { myRouter } from "./router";
import Morgan from "morgan";
import favicon from "serve-favicon"
import bodyParser from "body-parser";

const app: Application = express();
const port = 3000;

const logger = (req: Request, res: Response, next) => {
    console.log(`URL: ${req.url}`)
    next()
}

app
    .use(favicon(__dirname + '/../favicon.ico'))
    .use(Morgan("dev"))
    .use(bodyParser.json())

app.get('/', (req: Request, res: Response) => res.send('Hello'))

app.use('/api/pokemons', myRouter);

app.listen(port, () => {
    console.log(`Serveur démarré à l'url: http://localhost:${port}`);
})