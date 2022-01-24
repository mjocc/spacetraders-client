import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { generateUrl } from '../../lib/utils';

export interface Loan {
  due: string;
  id: string;
  repaymentAmount: string;
  status: string;
  type: string;
}

export interface Loans {
  loans: Loan[];
}

export const spaceTradersApi = createApi({
  reducerPath: 'spaceTraders',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_PATH }),
  endpoints: (builder) => ({
    getLoans: builder.query<Loans, string | null>({
      query: (token) =>
        generateUrl('types/loans', token ? { token } : undefined),
    }),
  }),
});

export const { useGetLoansQuery } = spaceTradersApi;
