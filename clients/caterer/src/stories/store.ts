import { configureStore } from "@reduxjs/toolkit";
import { customerApi, customerSlice } from "../features/customer";
import { restaurantApi, restaurantSlice } from "../features/restaurant";

export const store = configureStore({
  reducer: {
    [restaurantApi.reducerPath]: restaurantApi.reducer,
    [restaurantSlice.name]: restaurantSlice.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [customerSlice.name]: customerSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(restaurantApi.middleware, customerApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
