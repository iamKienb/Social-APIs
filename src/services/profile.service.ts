import { UpdateUserInput } from '../custom-type';
import { formateData } from '../utils/form-data';
import { UserRepository } from './../repositories/user.repository';
export class ProfileService{
    constructor(private userRepository: UserRepository){
    }
    
    async getProfile(id:number){
       const userProfile =  await this.userRepository.findUserById(id)
       if(!userProfile){
        return formateData(false , 404 , 'User not found' , null)
       }
       return formateData(true, 200, 'get profile user success', {...userProfile, dateOfBirth: userProfile.dateOfBirth.toLocaleDateString(),})

    }

    async getAllProfile(){
        const userProfile = await this.userRepository.findAllUser()
        if(!userProfile){
            return formateData(false , 404 , 'User not found' , null)
        }
        return formateData(true, 200, 'get all user success', userProfile)
    }

    async updateProfile(id:number, input:UpdateUserInput){
        const userProfile = await this.userRepository.findUserById(id)
        if(!userProfile){
            return formateData(false , 404 , 'User not found' , null)
        }
        const updateUser = await this.userRepository.updateUser(id, input)
        return formateData(true, 200, "Get Profile success", updateUser);

    }

    async removeProfile(id: number){
        const userProfile = await this.userRepository.findUserById(id)
        if(!userProfile){
            return formateData(false , 404 , 'User not found' , null)
        }
        const removeUser =  await this.userRepository.removeUser(id)
        return formateData(true, 200, "delete user success", removeUser);
    }
}