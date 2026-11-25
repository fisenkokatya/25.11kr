import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { productService } from "../service/product-service.js";
import { ProductCard } from "../components/product-card.jsx";
import { Filters } from "../components/filters.jsx";
import { useProductFilter } from "../hooks/use-product-filter.js";

export function HomePage() {
  const { filter, setPage } = useProductFilter();

  const { data, isLoading, isFetching } = useQuery({
    ...productService.getProductsQueryOptions(filter),
    placeholderData: keepPreviousData,
  });

  const products = data?.data ?? [];

  const totalPages = data?.pagination?.pages ?? null;

  const canPrev = filter.page > 1;
  const canNext = totalPages
    ? filter.page < totalPages
    : products.length === filter.limit;

  return (
    <>
      <Filters />

      {isLoading && <p className="mt-4">Загрузка...</p>}

      {!isLoading && products.length === 0 && (
        <p className="mt-4">Ничего не найдено</p>
      )}

      <div
        className={`grid grid-cols-4 gap-4 mt-4 ${isFetching ? "opacity-60" : ""}`}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="flex gap-4 items-center justify-center my-8">
        <button
          disabled={!canPrev}
          onClick={() => setPage(filter.page - 1)}
          className="bg-teal-500 text-white px-4 py-2 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-teal-600 transition duration-300"
        >
          Назад
        </button>

        <span className="font-bold">
          {filter.page}
          {totalPages ? ` / ${totalPages}` : ""}
        </span>

        <button
          disabled={!canNext}
          onClick={() => setPage(filter.page + 1)}
          className="bg-teal-500 text-white px-4 py-2 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-teal-600 transition duration-300"
        >
          Вперёд
        </button>
      </div>
    </>
  );
}
