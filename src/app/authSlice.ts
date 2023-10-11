import { createSlice } from "@reduxjs/toolkit"
import api from "./api"
import type { RootState } from "./store"
import { User } from "./types"

type AuthState = {
  user: User | null
}

const initialState: AuthState = { user: null }

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.user = null
    },
    sampleError: () => {
      throw Error("Example error in reducer")
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user

        throw Error("Example error in addMatcher")
      },
    )
  },
})

export default authSlice

export const selectCurrentUser = (state: RootState) => state.auth.user
