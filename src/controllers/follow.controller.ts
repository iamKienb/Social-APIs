import HttpException from '../httpException';
import HttpResponse from '../httpReponse';
import { FollowRepository } from '../repositories/follow.repository';

import { FollowService } from './../services/follow.service';
import { Request, Response, NextFunction } from 'express';

const followService = new FollowService(new FollowRepository())


const follow =  async(req:Request, res:Response, next:NextFunction) => {
    try{

        const {followedId} = req.params
        const followingId = req.userId
    
        const{data, message, statusCode, isSuccess} = await followService.follow(parseInt(followedId), followingId)
        if(!isSuccess) {
            throw new HttpException(statusCode, message)
        }
        return res.status(statusCode).json(new HttpResponse(statusCode, message, data))
    }catch(e){
        next(e);
    }
}

const unFollow = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {followedId} = req.params
        const followingId  = req.userId
        const{data, message, statusCode, isSuccess} = await followService.unFollow(parseInt(followedId), followingId)
        if(!isSuccess) {
            throw new HttpException(statusCode, message)
        }
        return res.status(statusCode).json(new HttpResponse(statusCode, message, data))

    }catch(e){
        next(e);
    }
}

const getFollowers = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {followedId} = req.params
        const{data, message, statusCode, isSuccess} = await followService.getFollowers(parseInt(followedId))
        if(!isSuccess) {
            throw new HttpException(statusCode, message)
        }
        return res.status(statusCode).json(new HttpResponse(statusCode, message, data))

    }catch(e){
        next(e);
    }
}

const getFollowing = async (req: Request, res: Response, next: NextFunction) => {
    try{
        
        const followingId = req.userId
        const{data, message, statusCode, isSuccess} = await followService.getFollowers(followingId)
        if(!isSuccess) {
            throw new HttpException(statusCode, message)
        }
        return res.status(statusCode).json(new HttpResponse(statusCode, message, data))

    }catch(e){
        next(e);
    }
}


export {

    follow , unFollow , getFollowers , getFollowing 
}
