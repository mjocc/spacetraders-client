import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { generateUrl } from '../../../lib/utils';
import { Good, Loan, Ship } from './types';

export const spaceTradersApi = createApi({
  reducerPath: 'spaceTraders',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_PATH }),
  tagTypes: ['Loans', 'Goods', 'Ships'],
  endpoints: (builder) => ({
    getLoans: builder.query<Loan[], string | null>({
      query: (token) =>
        generateUrl('types/loans', token ? { token } : undefined),
      transformResponse: ({ loans }: { loans: Loan[] }) => loans,
      providesTags: ['Loans'],
    }),
    getGoods: builder.query<Good[], string | null>({
      query: (token) =>
        generateUrl('types/goods', token ? { token } : undefined),
      transformResponse: ({ goods }: { goods: Good[] }) => goods,
      providesTags: ['Goods'],
    }),
    getShips: builder.query<Ship[], string | null>({
      query: (token) =>
        generateUrl('types/ships', token ? { token } : undefined),
      transformResponse: ({ ships }: { ships: Ship[] }) => ships,
      providesTags: ['Ships'],
    }),
  }),
});

export const { useGetLoansQuery, useGetGoodsQuery, useGetShipsQuery } =
  spaceTradersApi;