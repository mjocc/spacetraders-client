export interface User {
  credits: number;
  joinedAt: string;
  shipCount: number;
  structureCount: number;
  username: string;
}

export interface Loan {
  amount: number;
  collateralRequired: boolean;
  rate: number;
  termInDays: number;
  type: string;
}

export interface Good {
  name: string;
  symbol: string;
  volumePerUnit: number;
}

export interface Ship {
  class: string;
  manufacturer: string;
  maxCargo: number;
  plating: number;
  speed: number;
  type: string;
  weapons: number;
}
