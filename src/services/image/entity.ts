import { Response } from "express";
import { Req } from "../../utils/types";
import cloudy from "../../controllers/cloudinary";


/**
 * Deletes an image from Cloudinary based on the provided URL.
 * 
 * @param {Req} req - Express Request object containing the image URL in the request body
 * @param {Response} res - Express Response object to send the HTTP response
 * @returns {Promise<Response>} HTTP response with status and message indicating success or failure of image deletion
 */
export const removeImage = async (req: Req, res: Response): Promise<Response> => {
    try {
        const url = req.body;
        if (!url || url.trim().length === 0) return res.status(400).send({ status: 400, message: 'No url provided' });
        await cloudy.deleteImage(url);
        return res.status(200).send({ status: 200, message: 'Image deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: 500, message: 'Internal Server Error' });
    }
};


/**
 * Uploads an image to Cloudinary.
 * 
 * @param {Req} req - Express Request object containing the image file in req.files.image
 * @param {Response} res - Express Response object to send the HTTP response
 * @returns {Promise<Response>} HTTP response with status and message containing the uploaded image URL
 */
export const addImage = async (req: Req, res: Response): Promise<Response> => {
    try {
        if (!req?.files || !req.files?.image) return res.status(404).send({ status: 404, message: 'Image not found' });
        const imgRes = await cloudy.uploadImage(req.files.image);
        return res.status(200).send({ status: 200, message: 'Image uploaded successfully', data: imgRes.secure_url });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: 500, message: 'Internal Server Error' });
    }
};