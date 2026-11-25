import { useAppSearchParams } from "./use-app-search-params.js";

export const DEFAULT_LIMIT = 8;

export function useProductFilter() {
  const { get, setMany, clear } = useAppSearchParams();

  const filter = {
    category: get("category") ?? null,
    search: get("search") ?? "",
    minPrice: get("minPrice") ? Number(get("minPrice")) : null,
    maxPrice: get("maxPrice") ? Number(get("maxPrice")) : null,
    page: Number(get("page")) || 1,
    limit: Number(get("limit")) || DEFAULT_LIMIT,
  };

  const setCategory = (category) => setMany({ category, page: null });

  const setSearch = (search) =>
    setMany({ search, page: null }, { replace: true });

  const setPriceRange = ({ minPrice, maxPrice }) =>
    setMany({ minPrice, maxPrice, page: null }, { replace: true });

  const setPage = (page) => setMany({ page });

  const resetFilters = () => clear();

  return {
    filter,
    setCategory,
    setSearch,
    setPriceRange,
    setPage,
    resetFilters,
  };
}
