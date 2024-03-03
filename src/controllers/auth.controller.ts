
import { NextFunction, Request, Response } from "express"
import { loginDto, registerDto, resetPasswordDto } from "../dtos/auth.dto"
import { AuthService } from "../services/auth.service"
import { UserRepository } from "../repositories/user.repository"
import { UserTypes } from "../custom-type"

const authService  =  new AuthService(new UserRepository())
const registerUser = async (req:Request , res: Response, next: NextFunction) =>{
    try{
        const body =  <registerDto>req.body
        const { passwordConfirmation, ...other } = body
       
        const {data, message, statusCode, isSuccess} = await authService.registerUser({
            ...other,
            dateOfBirth: new Date(body.dateOfBirth),
            type: UserTypes.USER

        })
        
        return res.status(201).json(data)
    }catch(err){
        next(err);
    }

}

const loginUser = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const body = <loginDto>req.body
        const {data, message, statusCode, isSuccess} = await authService.login({...body})
     
        res.cookie("_auth_token", data.refresh_Token,{
            httpOnly: true,
        })

        return res.status(201).json(data.access_token)
    }catch(err){
        next(err);
    }
}

const refreshToken = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const token = <string>req.cookies["_auth_token"]
        if(!token){
            return res.status(404).json('authorization')
        }
        const {data, message, statusCode, isSuccess} = await authService.getNewToken(token)
    
        return res.status(200).json(data.access_token)
    }catch(err){
        next(err);
    }

}

const forgotPassword = async (req:Request, res:Response, next:NextFunction) =>{

    try{
        const {id} = <resetPasswordDto["params"]>req.params
        const {password} = <resetPasswordDto["body"]>req.body
        const {data, message, statusCode, isSuccess} = await authService.updatePassword(+id, password)
        return res.status(200).json({message, data})
    }catch(err){
        next(err)
    }

}

export {
    registerUser, loginUser, refreshToken, forgotPassword
}