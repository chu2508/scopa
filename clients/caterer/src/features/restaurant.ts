import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../stories/store";
import { Shop } from "./types";

interface RestaurantState {
  shopList: Shop[];
  currentShopId: number;
  currentShop?: Shop;
}

const initialState: RestaurantState = {
  shopList: [],
  currentShopId: 0,
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setCurrentShopId(state, action: PayloadAction<number>) {
      return { ...state, currentShopId: action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(restaurantApi.endpoints.getShopList.matchFulfilled, (state, action) => {
        return { ...state, shopList: action.payload };
      })
      .addMatcher(restaurantApi.endpoints.getShop.matchFulfilled, (state, action) => {
        return { ...state, currentShop: action.payload, currentShopId: action.payload.id };
      });
  },
});

export const currentShopSelector = (state: RootState) =>
  state.restaurant.currentShop || state.restaurant.shopList.find((shop) => shop.id === state.restaurant.currentShopId);

export const restaurantApi = createApi({
  reducerPath: "restaurantApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => {
    return {
      getShopList: builder.query<Shop[], void>({
        query: () => ({ url: "/shops" }),
      }),
      getShop: builder.query<Shop, number>({
        query: (id) => `/shops/${id}`,
      }),
      getMenu: builder.query({
        query: (id) => `/menus/${id}`,
      }),
      getActivities: builder.query({
        query: (id) => `/activities/${id}`,
      }),
    };
  },
});
