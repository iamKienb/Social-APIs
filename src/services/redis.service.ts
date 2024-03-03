import { formateData } from './../utils/form-data';
import { Ioredis } from '../utils/redis';
import { FormateData } from '../custom-type';
export class RedisCompose {
    static async getKey(pattern: string){
        return await Ioredis.keys(pattern)
    }
    static async setData(key:string, expiration:number, data:any){
        return Ioredis.setex(key, expiration, JSON.stringify(data))
        .then((res)=>{
            console.log('set Data in Ioredis successfully')
            return res
        })
        .catch((error) =>{  
            console.log(error)
            
        })
    }

    static async getData(key:string): Promise<FormateData>{
        const result = Ioredis.get(key)
        .then((data)=>{
            if(data===null){
                return formateData(false,400, 'data not found', null)
            }
            console.log('get data successfully')
            return formateData(true, 200, 'get data successfully', JSON.parse(data)) 
        })
        .catch((error) =>{
            return formateData(false,400, 'data not found', error)
        })
        return result
    }

    static async deleteData(key:string){
        return Ioredis.del(key)
        .then((data) =>{
            console.log('delete data from Ioredis successfully')
            return data
        })
        .catch((error) =>{
            console.log(error)
        })
    }

}