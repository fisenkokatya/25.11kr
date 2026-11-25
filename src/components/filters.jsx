import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { categoryService } from "../service/category-service.js";
import { useProductFilter } from "../hooks/use-product-filter.js";

export function Filters() {
  const { data: categories } = useQuery({
    ...categoryService.getCategoriesQueryOptions(),
  });

  const { filter, setCategory, setSearch, setPriceRange, resetFilters } =
    useProductFilter();

  const [searchInput, setSearchInput] = useState(filter.search);
  const [minPriceInput, setMinPriceInput] = useState(filter.minPrice ?? "");
  const [maxPriceInput, setMaxPriceInput] = useState(filter.maxPrice ?? "");

  useEffect(() => {
    setSearchInput(filter.search);
  }, [filter.search]);

  useEffect(() => {
    setMinPriceInput(filter.minPrice ?? "");
    setMaxPriceInput(filter.maxPrice ?? "");
  }, [filter.minPrice, filter.maxPrice]);

  useEffect(() => {
    if (searchInput === filter.search) return;

    const timer = setTimeout(() => setSearch(searchInput.trim()), 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const currentMin = filter.minPrice ?? "";
    const currentMax = filter.maxPrice ?? "";

    if (
      String(minPriceInput) === String(currentMin) &&
      String(maxPriceInput) === String(currentMax)
    )
      return;

    const timer = setTimeout(() => {
      setPriceRange({
        minPrice: minPriceInput === "" ? null : Number(minPriceInput),
        maxPrice: maxPriceInput === "" ? null : Number(maxPriceInput),
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [minPriceInput, maxPriceInput]);

  return (
    <div className="flex gap-4 mt-10 items-end flex-wrap">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Category</h2>
        <select
          className="border border-gray-300 rounded px-2 py-1 w-full"
          value={filter.category ?? ""}
          onChange={(e) => setCategory(e.target.value || null)}
        >
          <option value="">All Categories</option>
          {categories?.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Search</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded px-2 py-1 w-56"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Price</h2>
        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            placeholder="min"
            className="border border-gray-300 rounded px-2 py-1 w-24"
            value={minPriceInput}
            onChange={(e) => setMinPriceInput(e.target.value)}
          />
          <input
            type="number"
            min="0"
            placeholder="max"
            className="border border-gray-300 rounded px-2 py-1 w-24"
            value={maxPriceInput}
            onChange={(e) => setMaxPriceInput(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={resetFilters}
        className="border border-gray-300 rounded px-4 py-1 hover:bg-gray-100 transition duration-300"
      >
        Reset
      </button>
    </div>
  );
}
