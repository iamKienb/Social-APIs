

import { CreateUserInput, UserQuery, UpdateUserInput } from "../custom-type";
import { prisma } from "../index";

export class UserRepository{
    constructor() {}

    async createUser(data:CreateUserInput){
        return await prisma.user.create({
            data: {
                ...data,
                type: "USER",
                otp: Math.floor(Math.random() * 900000) + 100000
            },
            select: {
                id: true,
                email: true,
                name: true,
                gender:true,
                dateOfBirth:true,
                phone: true,
                createdAt:true
            }
        })
    }
    async findUserByEmail(email:string){
        return await prisma.user.findFirst({
            where: {email},
            select:{
                id:true,
                email:true,
                name:true,
                password:true,
                gender:true,
                dateOfBirth:true,
                phone:true,
                otp:true,
                createdAt:true

            }
            
        })
    }

    async updateUser(id: number, data: UpdateUserInput) {
        if (!id) {
          return null;
        }
        return await prisma.user.update({
          where: { id },
          data: {
            ...data,
            updatedAt: new Date(Date.now()),
          },
          select: {
            id: true,
            email: true,
            name: true,
            type: true,
            gender: true,
            dateOfBirth: true,
            avatar: true,
            avatarPublicId: true,
            phone: true,
            createdAt: true,
          },
        });
      }
    
      async removeUser(id: number) {
        if (!id) {
          return null;
        }
        return await prisma.user.delete({ where: { id } });
      }


      async findAllUser() {
        return await prisma.user.findMany({
          select: {
            id: true,
            email: true,
            name: true,
            type: true,
            gender: true,
            dateOfBirth: true,
            phone: true,
            createdAt: true,
          },
        });
      }
    
      async findUserByQuery(query: UserQuery) {
        return await prisma.user.findMany({
          where: query,
          select: {
            id: true,
            email: true,
            name: true,
            type: true,
            gender: true,
            dateOfBirth: true,
            phone: true,
            createdAt: true,
          },
        });
      }
    
    
      async findUserById(id: number) {
        if (!id) {
          return null;
        }
        return await prisma.user.findUnique({
          where: { id },
          select: {
            _count: true,
            id: true,
            email: true,
            name: true,
            type: true,
            gender: true,
            dateOfBirth: true,
            avatar: true,
            avatarPublicId: true,
            phone: true,
            createdAt: true,
            followedBy: {
              select: {
                following: {
                  select: {
                    _count: true,
                    id: true,
                    name: true,
                  },
                },
              },
            },
            following: {
              select: {
                following: {
                  select: {
                    _count: true,
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        });
      }
    
    
}