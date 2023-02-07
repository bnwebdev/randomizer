// db.ts
import Dexie, { Table } from "dexie";
import { RandomDescription } from "../types";

export interface Random {
  id?: number;
  name: string;
  randomDescriptions: RandomDescription[];
}

export enum RandomLinkStatus {
  DRAFT,
  COMPLETED,
}
export interface RandomLink {
  id: string;
  creatorDescriptionId: number;
  descriptionId: number;
  createdAt: number;
  status: RandomLinkStatus;
}

export class RandomDexie extends Dexie {
  randoms!: Table<Random>;
  randomLinks!: Table<RandomLink>;

  constructor() {
    super("j-randoms-db");
    this.version(3).stores({
      randoms: "++id, name, *randomDescriptions", // Primary key and indexed props
      randomLinks:
        "++id, creatorDescriptionId, descriptionId, createdAt, status",
    });
  }
}

export const db = new RandomDexie();
