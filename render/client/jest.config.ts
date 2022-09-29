/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  clearMocks: true,
  coverageDirectory: "coverage",
  globals: {
    // ...
    window: true,
    ENABLE_INNER_HTML: true,
    ENABLE_ADJACENT_HTML: true,
    ENABLE_SIZE_APIS: true,
    ENABLE_TEMPLATE_CONTENT: true,
    ENABLE_CLONE_NODE: true,
    ENABLE_CONTAINS: true,
    ENABLE_MUTATION_OBSERVER: true,
  },
  moduleNameMapper: {
    // ...
    "@tarojs/taro": "@tarojs/taro-h5",
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "@tarojs/components": "@tarojs/components/dist-h5/react",
    "@tarojs/plugin-framework-react/dist/runtime": "<rootDir>/__mocks__/taro-framework",
  },
  transform: {
    ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform",
    "\\.(ts|tsx|js)$": ["babel-jest"],
  },
  watchman: true,
};
