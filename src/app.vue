
<style>
@import "style/app.wxss";
@import 'style/style/weui.wxss';
@import 'style/iconfont.wxss';
@import 'style/example.wxss';
</style>
<script>
import wepy from "wepy";
import "wepy-async-function";
import { api, server } from "./config/api";
import { socketinit } from "./socket/ioevent";
const EventBus = require("./util/eventbus");

export default class extends wepy.app {
  config = {
    pages: [
      "pages/home/index",
      "pages/auth/refreToken",
      "pages/auth/signup",
      "pages/auth/login"
    ],

    window: {
      backgroundTextStyle: "drak",
      navigationBarBackgroundColor: "#1a1a1a",
      backgroundColor: "#fff",
      navigationBarTitleText: "军功中心",
      navigationBarTextStyle: "white",
      enablePullDownRefresh: true
    },

    networkTimeout: {
      request: 10000,
      downloadFile: 10000
    },
    debug: false
  };

  Prequest(method = "GET") {
    let that = this;
    return function(url, data = {}, header = {}) {
      return new Promise(function(resolve, reject) {
        if (!that.globalData.token) {
          return reject("token is null");
        }
        let defaultheader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${that.globalData.token}`,
          Sourceorigin: "app",
          uid:wx.getStorageSync("user:detail").id
        };
        for (let key in header) {
          defaultheader[key] = header[key];
        }
        wx.request({
          url,
          data,
          method,
          header: defaultheader,
          success: function(res) {
            if (res && res.data) {
              if (res.data.errCode == "200002") {
                //token 失效
                wx.showModal({
                  confirmColor: "#7ec792",
                  content: `登陆凭证失效，重新获取中`,
                  showCancel: false,
                  success: async function() {
                    //失效之后
                    //1.获取新的 token
                    console.log("token 失效了，>>>>即将重新获取 userToken");
                    wx.removeStorageSync("user:token");
                    wx.removeStorageSync("user:expireTime");
                    //2.重新 onLauch 到首页
                    wx.reLaunch({ url: "/pages/auth/refreToken" });
                  }
                });
                wx.hideLoading();
                reject(res);
                return;
              } else if (res.data.errorCode) {
                console.error(res);
                let msg =
                  res.data.errorMsg || res.data.messasge || res.data.errmsg;
                wx.showModal({
                  confirmColor: "#7ec792",
                  content: msg,
                  showCancel: false
                });
                wx.removeStorageSync("user:token");
                wx.removeStorageSync("user:expireTime");
                wx.hideLoading();
                reject(res);
                return;
              }
            }
            resolve(res.data);
          },
          fail: function(err) {
            console.error("系统错误", err);
            wx.showModal({
              confirmColor: "#7ec792",
              content: err.errMsg || "出错了,请稍后再试",
              showCancel: false
            });
            wx.hideLoading();
            reject(err);
          }
        });
      });
    };
  }

  //上传文件
  Pupload() {
    let that = this;
    return function(url, filePath, name = "file", formData = {}, header = {}) {
      return new Promise(function(resolve, reject) {
        let defaultheader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${that.globalData.token}`,
          Sourceorigin: "app"
        };
        for (let key in header) {
          defaultheader[key] = header[key];
        }
        wx.uploadFile({
          url,
          filePath,
          name,
          formData,
          header: defaultheader,
          success: function(res) {
            console.log(res);
            resolve(res.data);
          },
          fail: function(err) {
            console.log("err, ", err);
            reject(err);
          }
        });
      });
    };
  }

  sleep = time => new Promise(resolve => setTimeout(resolve, time));

  constructor() {
    super();
    this.use("requestfix");
    this.use("promisify");
  }

  async onLaunch(options) {
    /*
        path	String	打开小程序的路径
        query	Object	打开小程序的query
        scene	Number	打开小程序的场景值
        shareTicket	String	shareTicket，详见 获取更多转发信息
        referrerInfo	Object	当场景为由从另一个小程序或公众号或App打开时，返回此字段
        referrerInfo.appId	String	来源小程序或公众号或App的 appId，详见下方说明
        referrerInfo.extraData	Object	来源小程序传过来的数据，scene=1037或1038时支持
        */

    let self = this;
    let result = wx.getSystemInfoSync(); //取运行环境
    self.globalData.environment = result.environment || "";
    if (result.environment == "wxwork") {
    }
    if (!!options.scene) {
      self.globalData.scene = options.scene; //huan
    }
    await self.initToken();
    if (!!options.shareTicket) {
      //发请求前先拿合法token
      self.globalData.shareTicket = options.shareTicket;
      // await sself.globalData.get(``)//发请求，告诉后端有ticket
    }
    wx.showLoading({ title: "加载中", mask: true });
    let userinfo = (self.globalData.userInfo =
      self.globalData.userInfo || wx.getStorageSync("user:detail"));
    if (!userinfo) {
      await self.refreshUserInfo();
    }
    await self._afterLaunch();
    wx.hideLoading();
  }
  async _afterLaunch() {
    console.log("after launch");
    console.log(this.globalData.userInfo);
    if (
      !!this.globalData.userInfo &&
      !!this.globalData.userInfo.userprofile &&
      this.globalData.userInfo.userprofile.cert_status == 1
    ) {
      socketinit(this);
    }
  }
  async initToken() {
    //初始化token 数据以globalData中为准
    let self = this;
    if (self.hasToken()) {
      self.globalData.token =
        self.globalData.token || wx.getStorageSync("user:token");
      let token_is_expired = await self.tokenIsExpired();
      if (token_is_expired) {
        await self.refreshToken();
      }
    } else {
      await self.login();
    }
  }

  async login() {
    let self = this;
    let login_result = await wepy.login();
    self.globalData.loginInfo.code = login_result.code;
    let formdata = {
      code: login_result.code,
      scene: self.globalData.scene,
      environment: self.globalData.environment
    };
    let res = await wepy.request({
      url: `${api.auth.authorize.url}`,
      data: formdata,
      method: "POST"
    });
    self.globalData.token = res.data.token;
    self.globalData.expireTime = res.data.expireTime;
    //self.globalData.userInfo=res.userInfo;
    wx.setStorageSync("user:token", self.globalData.token);
    wx.setStorageSync("user:expireTime", self.globalData.expireTime);
  }
  hasToken() {
    let self = this;
    let token = self.globalData.token || wx.getStorageSync("user:token");
    let expireTime =
      self.globalData.expireTime || wx.getStorageSync("user:expireTime");
    return !!token && !!expireTime;
  }
  async tokenIsExpired() {
    let self = this;
    let result = await self.globalData.get(`${api.auth.currentTime.url}`);
    let now = parseFloat(result.currenttime);
    let eptime = parseFloat(
      self.globalData.expireTime || wx.getStorageSync("user:expireTime")
    );
    console.log(
      ">>>>> 本地 token 的失效时间 VS 对比 server 时间差值(分钟）",
      (eptime - now) / 1000 / 60
    );
    if (eptime - now <= self.globalData.tokenLose) {
      //如果失效差值在规定范围之内，则重新刷取 token
      return true;
    } else {
      return false;
    }
  }
  async bindUser(fromUserid) {
    //用户做关联
    if (!fromUserid) {
      return;
    }
    let that = this;
    let userinfo = (that.globalData.userInfo =
      that.globalData.userInfo || wx.getStorageSync("user:detail"));
    if (!userinfo) {
      await that.globalData.refreshUserInfo();
    }
    userinfo = that.globalData.userInfo =
      that.globalData.userInfo || wx.getStorageSync("user:detail");

    if (userinfo.extra) {
      let extraobj = JSON.parse(userinfo.extra);
      if (extraobj.uids.indexOf(fromUserid + "") == -1) {
        let updateResult = await this.globalData.post(
          `${server}/auth/user/updateConnectUids`,
          { uid_from: fromUserid }
        );
      }
      await that.globalData.refreshUserInfo();
    } else {
      let updateResult = await this.globalData.post(
        `${server}/auth/user/updateConnectUids`,
        { uid_from: fromUserid }
      );
      await that.globalData.refreshUserInfo();
    }
  }

  //token 过期，刷新 token
  async refreshToken() {
    let newToken = await this.globalData.get(`${api.auth.refreshToken.url}`);
    this.globalData.token = newToken.token;
    this.globalData.expireTime = newToken.expireTime;
    wx.setStorageSync("user:token", this.globalData.token);
    wx.setStorageSync("user:expireTime", this.globalData.expireTime);
  }

  //刷新用户信息
  async refreshUserInfo() {
    let self = this;
    let res2;

    res2 = await this.globalData.get(`${api.auth.userDetail.url}`);
    let obj = res2;
    let userDetail = {};
    if (obj) {
      //兼容处理 userinfo
      let userProfiles = obj.UserProfiles[0];
      userDetail = Object.assign(
        {},
        obj,
        { userprofile: obj.UserProfiles[0] },
        { passport: obj.Passports }
      );
      delete userDetail.UserProfiles;
      delete userDetail.Passports;
    }
    self.globalData.userInfo = userDetail;
    wx.setStorageSync("user:detail", userDetail);
  }


  onShow() {
    // console.log("this is app on show")
    //此处管理正在背景播放的音乐
  }
  onHide() {
    // console.log("this is app on hide");
  }
  

  globalData = {
    sleep: this.sleep,
    get: this.Prequest("GET"),
    post: this.Prequest("POST"),
    upload: this.Pupload(),
    bindUser: this.bindUser,
    refreshUserInfo: this.refreshUserInfo.bind(this),
    userInfo: null,
    expireTime: null,
    token: null,
    scene: null,
    shareTicket: null,
    environment: null,
    tokenLose: 86400000, // 单位：毫秒，86400000：1天的毫秒数，倒计时1天之内的 token 失效，重新刷新 token
    clipboard: null,
    setting: {},
    io: null,
    socket1: null,
    loginInfo: {},
    chatmsg: [],
    EventBus: EventBus,
    macheid: null,
    machename:null,
    type:'queryall',
    operator:null,
    dollEditorArr:[],
  };
}
</script>