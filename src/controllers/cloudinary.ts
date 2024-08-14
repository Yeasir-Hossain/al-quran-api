import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse, DeleteApiResponse } from "cloudinary";
import { CloudinaryConfig } from "../utils/types";

class Cloudinary {
  constructor(config: CloudinaryConfig) {
    cloudinary.config({
      cloud_name: config.cloudName,
      api_key: config.apiKey,
      api_secret: config.apiSecret
    });
    console.log("=> Cloudinary initialized");
  }

  async uploadImages(files: string[]): Promise<UploadApiResponse[]> {
    try {
      const uploadImgPromises = files.map(file => this.uploadImage(file));
      return Promise.all(uploadImgPromises);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async replaceImage(publicId: string, filePath: string): Promise<UploadApiResponse> {
    try {
      await this.deleteImage(publicId);
      return await this.uploadImage(filePath);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async deleteImages(urls: string[]): Promise<DeleteApiResponse[] | void[]> {
    const publicIds = urls.map(url => {
      const publicIdIndex = url.lastIndexOf("/");
      const publicId = url.substring(publicIdIndex + 1).replace(/\.(.?)*/gi, "");
      return publicId;
    });

    return await Promise.all(publicIds.map(async publicId => await this.deleteImage(publicId)));
  }

  async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

   uploadImage(file: string): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(file, (err: UploadApiErrorResponse, res: UploadApiResponse) => {
                if (err) reject(err);
                resolve(res);
            });
        });
    }
};


const cloudy = new Cloudinary({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
  apiKey: process.env.CLOUDINARY_API_KEY!,
  apiSecret: process.env.CLOUDINARY_API_SECRET!
});

export default cloudy;
