import { Sequelize } from 'sequelize-typescript';
import PokemonModel from "../models/pokemon";
import { database } from "./database"

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

sequelize.addModels([PokemonModel]);

const initDb = async () => {
    return sequelize.sync({ force: true })
        .then(_ => {
            database.pokemons.map(pokemon => {
                PokemonModel.create({
                    "name": pokemon.name,
                    "cp": pokemon.cp,
                    "hp": pokemon.hp,
                    "picture": pokemon.picture,
                    "types": pokemon.types
                }).then(pokemon => console.log(pokemon.toJSON()))
            })
        })
}

module.exports = {
    PokemonModel,
    initDb
}