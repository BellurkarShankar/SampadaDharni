import { ProductListType } from "./productTypes";

const API_BASE_URL = "http://localhost:3001";
export const API_ROUTE = {
  auth_URL: `${API_BASE_URL}/api/auth`,
  product_URL: `${API_BASE_URL}/api/product`,
};

type User = {
  id: string;
  name: string | null;
  email: string;
  role: "USER" | "SUPERADMIN";
} | null;
type UserRegistration = {
  name: string;
  email: string;
  password: string;
};
type UserLogin = {
  email: string;
  password: string;
};
type AuthStoreStateResponse = {
  success: boolean;
  error?: any;
  data?: any;
  message: string;
};
export type AuthStore = {
  isLoading: boolean;
  error: string | null;
  user: User;
  register: ({
    email,
    name,
    password,
  }: UserRegistration) => Promise<AuthStoreStateResponse>;
  login: ({ email, password }: UserLogin) => Promise<AuthStoreStateResponse>;
  logout: () => Promise<AuthStoreStateResponse>;
  refreshAccessToken: () => Promise<AuthStoreStateResponse>;
};
export type ProductResponse = {
  success: false | true;
  message: string;
  data?: any;
  error?: any;
  counters?: {
    noOfProducts?: number;
    noOfRecentProducts?: number;
  };
};

export type Product = {
  isFeatured: boolean;
  tags: string[];
  soldCount: number;
  rating: number;
  variants: {
    size: string;
    color: string;
    price: number;
    stock: number;
    images: string[] | undefined;
    sku: string;
  }[];
  productName: string;
  description: string;
  brand: string;
  category: string;
  gender: "MALE" | "FEMALE" | "OTHER";
};

export type ProductEdit = {
  isFeatured: boolean;
  tags: string[];
  soldCount: number;
  rating: number;
  variants: {
    id?: string | any;
    size: string;
    color: string;
    price: number;
    stock: number;
    images: string[] | undefined;
    sku: string;
  }[];
  productName: string;
  description: string;
  brand: string;
  category: string;
  gender: "MALE" | "FEMALE" | "OTHER";
};

export type ProductStoreType = {
  products: ProductListType[];
  error: string | null;
  isLoading: boolean;
  createProduct: (productData: Product) => Promise<ProductResponse>;
  fetchAllProduct: ({
    limit,
    page,
    dateString,
    searchString,
  }: {
    limit: number;
    page: number;
    dateString: string;
    searchString: string;
    tagString: string;
  }) => Promise<ProductResponse>;
  fetchProductById: (productId: string) => Promise<ProductResponse>;
  updateProductById: ({
    productData,
    productId,
  }: {
    productId: string;
    productData: ProductEdit;
  }) => Promise<ProductResponse>;
  deleteProductById: (productId: string) => Promise<ProductResponse>;
  uploadImages: (formData: FormData) => Promise<ProductResponse>;
  fetchRecentProductList: (
    page: number,
    limit: number,
    dateString: string
  ) => Promise<ProductResponse>;
};
