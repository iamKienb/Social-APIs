import express from 'express'
import { followSchema } from '../dtos/follow.dto'
import {validationResource} from '../middlewares/validationResource'
import { follow, getFollowers, getFollowing, unFollow } from '../controllers/follow.controller'
const followRoute = express.Router()

followRoute.post('/:followedId', validationResource(followSchema), follow)
followRoute.delete('/:followedId', validationResource(followSchema), unFollow)
followRoute.get('/:followedId', validationResource(followSchema), getFollowers)
followRoute.get('/', validationResource(followSchema),getFollowing)

export = followRoute