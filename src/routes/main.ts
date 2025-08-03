import { Router } from 'express';
import { createUser, createUsers, deleteUser, deleteUsers, getAllUsers, getAllUsersByPage, getByEndsWith, getByPost, getByStartsWith, getUserByEmail, getUserByName, getWithNone, listByEmail, updateUser, updateUsers } from '../services/user';


export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.post('/user', async (req, res) => {
    // Validar os dados recebidos:

    const user = await createUser({
        name: 'Teste 2',
        email: 'teste2@email.com',
        // Post: {
        //     create: {
        //         title: 'Título de teste do testador 2',
        //         body: 'Corpo de teste'
        //     }
        // }
    });
    if (user) {
        res.status(201).json({ user });
    } else {
        res.status(500).json({ error: `Ocorreu um erro` })
    }
})

mainRouter.post("/users", async (req, res) => {
    const result = await createUsers([
        { name: 'José das Couves', email: 'josedascouves@email.com' },
        { name: 'Fulano', email: 'fulano@email.com' },
        { name: 'Sicrano', email: 'sicrano@email.com' }
    ]);
    res.json({ result });
})

// Listando todos os usuários
mainRouter.get('/users', async (req, res) => {
    const result = await getAllUsers();
    res.json({ result });
})

// Listando todos os usuários por página
mainRouter.get("/pageUsers", async (req, res) => {
    const result = await getAllUsersByPage();
    res.json({ result });
})

// Listando usuários cujo nome comece com determinada letra
mainRouter.get("/startsWith", async (req, res) => {
    const result = await getByStartsWith();
    res.json({ result });
})

// 
// Listando todos os usuários cujo nome termine com determinada letra
mainRouter.get("/endsWith", async (req, res) => {
    const result = await getByEndsWith();
    res.json({ result });
})


// Listando usuário pelo email
mainRouter.get("/user", async (req, res) => {
    const result = await getUserByEmail('sicrano@email.com');
    res.json({ result })
})


// Listando todos os usuários que tenham determinado domínio de email
mainRouter.get("/listByEmail", async (req, res) => {
    const result = await listByEmail('@email.com');
    res.json({ result })
})


// Listando todos os usuários pelo nome
mainRouter.get("/name", async (req, res) => {
    const result = await getUserByName('Sicrano');
    res.json({ result })
})


// Listando todos os usuários pelos posts
mainRouter.get("/posts", async (req, res) => {
    const result = await getByPost();
    res.json({ result })
})


// Listando todos os usuários que ...
// tenham pelo menos 1 post e que não ...
// comece o título com a palavra rodapé
mainRouter.get("/withNone", async (req, res) => {
    const result = await getWithNone();
    res.json({ result })
})

// Atualizando um usuário
mainRouter.put('/user', async (req, res) => {
    const result = await updateUser();
    res.json({ result });
})

// Atualizando vários usuários
mainRouter.put('/users', async (req, res) => {
    const result = await updateUsers();
    res.json({ result });
})

// Deletando um usuário
mainRouter.delete('/user', async (req, res) => {
    const result = await deleteUser();
    res.json({ result });
})

// Deletando vários usuários
mainRouter.delete('/users', async (req, res) => {
    const result = await deleteUsers();
    res.json({ result });
})