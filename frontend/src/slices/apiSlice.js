import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//THis is used because we are using async functionallity to talk to the backend
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({}),
});
