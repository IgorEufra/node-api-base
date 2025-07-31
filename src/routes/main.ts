import { Router } from 'express';
import { createUser } from '../services/user';


export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.post('/user', async (req, res) => {
    // Validar os dados recebidos:

    const user = await createUser({
        name: 'Teste 1',
        email: 'teste1@email.com'
    });
    if (user) {
        res.status(201).json({ user });
    } else {
        res.status(500).json({ error: `Ocorreu um erro` })
    }
})