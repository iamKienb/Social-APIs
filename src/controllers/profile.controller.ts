import { ProfileService } from './../services/profile.service';
import { NextFunction , Request, Response} from "express"
import { UserRepository } from "../repositories/user.repository"

import HttpException from "../httpException"

import HttpResponse from "../httpReponse"
import { UpdateProfileDto } from "../dtos/profile.dto"



const profileService = new ProfileService(new UserRepository())
const getProfile = async (req: Request, res:Response, next: NextFunction) => {
    try{
        const {id} = req.params
        const {data , isSuccess, message, statusCode}  = await profileService.getProfile(+id)
        if(!isSuccess){
            throw new HttpException(statusCode, message)
        }
    
        return res.status(statusCode).json(new HttpResponse( statusCode, message, data))
    }catch(e){
        next(e)
    }

}

const getAllProfile =  async(req:Request, res:Response, next:NextFunction) =>{
    try{
        const {data , isSuccess, message, statusCode}  = await profileService.getAllProfile()
        if(!isSuccess){
            throw new HttpException(statusCode, message)
        }
    
        return res.status(statusCode).json(new HttpResponse( statusCode, message, data))
    }catch(e){
        next(e) 
    }
    




}
const updateProfile = async(req:Request, res:Response, next:NextFunction) =>{
    try{
        const {id} = req.params
    const updateUser = <UpdateProfileDto['body']>req.body
    const {data, isSuccess, message, statusCode} = await profileService.updateProfile(+id, updateUser)
    if(!isSuccess){
        throw new HttpException(statusCode, message)
    }
    return res.status(statusCode).json(new HttpResponse(statusCode, message, data))
    }catch(e){
        next(e) 
    }


}


const removeProfile = async(req:Request, res:Response, next:NextFunction) =>{
    try{
        const {id} = req.params
        const {data, isSuccess, message, statusCode} = await profileService.removeProfile(+id)
        if(!isSuccess){
            throw new HttpException(statusCode, message)
        }
        return res.status(statusCode).json(new HttpResponse(statusCode, message, data))
        

    }catch(e){
        next(e) 
    }

}

export {
    getProfile, getAllProfile, updateProfile, removeProfile
}