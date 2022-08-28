import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../database";
import { DB } from "../types";

export const useDexie = <Type>(
  callback: (database: DB) => Promise<Type>,
  deps?: any[]
) => {
  return useLiveQuery<Type>(() => callback(db), deps);
};
