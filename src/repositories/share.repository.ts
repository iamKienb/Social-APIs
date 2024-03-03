import { prisma } from "../index"

export class SharePostRepository {
    constructor (){}
    async createSharePost(userId:number, postId:number){
        if(!userId || !postId){
            return null;
        }
        return await prisma.sharedPost.create({
            data:{
                userId,
                postId
            }
        })
    }   

    async deleteSharePost(userId:number, postId:number){
        if(!userId || !postId){
            return null;
        }
        return await prisma.sharedPost.delete({
            where:{
                userId_postId:{
                    userId,
                    postId
                }
            }
        })
    }

    async getSharePost(userId:number, postId:number){
        if(!userId || !postId){
            return null;
        }
        return await prisma.sharedPost.findUnique({
            where:{
                userId_postId:{
                    userId,
                    postId
                }
            }
        })
    }

    async getAllSharePost(){
        return await prisma.sharedPost.findMany()
    }

    async getUserSharePost(postId:number){
        if(!postId){
            return null;
        }
        return await prisma.sharedPost.findMany({
            where: {postId},
            select:{
                user:{
                    select:{
                        _count:true,
                        id:true,
                        name:true,
                    }
                }
            }

        })
    }

    async getPostUserShare(userId:number){
        if(!userId){
            return null;
        }
        return await prisma.sharedPost.findMany({
            where: {userId},
            select:{
                post:{
                    select:{
                        _count:true,
                        id:true,
                    }
                }
            }
        })
    }
}