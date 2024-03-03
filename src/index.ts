import express, { Express, Request } from 'express';
import { expressApp } from './express-app';
import dotenv from 'dotenv';
import config from './config'
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

const PORT = +config.port
dotenv.config()
const startApp = async (app: Express) => {
    try{
        expressApp(app)
        await prisma.$connect()
        app.listen(PORT, ()=>{
            console.log(`listening on port http://localhost:${PORT}`);
        })

    }catch(err){
        console.error(err)
        await prisma.$disconnect()
        process.exit()
    }
}

startApp(express())
