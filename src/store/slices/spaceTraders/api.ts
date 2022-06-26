import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { generateUrl } from '../../../lib/utils';
import { Good, Loan, Ship, Structure, User, WithToken } from './types';

export const spaceTradersApi = createApi({
  reducerPath: 'spaceTraders',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_PATH }),
  tagTypes: ['User', 'Goods', 'Loans', 'Structures', 'Ships'],
  endpoints: (builder) => ({
    getUser: builder.query<User, string | null>({
      query: (token) => generateUrl('my/account', { token }),
      transformResponse: ({ user }) => user,
      providesTags: ['User'],
    }),
    getGoods: builder.query<Good[], string | null>({
      query: (token) => generateUrl('types/goods', { token }),
      transformResponse: ({ goods }) => goods,
      providesTags: ['Goods'],
    }),
    getLoans: builder.query<Loan[], string | null>({
      query: (token) => generateUrl('types/loans', { token }),
      transformResponse: ({ loans }) => loans,
      providesTags: ['Loans'],
    }),
    getStructures: builder.query<Structure[], string | null>({
      query: (token) => generateUrl('types/structures', { token }),
      transformResponse: ({ structures }) => structures,
      providesTags: ['Structures'],
    }),
    getShips: builder.query<Ship[], string | null>({
      query: (token) => generateUrl('types/ships', { token }),
      transformResponse: ({ ships }) => ships,
      providesTags: ['Ships'],
    }),
    takeOutLoan: builder.mutation<
      { credits: number; loan: Loan },
      WithToken<{ type: string }>
    >({
      query: ({ token, ...body }) => ({
        url: generateUrl('my/loans', { token }),
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Loans'],
      async onQueryStarted({ token }, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { credits },
          } = await queryFulfilled;
          dispatch(
            spaceTradersApi.util.updateQueryData('getUser', token, (draft) => {
              draft.credits = credits;
            })
          );
        } catch {}
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetGoodsQuery,
  useGetLoansQuery,
  useGetStructuresQuery,
  useGetShipsQuery,
  useTakeOutLoanMutation,
} = spaceTradersApi;
