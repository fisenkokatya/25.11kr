import { $authApi, $mainApi } from "../api-instance.js";
import { queryOptions } from "@tanstack/react-query";

export const productService = {
  baseKey: "products",

  getAll: async (filter, { signal }) => {
    const { category, search, minPrice, maxPrice, page, limit } = filter;

    const res = await $authApi.get("/products", {
      params: {
        category: category || undefined,
        search: search || undefined,
        minPrice: minPrice ?? undefined,
        maxPrice: maxPrice ?? undefined,
        page,
        limit,
      },
      signal,
    });
    return res.data;
  },

  getProductsQueryOptions: (filter) => {
    return queryOptions({
      queryKey: [productService.baseKey, filter],
      queryFn: (meta) => productService.getAll(filter, meta),
    });
  },

  getById: async (id) => {
    const res = await $mainApi.get(`/products/${id}`);
    return res.data;
  },
};
