import { Response } from "express";
import { AuthenticatedUserRequest } from "../../../types/authenticate";
import { uploadImages } from "../../../utils/uploadImages";
import logger from "../../../utils/logger/logger";
import { ProductResponse } from "../../../types/productResponse";

export const imageUpload = async (
  req: AuthenticatedUserRequest,
  res: Response
) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      logger.error("Images are not attached to create the product");
      res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
      return;
    }

    logger.info("Images are uploading...");
    const imageUrls = await uploadImages(files, "sampadaDharni");
    logger.info("Images are Uploaded Successfully");

    const successResponse: ProductResponse = {
      success: true,
      message: "Images have been uploaded successfully",
      data: imageUrls,
    };

    res.status(200).json(successResponse);
  } catch (error) {
    logger.error(
      "Error while Uploading Images at SuperAdmin end",
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : error
    );

    const ErrorResponse: ProductResponse = {
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Image Upload failed",
    };

    res.status(500).json(ErrorResponse);
  }
};
