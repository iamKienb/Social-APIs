import { CreatePostInput, UpdatePostInput } from '../custom-type';
import { CommentRepository } from '../repositories/comment.repository';
import { LikeRepository } from '../repositories/like.repository';
import { SharePostRepository } from '../repositories/share.repository';
import { formateData } from '../utils/form-data';
import { PostRepository } from './../repositories/post.repository';
import { RedisCompose } from './redis.service';
export class FeedService{
    constructor(
        private readonly postRepository: PostRepository,
        private readonly commentRepository: CommentRepository,
        private readonly likeRepository: LikeRepository,
        private readonly sharePostRepository: SharePostRepository,
    ){}


    async getPost(id:number){
        const cache = await RedisCompose.getData(`posts:${id}`);
        if(cache.data){
            return formateData(true, 200, "Fetch post success", cache.data);

        }else{
            const post = await this.postRepository.getPost(id)
            if(!post){
                return formateData(false, 404, 'get post failed', null);
            }
            await RedisCompose.setData(`posts:${id}`, 3600, post);
            return formateData(true, 200, "Fetch post success", post);
        }

    }

    async getAllPost(){

        const cache = await RedisCompose.getData('posts')
        if(cache.data){
            return formateData(true, 200, "Fetch post success", cache.data);
        }

        const post = await this.postRepository.getAllPost()
        if(!post){
            return formateData(false, 404, 'get all post failed', null);
        }
        await RedisCompose.setData('posts', 3600, post);
        return formateData(true, 200, "Fetch post success", post);
    }
    
    async createPost(input:CreatePostInput){
        const post = await this.postRepository.createPost(input)
        if(!post){
            return formateData(false, 404, 'create post failed', null);
        }
        const posts = await this.postRepository.getAllPost();
        await RedisCompose.setData('posts', 3600, posts);  
        return formateData(true, 200, 'post created successfully', post)
    }


    async updatePost(id: number, input:UpdatePostInput){
        const post = await this.postRepository.getPost(id)
        if(!post){
            return formateData(false, 404, 'post not found', null);
        }
        const updatePost = await this.postRepository.updatePost(id, input)
        if(!updatePost){
            return formateData(false, 404, 'update post failed', null);
        }

        return formateData(true, 200, 'post updated successfully', updatePost)
    }

    async deletePost(id:number){
        const post = await this.postRepository.getPost(id)
        if(!post){
            return formateData(false, 404, 'post not found', null);
        }
        const deletePost = await this.postRepository.deletePost(id)
        if(!deletePost){
            return formateData(false, 404, 'delete post failed', null);
        }

        return formateData(true, 200,'delete post successfully', deletePost)
    }

    async createComment(userId:number, postId:number, content:string){
        const createComment = await this.commentRepository.createComment(userId, postId, content)
        if(!createComment){
            return formateData(false, 404, 'create comment failed', null);
        }
        return formateData(true, 200,'create comment successfully', createComment)
    }

    async getComment(id:number){
        const getComment = await this.commentRepository.getComment(id)
        if(!getComment){
            return formateData(false, 404, 'get comment failed', null);
        }
    }

    async getAllComment(){
        const getAllComment = await this.commentRepository.getAllComment()
        if(!getAllComment){
            return formateData(false, 404, 'get all comment failed', null)
        }
        formateData(true, 200 , 'get all comment successfully', getAllComment)
    }

    async deleteComment(id:number, userId:number){
        const comment = await this.commentRepository.getComment(id)
        if(!comment){
            return formateData(false, 404, 'Action like is forbidden', null);
        }
        console.log(comment.userId)
        console.log(userId)
        if(comment.userId !== userId){
            return formateData(false, 401, "Unauthorized", null);
        }
        const data  = await this.commentRepository.deleteComment(id)
        return formateData(true,200, 'delete comment successfully', data)
   
    }

    async likePost(userId:number, postId: number){
        const exit = await this.likeRepository.getLike(userId, postId)
        if(!exit){
            return formateData(false, 404, 'Action like is forbidden', null);
        }

        const like = await this.likeRepository.likePost(userId, postId)
        return formateData(true,200, 'like post successfully', like)
    }

    async disLikePost(userId:number, postId:number){
        const exit = await this.likeRepository.getLike(userId, postId)
        if(!exit){
            return formateData(false, 404, 'Action like is forbidden', null);
        }

        const disLike = await this.likeRepository.unlikePost(userId, postId)
        return formateData(true, 200, 'dislike post success', disLike);

    }

    async sharePost(userId:number, postId:number){
        const exit = this.sharePostRepository.getSharePost(userId, postId)
        if(!exit){
            return formateData(false, 404, 'Action like is forbidden', null);
        }
        const createSharePost = await this.sharePostRepository.createSharePost(userId, postId)

        if(!createSharePost){
            return formateData(false, 404, 'share post false', null);
        }

        return formateData(true, 200, 'Share post successfully ', createSharePost);
    }

    async unSharePost(userId:number, postId:number){
        const exit = this.sharePostRepository.getSharePost(userId, postId)
        if(!exit){
            return formateData(false, 404, 'Action like is forbidden', null);
        }

        const unShare = await this.sharePostRepository.deleteSharePost(userId, postId)
        return formateData(true, 200, ' unshare post successfully ', unShare);
    }


    


    

}