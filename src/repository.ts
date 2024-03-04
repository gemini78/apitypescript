import { database } from "./database";
import { getUniqueId } from "./helper";
import { IPokemon } from "./lib/pokemon";

let collection: IPokemon[] = database.pokemons;

export const add = (pokemon: any): IPokemon => {
    pokemon.id = getUniqueId(collection)
    collection.push(pokemon);
    return pokemon;
};
export const getAll = (): IPokemon[] => {
    return collection;
};
export const getById = (id: number) => {
    return collection.filter((pokemon: IPokemon) => pokemon.id === id)
};

export const modify = (id: number, pokemonData: any): IPokemon => {
    collection = collection.map(pokemon => pokemon.id === id ? pokemonData : pokemon)
    return collection.find((pokemon: IPokemon) => pokemon.id === id);
};

export const remove = (id: number) => {
    const pokemonDeleted = collection.find((pokemon: IPokemon) => pokemon.id === id);
    console.log(pokemonDeleted);

    collection = collection.filter(pokemon => pokemon.id !== id);
    return pokemonDeleted;
};
