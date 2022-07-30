// db.ts
import Dexie, { Table } from "dexie";
import { RandomDescription } from "../types";

export interface Random {
  id?: number;
  name: string;
  randomDescriptions: RandomDescription[];
}

export class RandomDexie extends Dexie {
  randoms!: Table<Random>;

  constructor() {
    super("j-randoms-db");
    this.version(1).stores({
      randoms: "++id, name, *randomDescriptions", // Primary key and indexed props
    });
  }
}

export const db = new RandomDexie();
