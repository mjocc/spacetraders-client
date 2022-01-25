import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { generateUrl } from '../../lib/utils';

export interface Loan {
  amount: number;
  collateralRequired: boolean;
  rate: number;
  termInDays: number;
  type: string;
}

export interface Loans {
  loans: Loan[];
}

export interface Good {
  name: string;
  symbol: string;
  volumePerUnit: number;
}

export interface Goods {
  goods: Good[];
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

export interface Ships {
  ships: Ship[]
}

export const spaceTradersApi = createApi({
  reducerPath: 'spaceTraders',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_PATH }),
  endpoints: (builder) => ({
    getLoans: builder.query<Loans, string | null>({
      query: (token) =>
        generateUrl('types/loans', token ? { token } : undefined),
    }),
    getGoods: builder.query<Goods, string | null>({
      query: (token) =>
        generateUrl('types/goods', token ? { token } : undefined),
    }),
    getShips: builder.query<Ships, string | null>({
      query: (token) =>
        generateUrl('types/ships', token ? { token } : undefined),
    }),
  }),
});

export const { useGetLoansQuery, useGetGoodsQuery, useGetShipsQuery } = spaceTradersApi;
