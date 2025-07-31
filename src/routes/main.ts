import { Router } from 'express';
import { createUser, createUsers } from '../services/user';


export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.post('/user', async (req, res) => {
    // Validar os dados recebidos:

    const user = await createUser({
        name: 'Teste 2',
        email: 'teste2@email.com',
        Post: {
            create: {
                title: 'Título de teste do testador 2',
                body: 'Corpo de teste'
            }
        }
    });
    if (user) {
        res.status(201).json({ user });
    } else {
        res.status(500).json({ error: `Ocorreu um erro` })
    }
})

mainRouter.post ("/users", async (req, res) => {
    const result = await createUsers([
            { name: 'José das Couves', email: 'josedascouves@email.com' },
            { name: 'Fulano', email: 'fulano@email.com' },
            { name: 'Sicrano', email: 'sicrano@email.com' }
        ]);
    res.json({ result });
})