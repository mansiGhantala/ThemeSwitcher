import { useEffect, useState } from 'react';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

type FetchState = {
  data?: Product[];
  loading: boolean;
  error?: string | null;
};

const CACHE_KEY = 'fakestore_products_cache_v1';
const CACHE_TTL_MS = 1000 * 60 * 5; 

interface CachedPayload {
  timestamp: number;
  products: Product[];
}


export function useFetchProducts(forceRefresh = false): FetchState {
  const [data, setData] = useState<Product[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      // attempt to read cache
      const cachedRaw = sessionStorage.getItem(CACHE_KEY);
      let parsed: CachedPayload | null = null;
      if (cachedRaw) {
        try {
          parsed = JSON.parse(cachedRaw) as CachedPayload;
        } catch {
          parsed = null;
        }
      }

      // if we have fresh cache and not forcing, use it immediately
      if (!forceRefresh && parsed && Date.now() - parsed.timestamp < CACHE_TTL_MS) {
        setData(parsed.products);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('https://fakestoreapi.com/products', { cache: 'no-store' });
        if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);
        const json: Product[] = await res.json();
        if (cancelled) return;

        setData(json);
        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            timestamp: Date.now(),
            products: json,
          } as CachedPayload)
        );
      } catch (e: any) {
        if (cancelled) return;
        // On failure, if we have any cache (even stale), use it as fallback
        if (parsed?.products) {
          setData(parsed.products);
          setError(`Using stale cache due to fetch error: ${e?.message || 'Unknown'}`);
        } else {
          setError(e?.message || 'Failed to fetch products');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [forceRefresh]);

  return { data, loading, error };
}
