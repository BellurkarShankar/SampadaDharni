export type RecentProductsType = {
  variants: {
    id: string;
    size: string;
    color: string;
    price: number;
    stock: number;
    images: string[];
    sku: string;
    productId: string;
  }[];
} & {
  id: string;
  productName: string;
  description: string;
  brand: string;
  category: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  tags: string[];
  isFeatured: boolean;
  soldCount: number;
  rating: number | null;
  createdAt: Date;
  updatedAt: Date;
};
export type Variant = {
  id: string;
  size: string;
  color: string;
  price: number;
  stock: number;
  images: string[];
  sku: string;
  productId: string;
};

export type ProductListType = {
  reviews: {
    id: string;
    rating: number;
    createdAt: Date;
    productId: string;
    userId: string;
    comment: string;
  }[];
  variants: {
    id: string;
    size: string;
    color: string;
    price: number;
    stock: number;
    images: string[];
    sku: string;
    productId: string;
  }[];
} & {
  id: string;
  productName: string;
  description: string;
  brand: string;
  category: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  tags: string[];
  isFeatured: boolean;
  soldCount: number;
  rating: number | null;
  createdAt: Date;
  updatedAt: Date;
};
