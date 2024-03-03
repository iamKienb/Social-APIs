import { PrismaClient } from "@prisma/client"
import { NextFunction,Request ,Response } from "express";
import HttpResponse from "../httpReponse";
import { validateToken } from "../utils/auth-token";
import config from '../config';
const prisma = new PrismaClient()

 const authenticationToken = async(req: Request, res:Response, next:NextFunction) =>{
    const authHeader = req.headers['authorization']
    if(!authHeader){
        return res.status(401).json(new HttpResponse(401,"authorized", null))
    }
    const token = authHeader.split(" ")[1]
    try{
        const payload = await validateToken(token, config.jwt.accessKey) as{
            id: number,
            email: string
        }
        const userToken = await prisma.user.findUnique({
            where:{ id: payload.id},

        })

        if(!userToken){
            return res.status(401).json({error: 'API TOKEN EXPIRED'})
        }
        
        req.userId = userToken.id
    }catch(e){
        return res.sendStatus(401)
    }
    next()

}

export = authenticationToken