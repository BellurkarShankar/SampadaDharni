const API_BASE_URL = "http://localhost:3001";
export const API_ROUTE = {
  auth_URL: `${API_BASE_URL}/api/auth`,
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
