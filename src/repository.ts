import { database } from "./db/database";
import { getUniqueId } from "./helper";
import { IPokemon } from "./lib/pokemon";
import PokemonModel from "./models/pokemon";

let collection: IPokemon[] = database.pokemons;

export const add = (pokemon: any) => {
    return PokemonModel.create(pokemon)
};

export const getAll = () => {
    return PokemonModel.findAll()
};

export const getById = (id: number) => {
    return PokemonModel.findByPk(id);
};

export const modify = (id: number, pokemonData: any) => {
    return PokemonModel.update(pokemonData, { where: { id: id } })
};


export const remove = async (id: number) => {
    const pokemonDeleted = await getById(id);
    await PokemonModel.destroy({ where: { id: pokemonDeleted.id } })
    return pokemonDeleted;
};

