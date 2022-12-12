import { PrismaClient } from '@prisma/client'
import express from 'express';

const prisma = new PrismaClient()
const app = express()
// A `main` function so that you can use async/await
async function main() {

}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
