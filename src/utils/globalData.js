export default class GlobalData {
  constructor() {
    this.userInfo = {}; //用户信息
  }

  static getInstance() {
    //单例
    if (!GlobalData.instance) {
      GlobalData.instance = new GlobalData();
    }
    return GlobalData.instance;
  }
}
