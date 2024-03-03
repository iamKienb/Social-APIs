import jwt from 'jsonwebtoken'; 
import config from '../config';

export const generateToken = async(payload: {id: number ; email: string}, key:string) =>{
    
    const token =  await jwt.sign(payload,key , {
        algorithm: 'HS256',
        noTimestamp: true,
        expiresIn: key === config.jwt.accessKey ? "1h" : "7d",
    })
    return token
}


export const validateToken = async(token:string, key:string) =>{
    const payload = await jwt.verify(token , key) as {
        id: number,
        email:string
    }
    return payload

}