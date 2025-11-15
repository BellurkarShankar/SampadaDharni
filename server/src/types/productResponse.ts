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
