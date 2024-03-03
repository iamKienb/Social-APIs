import { UserLoginInput, UpdateUserInput } from './../custom-type/index';
import { UserRepository } from './../repositories/user.repository';

import { CreateUserInput, FormateData } from "../custom-type";
import { formateData } from '../utils/form-data';
import { hashPassword, validatePassword } from '../utils/password';

import { generateToken, validateToken } from '../utils/auth-token';
import config from '../config';



export class AuthService {
    constructor(private userRepository: UserRepository){
        userRepository = new UserRepository();
    }

    async registerUser(input: CreateUserInput):Promise<FormateData> {
        
        const existedUser = await this.userRepository.findUserByEmail(input.email)
        if(existedUser){
            return formateData(
                false,
                409,
                "Email has already been registered",
                null
            )
        }
        input.password = await hashPassword(input.password)
        const user = await this.userRepository.createUser(input)
        return formateData(
            true,
            200,
            "successfully",
            user
   
        )    
    
    }

    async login(input: UserLoginInput):Promise<FormateData> {
        const user = await this.userRepository.findUserByEmail(input.email)
        if(!user){
            return formateData(false, 404, "email or password incorrect", null)
        }

        const checkPassword = await validatePassword(input.password, user.password)
        if(!checkPassword){
            return formateData(false, 404, "email or password incorrect", null)

        }
        
        const accessToken = await generateToken({id: user.id, email: user.email}, config.jwt.accessKey)
  
        const refreshToken = await generateToken({id: user.id, email: user.email}, config.jwt.refreshKey)

        return formateData(true, 200, "User login successful", {
            access_token: accessToken,
            refresh_Token: refreshToken
        })
    }

    async getNewToken(refreshToken:string ):Promise<FormateData>{
        const token = await validateToken(refreshToken, config.jwt.refreshKey)
        const newAccessToken = await generateToken({id: token.id, email: token.email}, config.jwt.accessKey)

        return formateData(true, 200, 'refresh token successfully', {
            access_token: newAccessToken
        })

    }

    async updatePassword(id:number , password:string):Promise<FormateData>{
        const user = await this.userRepository.findUserById(id)
        if(!user){
            return formateData(false, 401, 'user not found', null)
        }

        const newPassword =  await hashPassword(password)
        const result = await this.userRepository.updateUser(user.id, {password: newPassword})   
        return formateData(true, 200, 'reset password successfully', result)
    }

}
