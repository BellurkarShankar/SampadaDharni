import { cloudinary } from "../config/uploadConfig";
import fs from "fs";
export const uploadImages = async (
  files: Express.Multer.File[],
  folderName: string
) => {
  try {
    const uploadedFilesPromises = files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        folder: folderName,
      })
    );
    const resolvedFilePromises = await Promise.all(uploadedFilesPromises);
    const imageUrls = resolvedFilePromises.map((result) => result.secure_url);
    await Promise.all(files.map((file) => fs.promises.unlink(file.path)));
    return imageUrls;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw new Error("Failed to upload images to Cloudinary");
  }
};
