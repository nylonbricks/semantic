"use client";

import { useEffect, useState } from "react";

interface Category {
  emoji: string;
  id: string;
  name: string;
}
interface CategoriesResponse {
  repositoryId: string;
  categories: Category[];
}
interface ErrorResponse {
  error: string;
}
type Status = "NORMAL" | "LOADING" | "SUCCESS" | "FAIL";

const useDebounce = <T,>(value: T, delay = 500): T => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

export const useCategories = (repoInput: string) => {
  const [data, setData] = useState<CategoriesResponse | null>(null);
  const [status, setStatus] = useState<Status>("NORMAL");
  const repo = useDebounce(repoInput, 200);

  useEffect(() => {
    if (!repo) {
      setStatus("NORMAL");
      setData(null);
      return;
    }
    const controller = new AbortController();
    setStatus("LOADING");
    (async () => {
      try {
        const res = await fetch(
          `https://api.semantic.nylonbricks.com/giscus?repo=${encodeURIComponent(repo)}`,
          { signal: controller.signal }
        );
        const json = (await res.json()) as CategoriesResponse | ErrorResponse;
        if ("error" in json) {
          setStatus("FAIL");
          setData(null);
        } else {
          setStatus("SUCCESS");
          setData(json);
        }
      } catch {
        if (!controller.signal.aborted) {
          setStatus("FAIL");
          setData(null);
        }
      }
    })();
    return () => controller.abort();
  }, [repo]);

  return { data, status };
};
