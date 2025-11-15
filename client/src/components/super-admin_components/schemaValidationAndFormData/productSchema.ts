import z from "zod";

export const ErrorMessage = {
  REQUIRED: (field: string) => `${field} is required.`,
  INVALID_STRING: (field: string) => `Please enter a valid ${field}.`,
  MIN_LEN: (field: string, n: number) =>
    `${field} must be at least ${n} characters long.`,
  MAX_LEN: (field: string, n: number) =>
    `${field} must be less than ${n} characters.`,
  INVALID_NUMBER: (field: string) => `Please enter a valid ${field}.`,
  MIN_NUMBER: (field: string, n: number) => `${field} must be at least ${n}.`,
  MAX_NUMBER: (field: string, n: number) => `${field} must be at most ${n}.`,
  ARRAY_REQUIRED: (field: string) => `Please select at least one ${field}.`,
};

export const Gender = ["MALE", "FEMALE", "OTHER"] as const;

export const variantSchema = z.object({
  size: z.string().min(1, ErrorMessage.REQUIRED("size")),
  color: z.string().min(1, ErrorMessage.REQUIRED("color")),
  price: z
    .string()
    .superRefine((data, ctx) => {
      if (isNaN(Number(data)) || Number(data) < 0) {
        console.log(data, "Number");
        ctx.addIssue({
          code: "custom",
          message: ErrorMessage.INVALID_NUMBER("price"),
          // path: ["price"],
        });
      }
    })
    .min(1, ErrorMessage.MIN_NUMBER("price", 0)),
  stock: z
    .string()
    .superRefine((data, ctx) => {
      if (isNaN(Number(data)) || Number(data) < 0) {
        ctx.addIssue({
          code: "custom",
          message: ErrorMessage.INVALID_NUMBER("stock"),
          // path: ["stock"],
        });
      }
    })
    .min(1, ErrorMessage.MIN_NUMBER("stock", 0)),
  images: z.array(z.string()).optional(),
  sku: z.string().optional(),
});

export type VariantSchemaType = z.infer<typeof variantSchema>;

export const productSchema = z.object({
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
  gender: z.enum(Gender),
  variant: z.array(variantSchema).optional(),
  soldCount: z.number().min(0, "Sold count cannot be negative").optional(),
  rating: z.number().min(0).max(5).optional(),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
});

export type ProductSchemaType = z.infer<typeof productSchema>;

export type ProductFormFieldType = {
  name: string;
  label: string;
  Input: string;
  placeholder?: string;
  inputType?: string;
};

export const genderData = ["MALE", "FEMALE", "OTHER"];

export const productFormData: ProductFormFieldType[] = [
  {
    label: "Product Name",
    inputType: "text",
    Input: "Input",
    name: "productName",
    placeholder: "Enter product name...",
  },
  {
    label: "Product Description",
    inputType: "text",
    Input: "Textarea",
    name: "description",
    placeholder: "Enter product description...",
  },
  {
    label: "Brands",
    inputType: "text",
    Input: "Select",
    name: "brand",
    placeholder: "Select Brand",
  },
  {
    label: "Category",
    inputType: "text",
    Input: "Select",
    name: "category",
    placeholder: "Select category",
  },
  {
    label: "Gender",
    Input: "Select",
    name: "gender",
    placeholder: "Select Gender",
  },

  {
    label: "Generate Tags",
    Input: "Tag",
    name: "tags",
  },
  {
    label: "Featured",
    Input: "Switch",
    name: "isFeatured",
  },
];

export const variantFormData: ProductFormFieldType[] = [
  {
    label: "Select Colors",
    Input: "Toggle",
    name: "color",
  },
  {
    label: "Select Sizes",
    Input: "Toggle",
    name: "size",
  },
  {
    label: "Price",
    inputType: "text",
    Input: "Input",
    name: "price",
    placeholder: "Enter Product Price...",
  },
  {
    label: "Stock",
    inputType: "text",
    Input: "Input",
    name: "stock",
    placeholder: "Enter stock..",
  },
];

export type CategoryOfProductType = {
  categoryLabel: string;
  categoryValue: string;
  categoryId: string;
};

export const categories: CategoryOfProductType[] = [
  {
    categoryLabel: "Fashion",
    categoryValue: "fashion",
    categoryId: "cat-001",
  },
  {
    categoryLabel: "Saree",
    categoryValue: "saree",
    categoryId: "cat-002",
  },
  {
    categoryLabel: "Hand Bag",
    categoryValue: "hand-bag",
    categoryId: "cat-003",
  },
  {
    categoryLabel: "Shoes",
    categoryValue: "shoes",
    categoryId: "cat-004",
  },
  {
    categoryLabel: "Wallet",
    categoryValue: "wallet",
    categoryId: "cat-005",
  },
  {
    categoryLabel: "Sunglass",
    categoryValue: "sunglass",
    categoryId: "cat-006",
  },
  {
    categoryLabel: "Cap",
    categoryValue: "cap",
    categoryId: "cat-007",
  },
  {
    categoryLabel: "Kurti",
    categoryValue: "kurti",
    categoryId: "cat-008",
  },
  {
    categoryLabel: "Ethnic Wear",
    categoryValue: "ethnic-wear",
    categoryId: "cat-009",
  },
  {
    categoryLabel: "Kids Wear",
    categoryValue: "kids-wear",
    categoryId: "cat-010",
  },
  {
    categoryLabel: "Jewellery",
    categoryValue: "jewellery",
    categoryId: "cat-011",
  },
  {
    categoryLabel: "Belt",
    categoryValue: "belt",
    categoryId: "cat-012",
  },
  {
    categoryLabel: "T-Shirt",
    categoryValue: "tshirt",
    categoryId: "cat-013",
  },
  {
    categoryLabel: "Shirt",
    categoryValue: "shirt",
    categoryId: "cat-014",
  },
  {
    categoryLabel: "Pant / Jeans",
    categoryValue: "pant-jeans",
    categoryId: "cat-015",
  },
  {
    categoryLabel: "Sandals",
    categoryValue: "sandals",
    categoryId: "cat-016",
  },
  {
    categoryLabel: "Slippers",
    categoryValue: "slippers",
    categoryId: "cat-017",
  },
];

export const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

export type SizeType = (typeof sizes)[number];

export type ColorsOfProductType = {
  colorLabel: string;
  colorCode: string;
  hex: string;
};

export const colors: ColorsOfProductType[] = [
  { colorLabel: "Black", colorCode: "bg-[#000000]", hex: "text-[#FFFFFF]" },
  { colorLabel: "White", colorCode: "bg-[#FFFFFF]", hex: "text-[#000000]" },
  { colorLabel: "Gray", colorCode: "bg-[#9CA3AF]", hex: "text-[#000000]" },
  { colorLabel: "Silver", colorCode: "bg-[#D1D5DB]", hex: "text-[#000000]" },
  { colorLabel: "Brown", colorCode: "bg-[#8B4513]", hex: "text-[#FFFFFF]" },
  { colorLabel: "Beige", colorCode: "bg-[#F5F5DC]", hex: "text-[#000000]" },
  { colorLabel: "Red", colorCode: "bg-[#EF4444]", hex: "text-[#FFFFFF]" },
  { colorLabel: "Maroon", colorCode: "bg-[#800000]", hex: "text-[#FFFFFF]" },
  { colorLabel: "Orange", colorCode: "bg-[#FB923C]", hex: "text-[#000000]" },
  { colorLabel: "Yellow", colorCode: "bg-[#FACC15]", hex: "text-[#000000]" },
  { colorLabel: "Green", colorCode: "bg-[#22C55E]", hex: "text-[#000000]" },
  { colorLabel: "Olive", colorCode: "bg-[#808000]", hex: "text-[#FFFFFF]" },
  { colorLabel: "Blue", colorCode: "bg-[#3B82F6]", hex: "text-[#FFFFFF]" },
  { colorLabel: "Navy", colorCode: "bg-[#000080]", hex: "text-[#FFFFFF]" },
  { colorLabel: "Cyan", colorCode: "bg-[#06B6D4]", hex: "text-[#000000]" },
  { colorLabel: "Purple", colorCode: "bg-[#8B5CF6]", hex: "text-[#FFFFFF]" },
  { colorLabel: "Violet", colorCode: "bg-[#7C3AED]", hex: "text-[#FFFFFF]" },
  { colorLabel: "Pink", colorCode: "bg-[#EC4899]", hex: "text-[#000000]" },
  { colorLabel: "Rose", colorCode: "bg-[#F43F5E]", hex: "text-[#FFFFFF]" },
];

export type BrandType = {
  brandLabel: string;
  brandValue: string;
};

export const brands: BrandType[] = [
  { brandLabel: "Nike", brandValue: "nike" },
  { brandLabel: "Adidas", brandValue: "adidas" },
  { brandLabel: "Puma", brandValue: "puma" },
  { brandLabel: "Reebok", brandValue: "reebok" },
  { brandLabel: "Zara", brandValue: "zara" },

  // Saree Brands
  { brandLabel: "Divastri", brandValue: "divastri" },
  { brandLabel: "Suta", brandValue: "suta" },
  { brandLabel: "Banarasi", brandValue: "banarasi" },
  { brandLabel: "Paithani", brandValue: "paithani" },
  { brandLabel: "Jaypore", brandValue: "jaypore" },

  // Punjabi Kurta & Shirts
  { brandLabel: "Manyavar", brandValue: "manyavar" },
  { brandLabel: "Raymond", brandValue: "raymond" },
  { brandLabel: "Mufti", brandValue: "mufti" },
  { brandLabel: "Indian Terrain", brandValue: "indianterrain" },
  { brandLabel: "FabIndia Kurta", brandValue: "fabindia_kurta" },
];

type ColorKey =
  | "Black"
  | "White"
  | "Gray"
  | "Silver"
  | "Red"
  | "Maroon"
  | "Orange"
  | "Brown"
  | "Beige"
  | "Tan"
  | "Yellow"
  | "Gold"
  | "Olive"
  | "Green"
  | "Teal"
  | "Cyan"
  | "Blue"
  | "Navy"
  | "Purple"
  | "Violet"
  | "Pink"
  | "Magenta"
  | "Rose"
  | "Burgundy"
  | "Cream";

export type FilterSizeByColorType = Record<ColorKey, string[]>;

export const InitialStates = {
  Black: [],
  White: [],
  Gray: [],
  Silver: [],
  Red: [],
  Maroon: [],
  Orange: [],
  Brown: [],
  Beige: [],
  Tan: [],
  Yellow: [],
  Gold: [],
  Olive: [],
  Green: [],
  Teal: [],
  Cyan: [],
  Blue: [],
  Navy: [],
  Purple: [],
  Violet: [],
  Pink: [],
  Magenta: [],
  Rose: [],
  Burgundy: [],
  Cream: [],
};

export const ColorsAsPerCode = {
  Black: "bg-black text-white ring-gray-700",
  White: "bg-white text-black ring-gray-300",
  Gray: "bg-gray-500 text-white ring-gray-400",
  Silver: "bg-slate-300 text-black ring-slate-400",
  Red: "bg-red-500 text-white ring-red-600",
  Maroon: "bg-red-800 text-white ring-red-700",
  Orange: "bg-orange-500 text-black ring-orange-600",
  Brown: "bg-amber-900 text-white ring-amber-700",
  Beige: "bg-amber-200 text-black ring-amber-300",
  Tan: "bg-amber-300 text-black ring-amber-400",
  Yellow: "bg-yellow-500 text-black ring-yellow-600",
  Gold: "bg-yellow-600 text-black ring-yellow-700",
  Olive: "bg-lime-800 text-white ring-lime-600",
  Green: "bg-green-500 text-white ring-green-600",
  Teal: "bg-teal-500 text-white ring-teal-600",
  Cyan: "bg-cyan-500 text-white ring-cyan-600",
  Blue: "bg-blue-500 text-white ring-blue-600",
  Navy: "bg-blue-900 text-white ring-blue-700",
  Purple: "bg-purple-500 text-white ring-purple-600",
  Violet: "bg-violet-500 text-white ring-violet-600",
  Pink: "bg-pink-500 text-white ring-pink-600",
  Magenta: "bg-fuchsia-600 text-white ring-fuchsia-500",
  Rose: "bg-rose-500 text-white ring-rose-600",
  Burgundy: "bg-red-900 text-white ring-red-800",
  Cream: "bg-yellow-100 text-black ring-yellow-200",
} as {
  [key: string]: string;
};
