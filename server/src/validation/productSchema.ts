import { z } from "zod";

export const Gender = z.enum(["MALE", "FEMALE", "OTHER"]);
export const variantSchema = z.object({
  id: z.string().optional(),
  size: z.string("At least one size is required"),
  color: z.string("At least one color is required"),
  price: z.number().min(0, "Price must be greater than 0"),
  stock: z.number().min(0, "Stock cannot be negative"),
  images: z.array(z.string()).nonempty("At least one image is required"),
  sku: z.string(),
});
export const productSchemaValidation = z.object({
  productName: z
    .string()
    .min(3, "Name must have at least 3 characters")
    .max(200, "Name must have at most 200 characters"),
  description: z
    .string()
    .min(10, "Description must have at least 10 characters")
    .max(1000, "Description must have at most 1000 characters"),
  brand: z
    .string()
    .min(2, "Brand name must have at least 2 characters")
    .max(50, "Brand name must have at most 50 characters"),
  category: z
    .string()
    .min(2, "Category must have at least 2 characters")
    .max(50, "Category must have at most 50 characters"),
  gender: Gender,
  variants: z.array(variantSchema).nonempty("At least one variant is required"),
  soldCount: z.number().min(0, "Sold count cannot be negative"),
  rating: z.number().min(0).max(5).optional(),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().default(false),
});

export const productSchemaValidationForUpdate = z.object({
  name: z
    .string()
    .min(3, "Name must have at least 3 characters")
    .max(200, "Name must have at most 200 characters"),
  description: z
    .string()
    .min(10, "Description must have at least 10 characters")
    .max(1000, "Description must have at most 1000 characters"),
  brand: z
    .string()
    .min(2, "Brand name must have at least 2 characters")
    .max(50, "Brand name must have at most 50 characters"),
  category: z
    .string()
    .min(2, "Category must have at least 2 characters")
    .max(50, "Category must have at most 50 characters"),
  gender: Gender,
  sizes: z.array(z.string()).nonempty("At least one size is required"),
  colors: z.array(z.string()).nonempty("At least one color is required"),
  price: z.number().min(0, "Price must be greater than 0"),
  stock: z.number().min(0, "Stock cannot be negative"),
  soldCount: z.number().min(0, "Sold count cannot be negative"),
  rating: z.number().min(0).max(5).optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  isFeatured: z.boolean().default(false),
});
