import axios from "axios";

interface orderType {
  productName: string;
  price: number;
}

interface OrderSummary {
  products: orderType[];
  totalPrice: number;
}

const productsApi = axios.create({
  baseURL: "http://localhost:3000",
});

// Get Products
export const getProducts = async () => {
  const response = await productsApi.get("/products");
  return response.data;
};

// Add Orders to db
export const addOrder = async (orderSummary: OrderSummary) => {
  return await productsApi.post("/orders", orderSummary);
};

export default productsApi;
