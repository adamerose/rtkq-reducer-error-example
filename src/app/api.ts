import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "./store"
import { User, UserLogin } from "./types"

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.realworld.io/api",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.user?.token
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
    // Artificial delay
    fetchFn: async (args) => {
      await new Promise((r) => setTimeout(r, 500))
      return fetch(args)
    },
  }),
  endpoints: (builder) => ({
    // User
    login: builder.mutation<{ user: User }, UserLogin>({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
})

export const endpoints = api.endpoints

export default api
