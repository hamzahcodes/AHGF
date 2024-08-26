import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export const uploadImageToCloudinary = async (imageBuffer) => {
    try {
      const result = await cloudinary.uploader.upload(imageBuffer, {
        folder: 'ahgf_images' // Optional: Specify a folder in Cloudinary to organize your images
      });
      return result.secure_url; // Return the URL of the uploaded image
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
    }
};

