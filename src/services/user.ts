import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma"

export const createUser = async (data: Prisma.UserCreateInput) => {
    const result = await prisma.user.upsert({
        where: {
            email: data.email
        },
        update: { // Se eu deixo o update vazio ele só retorna o usuário selecionado no main
            // role: 'ADMIN'
        },
        create: data
    });
    return result;
    // try {
    //     return await prisma.user.create({ data });
    // } catch (error) {
    //     return false;
    // }
}

export const createUsers = async (users: Prisma.UserCreateInput[]) => {
    try {
        return await prisma.user.createMany({
            // No cliente ele ja retorna o count:X pela propria propriedade do createMany
            data: users,
            // Identifica os campos unique duplicados - 'pula' os duplicados
            skipDuplicates: true
        });
    } catch (error) {
        return false;
    }
}
export const getAllUsers = async () => {
    let page = 0;

    let skip = page * 2;

    const users = await prisma.user.findMany({
        orderBy: [
            { name: 'asc' },
            { id: 'desc' }
        ]
    });
    return users;
}

export const getAllUsersByPage = async () => {
    let page = 0;

    let skip = page * 2;

    const users = await prisma.user.findMany({
        skip: skip,
        take: 2
    });
    return users;
}

export const getByStartsWith = async () => {
    const users = await prisma.user.findMany({
        where: {
            name: {
                // Case insensitive
                startsWith: 's'
            }
        },
        select: {
            id: true,
            name: true,
            email: true,
            status: true
        }
    });
    return users;
}

export const getByEndsWith = async () => {
    const users = await prisma.user.findMany({
        where: {
            name: {
                endsWith: 'o'
            }
        },
        select: {
            id: true,
            name: true,
            email: true,
            status: true
        }
    });
    return users;
}

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        // findFirst encontra a primeira das propriedades que eu citar
        // findUnique encontra o registro @unique que eu pedir (+Performance)
        where: { email },
        select: {
            id: true,
            name: true
        }
    });
    return user;
}

export const listByEmail = async (email: string) => {
    const user = await prisma.user.findMany({
        where: {
            OR: [
                {
                    email: {
                        endsWith: '@hotmail.com'
                    }
                },
                {
                    email: {
                        endsWith: '@email.com'
                    }
                }
            ]
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    });
    return user;
}

export const getUserByName = async (name: string) => {
    const user = await prisma.user.findFirst({
        where: { name },
        select: {
            id: true,
            name: true,
            email: true
        }
    });
    return user;
}


export const getByPost = async () => {
    const users = await prisma.user.findMany({
        where: {
            Post: {
                some: {
                    title: {
                        startsWith: 'Titulo'
                    }
                }
            }
        },
        select: {
            id: true,
            name: true,
            email: true,
            status: true
        }
    });
    return users;
}


export const getWithNone = async () => {
    const users = await prisma.user.findMany({
        where: {
            Post: {
                // Que tenha pelo menos 1 post...
                some: {

                },
                // Que nenhum desses posts tenha o título começado com Rodapé
                none: {
                    title: {
                        startsWith: 'Rodapé'
                    }
                }
            }
        },
        select: {
            id: true,
            name: true,
            email: true,
            status: true
        }
    });
    return users;
}

export const updateUser = async () => {
    const updatedUser = await prisma.user.update({
        where: {
            email: 'sicrano@email.com'
        },
        data: {
            role: 'ADMIN'
        }
    });
    return updatedUser;
}

export const updateUsers = async () => {
    const updateUsers = await prisma.user.updateMany({
        where: {
            email: {
                endsWith: '@hotmail.com'
            }
        },
        data: {
            status: false
        }
    });
    return updateUsers;
}

// Deleta vários usuários de acordo com o WHERE
export const deleteUsers = async () => {
    const deleteUsers = await prisma.user.deleteMany({
        where: {
            email: {
                endsWith: '@hotmail.com'
            }
        }
    });
    return deleteUsers;
}


export const deleteUser = async () => {
    const deleteUser = await prisma.user.delete({
        where: {
            email: 'josedascouves@email.com'
        }
    });
    return deleteUser;
}