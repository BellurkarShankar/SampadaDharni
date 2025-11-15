import { Router } from "express";
import { isAuthenticated } from "../middleware/isAuthenticatedUser";
import { upload } from "../middleware/uploadMiddleware";
import {
  createProduct,
  deleteProductById,
  fetchAllProducts,
  fetchProductById,
  recentProductLists,
  updateProductById,
} from "../controllers/admin/product/adminProductController";
import { isSuperAdmin } from "../middleware/isSuperAmin";
import { imageUpload } from "../controllers/admin/product/imageUpload";

const adminRoute = Router();
adminRoute.use(isAuthenticated);
adminRoute.post(
  "/createProduct",
  isSuperAdmin,
  upload.array("image", 5),
  createProduct
);
adminRoute.post(
  "/uploadImages",
  isSuperAdmin,
  upload.array("image", 5),
  imageUpload
);
adminRoute.get("/getProducts", isSuperAdmin, fetchAllProducts);
adminRoute.get("/getProductById/:productId", fetchProductById);
adminRoute.put("/updateProduct/:productId", isSuperAdmin, updateProductById);
adminRoute.delete("/deleteProduct/:productId", isSuperAdmin, deleteProductById);
adminRoute.get("/getRecentProduct", isSuperAdmin, recentProductLists);
export { adminRoute };
