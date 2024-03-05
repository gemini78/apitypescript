import express from "express";
import { Application, Request, Response } from "express";
import { myRouter } from "./router";
import Morgan from "morgan";
import favicon from "serve-favicon"
import bodyParser from "body-parser";
import { Sequelize } from 'sequelize-typescript';
import Pokemon from "./models/pokemon";
import { fillBdd } from "./repository";

const app: Application = express();
const port = 3000;

const sequelize = new Sequelize({
    database: 'pokedex',
    dialect: 'mariadb',
    username: 'root',
    password: '',
    logging: false,
    models: [__dirname + "./models"]
});

sequelize.authenticate()
    .then(_ => console.log("Connexion établie avec la BDD"))
    .catch(error => console.log(`Impossible de se connecter avec la BDD ${error}`))

sequelize.addModels([Pokemon]);

sequelize.sync({ force: true })
    .then(_ => {
        console.log('La base de données pokedex est bien synchronisée');
        /*  Pokemon.create({
             "name": "Gemini",
             "cp": 88,
             "hp": 29,
             "picture": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/010.png",
             "types": ["Insecte", "Poison"].join()
         }).then(gemini => console.log(gemini.toJSON())) */

        fillBdd()

    })
    .catch(error => console.log(`La base de données pokedex n'est pas synchronisée ${error}`))

app
    .use(favicon(__dirname + '/../favicon.ico'))
    .use(Morgan("dev"))
    .use(bodyParser.json())

app.get('/', (req: Request, res: Response) => res.send('Hello'))

app.use('/api/pokemons', myRouter);

app.listen(port, () => {
    console.log(`Serveur démarré à l'url: http://localhost:${port}`);
})