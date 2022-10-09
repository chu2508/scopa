import mockjs from "mockjs";

const mockShop = {
  location: {
    longitude: 32.1,
    latitude: 22.31,
    name: "福州市XXX路xx号",
  },
  businessDates: {
    days: [1, 2, 3, 4, 5, 6, 7],
    times: [["09:00", "23:00"]],
  },
};

export default {
  "GET /api/shops": mockjs.mock({
    "result|8": [
      {
        "id|+1": 1,
        name: "@ctitle(3,5)",
        ...mockShop,
      },
    ],
    code: 200,
  }),
  "GET /api/shops/:id": mockjs.mock({
    result: {
      id: 1,
      name: "@ctitle(3,5)",
      ...mockShop,
    },
    code: 200,
  }),
  "GET /api/menus/:shopId": mockjs.mock({
    result: {
      id: 1,
      shopId: 1,
      name: "测试菜单",
      "categories|4": [{ "id|+1": 1, name: "@ctitle(4)", icon: "@image(100x100, @color, FFF, @name)" }],
      "items|40": [
        {
          "id|+1": 1,
          "categoryId|1-4": 1,
          name: "@cword(3,8)",
          mainPicture: "@image(100x100, @color, FFF, @name)",
        },
      ],
    },
    code: 200,
  }),
};
