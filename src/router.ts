import { Router, Request, Response } from 'express';
import * as repo from "./repository";

export const myRouter = Router();


myRouter.get('/', (req: Request, res: Response) => {
    repo.getAll()
        .then(pokemons => {
            const message = `La liste des ${pokemons.length} pokemons a bien été trouvée`;
            res.json({ message, data: pokemons })
        })
        .catch(error => {
            const message = "La liste des pokemons n'a pas pu être récupérée. Réessayez dans quelques instants.";
            res.status(500).json({ message, data: error })
        })
})

myRouter.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    repo.getById(id)
        .then(pokemon => {
            if (pokemon === null) {
                const message = "Le pokemon demandé n'existe pas. Réessayez avec un autre identifiant.";
                return res.status(404).json({ message })
            }
            const message = "Un pokemon a bien été trouvé";
            res.json({ message, data: pokemon })
        })
        .catch(error => {
            const message = "Le pokemon n'a pas pu être récupéré. Réessayez dans quelques instants.";
            res.status(500).json({ message, data: error })
        })
})


myRouter.post('/', (req: Request, res: Response) => {
    repo.add(req.body)
        .then((pokemonCreated) => {
            const message = `Le pokemon ${pokemonCreated.name} a bien été crée`;
            res.json({ message, data: pokemonCreated })
        })
        .catch(error => {
            const message = "Le pokemon n'a pas pu être ajouté. Réessayez dans quelques instants.";
            res.status(500).json({ message, data: error })
        })
})

myRouter.put('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    repo.modify(id, req.body)
        .then(_ => {
            repo.getById(id)
                .then((pokemonUpdated) => {
                    if (pokemonUpdated === null) {
                        const message = "Le pokemon demandé n'existe pas. Réessayez avec un autre identifiant.";
                        return res.status(404).json({ message })
                    }
                    const message = `Le pokemon ${pokemonUpdated.name} a bien été modifié`;
                    res.json({ message, data: pokemonUpdated })
                })
                .catch(error => {
                    const message = "Le pokemon n'a pas pu être modifié. Réessayez dans quelques instants.";
                    res.status(500).json({ message, data: error })
                })
        })
        .catch(error => {
            const message = "Le pokemon n'a pas pu être modifié. Réessayez dans quelques instants.";
            res.status(500).json({ message, data: error })
        })
})

myRouter.delete('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    repo.remove(id).then(pokemonDeleted => {
        const message = `Le pokemon ${pokemonDeleted.name} a bien été supprimé`;
        res.json({ message, data: pokemonDeleted })
    })
})

