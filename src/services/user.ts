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