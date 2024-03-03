
import { FollowRepository } from './../repositories/follow.repository';
import { formateData } from '../utils/form-data';

export class FollowService {
    constructor(
        private followRepository :FollowRepository,
    ){}

    async follow (followedId :number, followingId:number){
        const exist = await this.followRepository.getFollow(followedId, followingId)
        if (!exist){
            return formateData(false, 401, 'no follow exist', null)

        }

        const follow = await this.followRepository.createFollow(followedId, followingId)
        if (!follow){
            return formateData(false, 401, 'follow failed', null)
        }
        return formateData(true, 200, 'follow success', follow)
    }

    async unFollow(followedId: number, followingId: number){
        const exist = await this.followRepository.getFollow(followedId, followingId)
        if (!exist){
            return formateData(false, 401, 'no follow exist', null)

        }

        const unFollow = await this.followRepository.deleteFollow(followedId, followingId)
        if(!unFollow){
            return formateData(false, 400, 'unfollow false', null)
        }

        return formateData(true, 200, 'unfollow success', null)
    }

    async getFollowers(userId: number){
        const follower = await this.followRepository.getFollowers(userId)
        if (!follower){
            return formateData(false, 401, 'user not found', null)
        }
        return formateData(true, 200, 'get followers success', follower)
    }
    async getFollowing(userId: number){
        const following = await this.followRepository.getFollowing(userId)
        if (!following){
            return formateData(false, 401, 'user not found', null)
        }
        return formateData(true, 200, 'get following success', following)

    }
}