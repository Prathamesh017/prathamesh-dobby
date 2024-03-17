import { Router } from 'express'
import { loginUser, registerUser } from '../controller/auth-controller.js'
const authRouter = Router()


authRouter.post('/register',registerUser).post("/login",loginUser);


export default authRouter;