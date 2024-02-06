import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dghdglfuv',
  api_key: '137446129345999',
  api_secret: 'jO9mq-T1vULX05008hBj5z6dQX0',
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

