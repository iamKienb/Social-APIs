import express from 'express';
import { validationResource } from '../middlewares/validationResource';
import { commentPost, createPost ,deleteComment,getAllPost, getPost, likePost, sharePost, unLikePost, unSharePost, updatePost} from '../controllers/feed.controller';
import { createPostSchema, updatePostSchema } from '../dtos/post.dto';
import { likeSchema } from '../dtos/like.dto';
import { shareSchema } from '../dtos/share.dto';
import { deleteCommentSchema } from '../dtos/comment.dto';
const feedRoute = express.Router();

feedRoute.get('/:id', getPost);
feedRoute.get('/',  getAllPost);
feedRoute.post('/', validationResource(createPostSchema) , createPost);
feedRoute.put('/:id', validationResource(updatePostSchema), updatePost);
feedRoute.post('/:postId/like',validationResource(likeSchema) ,likePost)
feedRoute.delete('/:postId/dislike',validationResource(likeSchema) ,unLikePost);
feedRoute.post('/:postId/share', validationResource(shareSchema) ,sharePost);
feedRoute.delete('/:postId/share', validationResource(shareSchema) ,unSharePost);
feedRoute.post('/:postId/comment', validationResource(createPostSchema) , commentPost)
feedRoute.delete('/delete-comment/commentId',validationResource(deleteCommentSchema), deleteComment)



export default feedRoute