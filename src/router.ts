import { Router, Request, Response } from 'express';
import * as repo from "./repository";
import { success } from "./helper";

export const myRouter = Router();


myRouter.get('/', (req: Request, res: Response) => {
    repo.getAll()
        .then(pokemons => {
            const message = `La liste des ${pokemons.length} pokemons a bien été trouvée`;
            res.json(success(message, pokemons))
        })
})

myRouter.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    repo.getById(id)
        .then(pokemon => {
            const message = "Un pokemon a bien été trouvé";
            res.json(success(message, pokemon))
        })
})


myRouter.post('/', (req: Request, res: Response) => {
    repo.add(req.body)
        .then((pokemonCreated) => {
            const message = `Le pokemon ${pokemonCreated.name} a bien été crée`;
            res.json(success(message, pokemonCreated))
        })
})

myRouter.put('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    repo.modify(id, req.body)
        .then(_ => {
            repo.getById(id)
                .then((pokemonUpdated) => {
                    const message = `Le pokemon ${pokemonUpdated.name} a bien été modifié`;
                    res.json(success(message, pokemonUpdated))
                })
        })
})

myRouter.delete('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    repo.remove(id).then(pokemonDeleted => {
        const message = `Le pokemon ${pokemonDeleted.name} a bien été supprimé`;
        res.json(success(message, pokemonDeleted))
    })
})

