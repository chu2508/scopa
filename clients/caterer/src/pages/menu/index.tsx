import { Button } from "@taroify/core";
import { View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { FC, ReactNode, useEffect } from "react";
import { customerApi } from "../../features/customer";
import { currentShopSelector, restaurantApi } from "../../features/restaurant";
import { useAppSelector } from "../../stories/hooks";

const useCurrentShop = () => {
  const { params } = useRouter<{ shopId?: string }>();
  const routeShopId = Number(params.shopId);
  const { data, isLoading } = restaurantApi.useGetShopQuery(routeShopId ?? { skip: true });

  return { shop: data, isLoading, routeShopId };
};

const CustomerSetup = () => {
  const { data: location, isLoading, refetch: refetchLocation } = customerApi.useGetLocationQuery();
  const hasLocationPermission = useAppSelector((state) => state.customer.hasLocationPermission);

  if (isLoading) {
    return <View>Location loading...</View>;
  }

  if (!hasLocationPermission || !location) {
    return (
      <View className='mt-20 px-4'>
        <Button
          color='primary'
          block
          shape='round'
          openType='openSetting'
          onOpenSetting={(e) => {
            if (e.detail.authSetting["scope.userLocation"]) {
              refetchLocation();
            }
          }}
        >
          去设置
        </Button>
      </View>
    );
  }

  return (
    <View>
      Location {location.latitude} {location.longitude}
    </View>
  );
};

export default function MenuPage() {
  return <CustomerSetup />;
}
