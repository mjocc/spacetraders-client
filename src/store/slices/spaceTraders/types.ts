export interface User {
  credits: number;
  joinedAt: string;
  shipCount: number;
  structureCount: number;
  username: string;
}

export interface Good {
  name: string;
  symbol: string;
  volumePerUnit: number;
}

export interface Loan {
  amount: number;
  collateralRequired: boolean;
  rate: number;
  termInDays: number;
  type: string;
}

export interface Structure {
  type: string;
  name: string;
  price: number;
  allowedLocationTypes: string[];
  allowedPlanetTraits: string[];
  consumes: string[];
  produces: string[];
}

export interface Ship {
  type: string;
  class: string;
  maxCargo: number;
  loadingSpeed: number;
  speed: number;
  manufacturer: string;
  plating: number;
  weapons: number;
  restrictedGoods?: string[];
}

export type WithToken<T extends {}> = T & { token: string | null };
