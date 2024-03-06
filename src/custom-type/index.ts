declare global {
  namespace Express {
    interface Request {
      userId: number;
    }
  }
}

export type UserQuery = {
    email?: string | Record<string, any>;
    name?: string | Record<string, any>;
  };

export enum UserTypes{
    ADMIN = "ADMIN",
    USER = "USER",
}

export enum Gender{
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}

export type CreateUserInput = {
    email:string,
    password: string,
    name:string,
    phone:string,
    gender:Gender,
    dateOfBirth:Date,
    type:UserTypes
}

export type UserLoginInput = {
    email:string,
    password: string
}

export type UpdateUserInput = {
    email?: string;
    name?: string;
    avatar?: string;
    avatarPublicId?: string;
    password?: string;
    otp?: number;
    otpExpiryTime?: Date;
    phone?: string;
    gender?: Gender;
    dateOfBirth?: Date;
  };
  
  export type FormateData = {
    statusCode: number;
    message: string;
    isSuccess: boolean;
    data: any;
  };
  
  export type CreatePostInput = {
    content?: string;
    image?: string;
    imagePublicId?: string;
    location?: string;
    link?: string;
    published: boolean;
    authorId: number;
  };
  
  export type UpdatePostInput = {
    content?: string;
    image?: string;
    imagePublicId?: string;
    location?: string;
    link?: string;
    published?: boolean;
  };