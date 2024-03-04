import { Router, Request, Response } from 'express';
import * as repo from "./repository";
import { success } from "./helper";

export const myRouter = Router();

myRouter.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const data = repo.getById(id);
    const message = "Un pokemon a bien été trouvé";
    res.json(success(message, data))
})

myRouter.get('/', (req: Request, res: Response) => {
    const data = repo.getAll();
    const message = `La liste des ${data.length} pokemons a bien été trouvée`;
    res.json(success(message, data))
})

myRouter.post('/', (req: Request, res: Response) => {
    const id = 123;
    const pokemonData = { ...req.body, ...{ id: id, created: new Date() } }
    const pokemonCreated = repo.add(pokemonData);
    const message = `Le pokemon ${pokemonCreated.name} a bien été crée`;
    res.json(success(message, pokemonCreated))
})

myRouter.put('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const pokemonData = { ...req.body, id: id }
    const pokemonUpdated = repo.modify(id, pokemonData);
    const message = `Le pokemon ${pokemonUpdated.name} a bien été modifié`;
    res.json(success(message, pokemonUpdated))
})

myRouter.delete('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const pokemonDeleted = repo.remove(id);
    const message = `Le pokemon ${pokemonDeleted.name} a bien été supprimé`;
    res.json(success(message, pokemonDeleted))
})

