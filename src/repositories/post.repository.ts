import { CreatePostInput, UpdatePostInput } from "../custom-type";
import { prisma } from "../index";

export class PostRepository {
  constructor() {}

  private select = {
    _count: true,
    id: true,
    content: true,
    image: true,
    imagePublicId: true,
    link: true,
    location: true,
    author: {
      select: {
        id: true,
        name: true,
      },
    },
    published: true,
    likes: {
      select: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    },
    comments: {
      select: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        content: true,
      },
    },
    shares: {
      select: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    },
    createdAt: true,
    updatedAt: true,
  };

  async createPost(input:CreatePostInput){
    return await prisma.post.create({
      data: input,
      select: this.select
    })
  }

  
  async updatePost(id:number, input:UpdatePostInput){
    if(!id){
      return null;
    }

    return await prisma.post.update({
      where: {id},
      data: {...input, updatedAt: new Date(Date.now()) },
      select: this.select
    })
  }

  async deletePost(id:number){
    if(!id){
      return null;
    }
    return await prisma.post.delete({
      where: {id},
      select: this.select,
    })
  }
  async getPost(id:number){
    if(!id){
      return null;
    }
    return await prisma.post.findUnique({
      where: {id},
      select: this.select
    })
  }

  async getAllPost(){
    return await prisma.post.findMany({
      where: {
        published: true
      },
      select: this.select
    })
  }
}
