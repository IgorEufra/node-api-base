// Retirada da documentação:
// https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma