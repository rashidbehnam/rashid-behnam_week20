import api from "../configs/api";

export const getProducts = () => api.get("products");

export const createProduct = (product) => api.post("products", product);

export const editProduct = (product) =>
  api.put(`products/${product.id}`, product);

export const deleteProduct = (id) => {
  console.log("it hits deleteProduct", id);
  api.delete(`products/${id}`);
};
