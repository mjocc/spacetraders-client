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

// TODO: complete this type
export interface MyLoan extends Loan {}

export interface Structure {
  type: string;
  name: string;
  price: number;
  allowedLocationTypes: string[];
  allowedPlanetTraits: string[];
  consumes: string[];
  produces: string[];
}

// TODO: complete this type
export interface MyStructure extends Structure {}

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

export interface MyShip extends Ship {
  id: string;
  cargo: any[]; // TODO: WHAT TYPE IS THIS?
  flightPlanId?: string;
  location: string;
  spaceAvailable: number;
  x: number;
  y: number;
}

export type WithToken<T extends {}> = T & { token: string | null };
