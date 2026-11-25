import { useSearchParams } from "react-router-dom";

export function useAppSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const get = (key) => searchParams.get(key);

  const set = (key, value) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(key, value);
      return newParams;
    });
  };

  const remove = (key) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete(key);
      return newParams;
    });
  };

  const setMany = (values, { replace = false } = {}) => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);

        Object.entries(values).forEach(([key, value]) => {
          if (value === "" || value === null || value === undefined) {
            newParams.delete(key);
          } else {
            newParams.set(key, value);
          }
        });

        return newParams;
      },
      { replace },
    );
  };

  const clear = () => setSearchParams(new URLSearchParams());

  return {
    get,
    set,
    setMany,
    remove,
    clear,
  };
}
