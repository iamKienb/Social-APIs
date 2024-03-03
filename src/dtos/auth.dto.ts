import { object, z , string, number, date, TypeOf } from "zod"
import {Gender} from "../custom-type"
const registerSchema = object({
    body: object({
        email: string({
            required_error: "Email is required"
        }).email('not valid email'),
        password: string({
            required_error: "Password is required"
        }).min(5, 'Password to short '),

        passwordConfirmation: string({
            required_error: "Password confirmation is required"
        }).min(5, 'Password is required'),
        name: string({
            required_error: 'Name is required'
        }),
        phone: string({
            required_error: "not valid phone number"
        }).regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g),
        dateOfBirth: string({
          required_error: "DateOfBirth is required",
        }),
        gender: z.nativeEnum(Gender),


    }).refine((data) => data.password === data.passwordConfirmation ,{
        message: "Password do not match",
        path: ['Password confirmation']
    }),
})

const loginSchema = object({
    body: object({
        email: string({
            required_error: "email is required",

        }).email('not valid email'),
        password: string({
            required_error: "password is required",
        })
    })
})

const resetPasswordSchema = object({
    body: object({
        password: string({
            required_error: "password is required",
        }),
        
    }),
    params: object({
    id: string({
       required_error: "id is required", 
    })
    })
})
type resetPasswordDto = TypeOf<typeof resetPasswordSchema>

type registerDto = TypeOf<typeof registerSchema>['body']
type loginDto  = TypeOf<typeof loginSchema>['body']
export {
    registerSchema,
    registerDto,
    loginSchema,
    loginDto,
    resetPasswordSchema,
    resetPasswordDto
}