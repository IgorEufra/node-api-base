import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma"

export const createUser = async (data: Prisma.UserCreateInput) => {
    try {
        return await prisma.user.create({ data });
    } catch (error) {
        return false;
    }
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
    const users =  await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            status:true
        }
    });
    return users;
}

export const getByStartsWith = async () => {
    const users =  await prisma.user.findMany({
        where:{
            name: {
                // É case insensitive (tanto faz se maiúscula ou minúscula)
                startsWith: 's'
            }
        },
        select: {
            id: true,
            name: true,
            email: true,
            status:true
        }
    });
    return users;
}

export const getByEndsWith = async () => {
    const users =  await prisma.user.findMany({
        where:{
            name: {
                // É case insensitive (tanto faz se maiúscula ou minúscula)
                endsWith: 'o'
            }
        },
        select: {
            id: true,
            name: true,
            email: true,
            status:true
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
            id:true,
            name:true
        }
    });
    return user;
}

export const getUserByName = async (name: string) => {
    const user = await prisma.user.findFirst ({
        where: { name },
        select: { 
            id:true,
            name:true,
            email:true
        }
    });
    return user;
}