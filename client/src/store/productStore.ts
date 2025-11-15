import { API_ROUTE, ProductStoreType } from "@/utils/api";
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const axiosInstance = axios.create({
  baseURL: API_ROUTE.product_URL,
  withCredentials: true,
});

export const productStore = create<ProductStoreType>()(
  persist(
    (set, get) => ({
      isLoading: true,
      error: null,
      products: [],

      createProduct: async (productData: any) => {
        set({
          isLoading: true,
          error: null,
        });
        try {
          const response = await axiosInstance.post(
            "/createProduct",
            productData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          set({ isLoading: false, error: null });
          return {
            success: response.data.success || true,
            message: response.data.message || "Product has been created",
            data: response.data.data,
          };
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error.response?.data.error
              : "Failed to create product",
          });
          return {
            success: false,
            message: axios.isAxiosError(error) && error.response?.data.message,
          };
        }
      },

      deleteProductById: async (productId: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.delete(
            `/deleteProduct/${productId}`
          );
          set({ isLoading: false, error: null });
          return {
            success: response.data.success || true,
            message: response.data.message || "Product has been deleted",
            data: response.data,
          };
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error.response?.data.message
              : "Failed to delete product",
          });
          return {
            success: false,
            message: "",
            error: "",
          };
        }
      },

      fetchAllProduct: async ({
        limit,
        page,
        dateString,
        searchString,
        tagString,
      }) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.get(
            `/getProducts?limit=${limit}&page=${page}&dateString=${dateString}&searchString=${searchString}&tagString=${tagString}`
          );
          set({
            isLoading: false,
            error: null,
            products: response.data.data,
          });

          return {
            success: response.data.success || true,
            message:
              response.data.message || "All products are fetched successfully",
            data: response.data.data,
            counters: response.data.counters,
          };
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error.message
              : "Failed to fetch product",
          });
          return {
            success: false,
            message: "Something went wrong & Failed to fetch product",
            error: error,
          };
        }
      },

      fetchProductById: async (productId: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.get(
            `/getProductById/${productId}`
          );
          set({ isLoading: false, error: null });
          return {
            success: response.data.success || true,
            message: response.data.message || "Product fetched successfully",
            data: response.data,
          };
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error.response?.data.message
              : "Failed to fetch Product",
          });
          return {
            success: false,
            message: "Something went wrong while fetching product by its ID",
            error: error,
          };
        }
      },

      updateProductById: async ({ productData, productId }) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.put(
            `/updateProduct/${productId}`,
            productData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          set({ isLoading: false, error: null });
          return {
            success: response.data.success || true,
            message: response.data.message || "Updated successfully",
            data: response.data,
          };
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error.response?.data.message
              : "Failed to Update product",
          });
          return {
            success: false,
            message: "Something went wrong while updating product",
            error: error,
          };
        }
      },

      uploadImages: async (formData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post("/uploadImages", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          set({ isLoading: false, error: null });
          return {
            success: response.data.success || true,
            message:
              response.data.message || "Images have been uploaded successfully",
            data: response.data.data,
          };
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error.response?.data.message
              : "Failed to Upload Images",
          });
          return {
            success: false,
            message: "Something went wrong while Uploading Images",
            error: error,
          };
        }
      },

      fetchRecentProductList: async (page, limit, dateString) => {
        set({
          isLoading: true,
          error: null,
        });
        try {
          const response = await axiosInstance.get(
            `/getRecentProduct?page=${page}&limit=${limit}&dateString=${dateString}`
          );
          set({ isLoading: false, error: null });
          return {
            success: response.data.success || true,
            message: response.data.message || "Recent Product List",
            data: response.data.data,
            counters: response.data.counters,
          };
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error.response?.data.message
              : "Failed to Upload Images",
          });
          return {
            success: false,
            message: axios.isAxiosError(error) && error.response?.data.message,
          };
        }
      },
    }),
    {
      name: "Product-Store",
      partialize: (state) => ({
        products: state.products,
      }),
    }
  )
);
