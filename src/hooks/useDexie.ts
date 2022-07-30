import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../database";

export const useDexie = <Type>(
  callback: (database: typeof db) => Promise<Type>,
  deps?: any[]
) => {
  return useLiveQuery<Type>(() => callback(db), deps);
};
