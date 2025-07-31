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
    const result = await prisma.user.createMany({
        data: [
            {name: 'José das Couves', email: 'josedascouves@email.com' },
            { name: 'Fulano', email: 'fulano@email.com' },
            { name: 'Sicrano', email: 'sicrano@email.com' }
        ],
        // Identifica os campos unique duplicados - 'pula' os duplicados
        skipDuplicates: true
    });
}