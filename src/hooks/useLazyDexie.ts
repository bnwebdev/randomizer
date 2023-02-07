import { useCallback, useEffect, useState } from "react";
import { DB } from "../types";
import { useDexie } from "./useDexie";

export const useLazyDexie = <Result, Args extends Array<unknown>>(
  callback: (database: DB, ...args: Args) => Promise<Result>
) => {
  const [args, setArgs] = useState<Args>();
  const [called, setCalled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setArgs(void 0);
    setError(void 0);
    setLoading(false);
    setCalled(false);
  }, [callback]);

  const data = useDexie(
    async (db) => {
      if (loading || !args || called) {
        return;
      }

      try {
        setLoading(true);
        const result = await callback(db, ...args);
        setCalled(true);

        return result;
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [loading, args, callback]
  );

  const lazyQuery = useCallback((...args: Args) => {
    setCalled(false);
    setArgs(args);
  }, []);

  const details = { called, loading, error, data };

  type LazyQuery = typeof lazyQuery;
  type Details = typeof details;

  return [lazyQuery, details] as [LazyQuery, Details];
};
