import express from 'express';
import { validationResource } from '../middlewares/validationResource';
import { registerSchema ,loginSchema, resetPasswordSchema} from '../dtos/auth.dto';
import { forgotPassword, loginUser, refreshToken, registerUser } from '../controllers/auth.controller';


const authRouter = express.Router();


authRouter.post('/register' , validationResource(registerSchema), registerUser)
authRouter.post('/login', validationResource(loginSchema), loginUser)
authRouter.put("/refresh-token", refreshToken);
authRouter.put(
    "/forgot-password/:id",
    validationResource(resetPasswordSchema),
    forgotPassword
  );

export default authRouter