import {prisma} from '../index'

export class LikeRepository{
    constructor(){}
    async likePost(userId:number , postId:number){
        if(!userId || !postId){
            return null;
        }
        return await prisma.like.create({data:{userId, postId}})

    }

    async getLike(userId:number, postId:number){
        if(!userId || !postId){
            return null;
        }
        return await prisma.like.findUnique({
            where:{
                userId_postId:{
                    userId,
                    postId
                }
               }
        })
    }

    async getAllLike(){
        return await prisma.like.findMany()
    }
    async unlikePost(userId:number , postId:number){
        if(!userId || !postId){
            return null;
        }
        return await prisma.like.delete({
            where: {
                userId_postId: {
                    userId,
                    postId
                }, 
            }
        })
    }
}