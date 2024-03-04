export interface IPokemon {
    id: number,
    name: string,
    hp: number,
    cp: number,
    picture: string,
    types: string[],
    created: Date
}