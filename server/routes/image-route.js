import { Router } from 'express'
import { getUserImages,uploadImages } from '../controller/image-controller.js';
import verifyToken from '../middleware/middleware.js';
const imageRouter = Router()


imageRouter.get('/:id',verifyToken,getUserImages).post("/:id",verifyToken,uploadImages);


export default imageRouter;