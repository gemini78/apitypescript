import { IPokemon } from "./lib/pokemon";

export const success = (message: string, data: any) => {
    return { message, data }
};

export const getUniqueId = (pokemons: IPokemon[]): number => {
    const pokemonsIds = pokemons.map(pokemon => pokemon.id);
    const maxId = pokemonsIds.reduce((pokemonA, pokemonB) => Math.max(pokemonA, pokemonB));
    const uniqueId = maxId + 1;
    return uniqueId;
}
