import express from "express";
import { Application, Request, Response } from "express";
import { myRouter } from "./router";
import Morgan from "morgan";
import favicon from "serve-favicon"
import bodyParser from "body-parser";
import { Sequelize } from 'sequelize-typescript';

const app: Application = express();
const port = 3000;

const sequelize = new Sequelize({
    database: 'pokedex',
    dialect: 'mariadb',
    username: 'root',
    password: '',
    logging: false
});

sequelize.authenticate()
    .then(_ => console.log("Connexion établie avec la BDD"))
    .catch(error => console.log(`Impossible de se connecter avec la BDD ${error}`))

app
    .use(favicon(__dirname + '/../favicon.ico'))
    .use(Morgan("dev"))
    .use(bodyParser.json())

app.get('/', (req: Request, res: Response) => res.send('Hello'))

app.use('/api/pokemons', myRouter);

app.listen(port, () => {
    console.log(`Serveur démarré à l'url: http://localhost:${port}`);
})