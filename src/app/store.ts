import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"
import api from "./api"
import authSlice from "./authSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    api: api.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware)
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
