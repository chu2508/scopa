module.exports = {
  setStorageSync: jest.fn(),
  getStorageSync: jest.fn(),
  getSystemInfoSync: () => ({ platform: 'iOS', lang: 'zh_CN' }),
}
