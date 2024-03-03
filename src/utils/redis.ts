import { Redis } from "ioredis";
const getRedisUrl = () =>{
    if(process.env.REDIS_URL){
        return process.env.REDIS_URL
    }
    throw new Error('NOT DEFINE')
}
export const Ioredis = new Redis(getRedisUrl())