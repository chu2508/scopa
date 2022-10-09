import { createSlice } from "@reduxjs/toolkit";
import { Point } from "@core/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import Taro from "@tarojs/taro";

type CustomerState = {
  hasLocationPermission: boolean;
};

const initialState: CustomerState = {
  hasLocationPermission: false,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(customerApi.endpoints.getLocation.matchRejected, (state) => {
        return { ...state, hasLocationPermission: false };
      })
      .addMatcher(customerApi.endpoints.getLocation.matchFulfilled, (state) => {
        return { ...state, hasLocationPermission: true };
      });
  },
});

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => {
    return {
      /** 获取顾客当前位置，会实时更新位置的改变 */
      getLocation: builder.query<Point, void>({
        queryFn: async () => {
          await Taro.authorize({ scope: "scope.userLocation" });
          const res = await Taro.getLocation({ type: "gcj02" });
          return { data: res };
        },
        onCacheEntryAdded: async (arg, api) => {
          const updateLocation: Taro.onLocationChange.Callback = (res) => api.updateCachedData(() => res);
          await Taro.startLocationUpdate();
          try {
            await api.cacheDataLoaded;
            // 在顾客位置变化时更新位置
            Taro.onLocationChange(updateLocation);
          } catch (error) {}

          await api.cacheEntryRemoved;
          Taro.offLocationChange(updateLocation as any);
          Taro.stopLocationUpdate();
        },
      }),
    };
  },
});
