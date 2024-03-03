
import { FeedService } from './../services/feed.service';
import { NextFunction, Request, Response } from 'express';
import { CreatePostDto, UpdatePostDto } from '../dtos/post.dto';
import { PostRepository } from '../repositories/post.repository';

import HttpException from '../httpException';
import HttpResponse from '../httpReponse';
import { CommentRepository } from '../repositories/comment.repository';
import { LikeRepository } from '../repositories/like.repository';
import { SharePostRepository } from '../repositories/share.repository';
import { CreateCommentDto } from '../dtos/comment.dto';
const feedService = new FeedService(new PostRepository(), new CommentRepository(), new LikeRepository(), new SharePostRepository());

const createPost = async(req:Request, res:Response, next:NextFunction) => {
    try{
        const body = <CreatePostDto['body']>req.body;
        const {published} = body
        const userId = req.userId
        const {data, message, statusCode, isSuccess} = await feedService.createPost({
            ...body,
            authorId: userId,
            published: JSON.parse(published),
        })
    
        if(!isSuccess) {
            throw new HttpException(statusCode, message)
        }
        return res.status(statusCode).json(new HttpResponse(statusCode, message, data))
    }catch(e){
        next(e);
    }
    

}

const getAllPost = async(req:Request, res:Response, next:NextFunction) => {
    try{
        const {data, message, statusCode, isSuccess} = await feedService.getAllPost()
        if(!isSuccess) {
            throw new HttpException(statusCode, message)
        }
        return res.status(statusCode).json(new HttpResponse(statusCode, message, data))
    }catch(e){
        next(e);
    }
}


const getPost = async(req:Request, res:Response, next:NextFunction) =>{
    try{
        const {id} = req.params
        const {data, message, statusCode, isSuccess} = await feedService.getPost(+id)
        if(!isSuccess) {
            throw new HttpException(statusCode, message)
        }
        return res.status(statusCode).json(new HttpResponse(statusCode, message, data))
    }catch(e){
        next(e);
    }
}

const updatePost = async(req:Request, res:Response, next:NextFunction) =>{
    try{
        const {id} = req.params
        const body = <UpdatePostDto['body']>req.body
        const {published} = body
        const {data, message, statusCode, isSuccess} = await feedService.updatePost(+id,{
    
            ...body,
            published: published ? JSON.parse(published) : undefined,
    
        })
        if( !isSuccess ){
            throw new HttpException(statusCode, message)
        }
        return res.status(statusCode).json(new HttpResponse(statusCode, message, data))
    }catch(e){
        next(e);
    }
}

const deletePost = async(req:Request, res:Response, next:NextFunction) =>{
    try{
        const {id} = req.params
        const { data, message, statusCode, isSuccess} = await feedService.deletePost(+id)
        if( !isSuccess ){
            throw new HttpException(statusCode, message)
        }
    
        return res.status(statusCode).json(new HttpResponse(statusCode, message, data))
    }catch(e){
        next(e);
    }
}

const likePost = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {postId} = req.params
        const userId = req.userId
        const {data, message, statusCode, isSuccess} = await feedService.likePost(userId, parseInt(postId))
        if( !isSuccess ){
            throw new HttpException(statusCode, message)
        }
        return res.status(statusCode).json(new HttpResponse(statusCode, message, data))

    }catch(e){
        next(e);
    }

}

const unLikePost = async (req:Request, res:Response, next:NextFunction) =>{
    try{

    }catch(e){
        next(e);
    }
    const {postId} = req.params
    const userId = req.userId
    const {data, message, statusCode, isSuccess} = await feedService.disLikePost(userId, parseInt(postId))
    if( !isSuccess ){
        throw new HttpException(statusCode, message)
    }
    return res.status(statusCode).json(new HttpResponse(statusCode, message, data))
}


const commentPost = async (req: Request, res:Response, next:NextFunction) => {
    try{

    }catch(e){
        next(e);
    }
    const {postId} = req.params
    const {content} = <CreateCommentDto['body']>req.body
    const userId = req.userId
    const {data, message, statusCode, isSuccess} = await feedService.createComment(userId, parseInt(postId),content)
    if( !isSuccess ){
        throw new HttpException(statusCode, message)
    }

    return res.status(statusCode).json(new HttpResponse(statusCode, message, data))
}

const deleteComment = async (req: Request, res:Response, next:NextFunction) =>{
    try{
        const {postId} = req.params
        const userId = req.userId 
        const {data, message, statusCode, isSuccess} = await feedService.deleteComment(userId, parseInt(postId))
        if( !isSuccess ){
            throw new HttpException(statusCode, message)
        }
        return res.status(statusCode).json(new HttpResponse(statusCode, message, data))
    }catch(e){
        next(e);
    }
}


const sharePost = async (req: Request, res:Response, next:NextFunction) =>{
    try{
        const {postId} = req.params
        const userId = req.userId
        const {data, message, statusCode, isSuccess} = await feedService.sharePost(userId, parseInt(postId))
        if( !isSuccess ){
            throw new HttpException(statusCode, message)
        }
        return res.status(statusCode).json(new HttpResponse(statusCode, message, data))
    }catch(e){
        next(e);
    }
}

const unSharePost = async (req: Request, res:Response, next:NextFunction) =>{
    try{
        const {postId} = req.params
        const userId = req.userId
        const {data, message, statusCode, isSuccess} = await feedService.unSharePost(userId, parseInt(postId))
        if( !isSuccess ){
            throw new HttpException(statusCode, message)
        }
        return res.status(statusCode).json(new HttpResponse(statusCode, message, data))
    }catch(e){
        next(e);
    }

}


export {
    createPost, getAllPost, getPost, updatePost, deletePost, likePost, unLikePost, commentPost, deleteComment, sharePost, unSharePost
}