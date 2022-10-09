export default defineAppConfig({
  pages: ["pages/index/index", "pages/menu/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  requiredPrivateInfos: ["getLocation", "onLocationChange", "startLocationUpdate", "chooseAddress"],
  permission: {
    "scope.userLocation": {
      desc: "test",
    },
  },
});
