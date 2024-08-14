import { Router } from "express";
import auth from "../../middleware/auth";
import checkRole from "../../middleware/checkRole";
import { addImage, removeImage } from "./entity";

const router: Router = Router();


/**
* POST /image
* @description This route is to upload an image to cloudinary.
* @response {Object} 200 - the url of the uploaded image.
*/
router.post('/image', auth, checkRole(['admin']), addImage);


/**
* DELETE /image
* @description This route is used to delete an image from cloudinary.
* @response {Object} 200 - the deleted image url
*/
router.delete('/image', auth, checkRole(['admin']), removeImage);

export default router;