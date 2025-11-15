import { NextFunction, Response } from "express";
import { AuthenticatedUserRequest } from "../../../types/authenticate";
import logger from "../../../utils/logger/logger";
import { productSchemaValidation } from "../../../validation/productSchema";
import { prisma } from "../../../server";
import { ProductResponse } from "../../../types/productResponse";

const createProduct = async (
  req: AuthenticatedUserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.info("Create Product Operation Initiated");

    const validationOfProduct = productSchemaValidation.safeParse({
      ...req.body,
    });

    if (!validationOfProduct.success) {
      logger.error(
        "Validation has been failed",
        validationOfProduct.error.issues
      );
      const exactIssues = validationOfProduct.error.issues.map((issue) => {
        return {
          path: issue.path,
          message: issue.message,
        };
      });
      const validationError: ProductResponse = {
        success: false,
        message: "Data validation failed",
        error: exactIssues,
      };
      res.status(400).json(validationError);
      return;
    }

    logger.info(
      "The process of storing data in the database has been started "
    );
    const { variants, ...rest } = validationOfProduct.data;
    const skus = variants.map((vars) => vars.sku);

    const isProductExist = await prisma.product.findFirst({
      where: {
        variants: {
          some: {
            sku: { in: skus },
          },
        },
      },
    });

    if (isProductExist) {
      logger.info(`The ${isProductExist.productName} is already available`);
      const ErrorResponse: ProductResponse = {
        success: false,
        message: "The product is already available",
      };
      res.status(401).json(ErrorResponse);
      return;
    }

    const newProduct = await prisma.product.create({
      data: {
        ...rest,
        variants: {
          create: variants.map((oneVar) => ({
            ...oneVar,
          })),
        },
      },
      include: { variants: true },
    });

    const successResponse: ProductResponse = {
      success: true,
      message: "Product has been created successfully",
      data: newProduct,
    };
    res.status(200).json(successResponse);
    logger.info(
      "Data has been stored successfully now all files are unlinked successfully"
    );
  } catch (error) {
    logger.error(
      "Error while creating product at SuperAdmin end",
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : error
    );

    const ErrorResponse: ProductResponse = {
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Product creation failed",
    };

    res.status(500).json(ErrorResponse);
  }
};

const fetchAllProducts = async (
  req: AuthenticatedUserRequest,
  res: Response
): Promise<void> => {
  try {
    const { limit, page, dateString, searchString, tagString } = req.query;
    const limitNum = Number(limit);
    const pageNum = Number(page);
    logger.info("Fetching Products...");

    if (isNaN(pageNum) || isNaN(limitNum) || limitNum < 1 || pageNum < 1) {
      const ErrorResponse: ProductResponse = {
        success: false,
        message: "limit and page should be number and greater than 1",
      };
      res.status(400).json(ErrorResponse);
      return;
    }

    const offset = (pageNum - 1) * limitNum;
    let dateFilter;

    if (dateString) {
      const selectedDate = new Date(dateString.toLocaleString());
      const nextDate = new Date(selectedDate);
      nextDate.setDate(selectedDate.getDate() + 1);
      dateFilter = {
        gte: selectedDate,
        lt: nextDate,
      };
    }

    const fetchedProducts = await prisma.product.findMany({
      where: {
        createdAt: dateString ? { ...dateFilter } : undefined,
        productName: searchString
          ? { contains: String(searchString), mode: "insensitive" }
          : undefined,
        tags: tagString
          ? {
              has: String(tagString),
            }
          : undefined,
      },
      include: {
        reviews: true,
        variants: true,
      },
      take: limitNum,
      skip: offset,
    });

    const noOfProducts = await prisma.product.count({
      where: {
        createdAt: dateString ? { ...dateFilter } : undefined,
        productName: searchString
          ? { contains: String(searchString), mode: "insensitive" }
          : undefined,
      },
    });

    if (fetchedProducts && fetchedProducts.length === 0) {
      logger.error("No Data Found");
      const successResponseWithoutData: ProductResponse = {
        success: true,
        message: "There is no products",
        data: [],
        counters: {
          noOfProducts,
        },
      };
      res.status(200).json(successResponseWithoutData);
      return;
    }

    logger.info("Product has been fetched successfully");

    const successResponseWithData: ProductResponse = {
      success: true,
      message: "Product has been fetched successfully",
      data: fetchedProducts,
      counters: {
        noOfProducts,
      },
    };

    res.status(200).json(successResponseWithData);
  } catch (error) {
    logger.error(
      "Error occured while fetching products",
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : error
    );

    const ErrorResponse: ProductResponse = {
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Failed to fetch product",
    };

    res.status(500).json(ErrorResponse);
  }
};

const fetchProductById = async (
  req: AuthenticatedUserRequest,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    logger.info("Fetching products by its ID");

    if (!productId) {
      logger.error("Product ID is missing");
      const ErrorResponse: ProductResponse = {
        success: false,
        message: "productId is Required",
      };
      res.status(400).json(ErrorResponse);
      return;
    }

    const productById = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        reviews: true,
        variants: true,
      },
    });

    if (!productById) {
      logger.error(`Product not found with this ${productId}`);
      const ErrorResponse: ProductResponse = {
        success: false,
        message: "Product not found",
      };
      res.status(404).json(ErrorResponse);
      return;
    }

    logger.info(`Product with ${productId} found.`);

    const successResponseWithData: ProductResponse = {
      success: true,
      message: "Product fetched successfully",
      data: productById,
    };

    res.status(200).json(successResponseWithData);
  } catch (error) {
    logger.error(
      "Error occured while fetching product",
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : error
    );

    const ErrorResponse: ProductResponse = {
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Failed to fetch product",
    };

    res.status(500).json(ErrorResponse);
  }
};

const updateProductById = async (
  req: AuthenticatedUserRequest,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;

    if (!productId) {
      logger.error("Product ID is missing");
      const ErrorResponse: ProductResponse = {
        success: false,
        message: "productId is Required",
      };
      res.status(400).json(ErrorResponse);
      return;
    }

    const validationOfProductData = productSchemaValidation.safeParse(req.body);

    if (!validationOfProductData.success) {
      logger.error(
        "Validation has been failed",
        validationOfProductData.error.issues
      );
      const exactIssues = validationOfProductData.error.issues.map((issue) => {
        return {
          path: issue.path,
          message: issue.message,
        };
      });
      const validationError: ProductResponse = {
        success: false,
        message: "Data validation failed",
        error: exactIssues,
      };
      res.status(400).json(validationError);
      return;
    }

    logger.info("Product Updation Initiated With Images....");

    const { variants, ...rest } = validationOfProductData.data;

    const result = await prisma.$transaction(async (tx) => {
      const updatedProduct = await tx.product.update({
        where: { id: productId },
        data: { ...rest },
      });

      const existingVariants = variants.filter((v) => v.id);

      const newVariants = variants.filter((v) => !v.id);

      const updatedVariants = await Promise.all(
        existingVariants.map((v) =>
          tx.variant.update({
            where: { id: v.id },
            data: {
              color: v.color,
              size: v.size,
              price: v.price,
              stock: v.stock,
              images: v.images,
              sku: v.sku,
            },
          })
        )
      );

      if (newVariants.length > 0) {
        await tx.variant.createMany({
          data: newVariants.map((v) => ({
            productId,
            color: v.color,
            size: v.size,
            price: v.price,
            stock: v.stock,
            images: v.images,
            sku: v.sku,
          })),
        });
      }

      return { updatedProduct, updatedVariants };
    });

    const successResponse: ProductResponse = {
      success: true,
      message: "Data updated successfully",
      data: {
        ...result.updatedProduct,
        variants: result.updatedVariants,
      },
    };
    res.status(200).json(successResponse);
  } catch (error) {
    logger.error(
      "Error occured while Updating product",
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : error
    );
    const ErrorResponse: ProductResponse = {
      success: false,
      message: "Internal server error",
      error:
        error instanceof Error ? error.message : "Failed to Update product",
    };
    res.status(500).json(ErrorResponse);
  }
};

const deleteProductById = async (
  req: AuthenticatedUserRequest,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    logger.info(`Deletion of Product Initiated`);

    if (!productId) {
      logger.error("Product ID is missing");
      const ErrorResponse: ProductResponse = {
        success: false,
        message: "productId is Required",
      };
      res.status(400).json(ErrorResponse);
      return;
    }

    const deletedProduct = await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    logger.info(`${deletedProduct.productName} has been Removed successfully`);

    const successResponse: ProductResponse = {
      success: true,
      message: "Product has been deleted successfully",
      data: deletedProduct,
    };
    res.status(200).json(successResponse);
  } catch (error) {
    logger.error(
      "Error occured while Deleting product",
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : error
    );

    const ErrorResponse: ProductResponse = {
      success: false,
      message: "Internal server error",
      error:
        error instanceof Error ? error.message : "Failed to Delete product",
    };

    res.status(500).json(ErrorResponse);
  }
};

const recentProductLists = async (
  req: AuthenticatedUserRequest,
  res: Response
): Promise<void> => {
  try {
    const { page, limit, dateString } = req.query;
    const noOfPage = Number(page);
    const limits = Number(limit);

    if (isNaN(noOfPage) || isNaN(limits) || noOfPage < 0 || limits < 0) {
      const ErrorResponse: ProductResponse = {
        success: false,
        message:
          "Page number and limit should be in digits or positive integers ",
        data: [],
      };
      res.status(400).json(ErrorResponse);
      return;
    }

    const offset = (noOfPage - 1) * limits;

    const today = new Date();
    const lastWeek = new Date();

    lastWeek.setDate(today.getDate() - 7);
    let dateFilter;

    if (dateString) {
      const selectedDate = new Date(dateString.toLocaleString());
      const nextDate = new Date(selectedDate);
      nextDate.setDate(selectedDate.getDate() + 1);

      dateFilter = {
        createdAt: {
          gte: selectedDate,
          lt: nextDate,
        },
      };
    } else {
      dateFilter = {
        createdAt: {
          gte: lastWeek,
          lte: today,
        },
      };
    }

    const [recentProducts, noOfRecentProducts] = await prisma.$transaction([
      prisma.product.findMany({
        where: {
          ...dateFilter,
        },
        include: {
          variants: true,
        },
        take: limits,
        skip: offset,
      }),
      prisma.product.count({
        where: {
          createdAt: {
            gte: lastWeek,
            lte: today,
          },
        },
      }),
    ]);

    if (recentProducts && recentProducts.length === 0) {
      logger.info(`No products found ${lastWeek} between ${today}`);
      const successResponse: ProductResponse = {
        success: false,
        message: "No products found for recent 7 days",
        data: [],
        counters: {
          noOfRecentProducts,
        },
      };
      res.status(404).json(successResponse);
      return;
    }

    const successResponse: ProductResponse = {
      success: true,
      message: "Recent products fetched successfully",
      data: recentProducts,
      counters: {
        noOfRecentProducts,
      },
    };
    res.status(200).json(successResponse);
  } catch (error) {
    logger.error(
      "Error encountered while fetching recent product list",
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : error
    );
    const ErrorResponse: ProductResponse = {
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Product fetching failed",
    };

    res.status(500).json(ErrorResponse);
  }
};

export {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProductById,
  deleteProductById,
  recentProductLists,
};
