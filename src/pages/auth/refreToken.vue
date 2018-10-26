<template>
<view class="page">
    <view style="text-align:center;color:#666;margin:40rpx auto;font-size:13px;">
       重新授权
    </view>
</view>

</template>
<script>
import wepy from "wepy";
import { api } from "../../config/api";
export default class refreToken extends wepy.page {
  async onLoad() {
    //此页面用于重新获取授权信息，token 已经失效，无法用旧的 token 获取新 token
    console.log(
      "refreshUserinfo ,into login method, we'll get token from server"
    );
    try {
      wx.showLoading({ title: "授权中", mask: true });
      this.$parent.globalData.appPrepare = true;
      let res1 = await wepy.login();
      let res2 = await wepy.getUserInfo();
      let formdata = {
        code: res1.code,
        iv: res2.iv,
        userInfo: res2.userInfo,
        encryptedData: res2.encryptedData
      };
      let res = await wepy.request({
        url: `${api.auth.authorize.url}`,
        data: formdata,
        method: "POST"
      });
      console.error("res", res);
      this.$parent.globalData.token = res.data.token;
      this.$parent.globalData.expireTime = res.data.expireTime;
      wx.setStorageSync("user:token", this.$parent.globalData.token);
      wx.setStorageSync("user:expireTime", this.$parent.globalData.expireTime);
      await this.$parent.globalData.refreshUserInfo();
      this.$parent.globalData.appPrepare = false;
      wx.hideLoading();
      setTimeout(() => {
        wx.reLaunch({ url: "/pages/home/index" });
      }, 600);
    } catch (e) {
      wx.hideLoading();
      let erroruser = this.$parent.globalData.userInfo;
      wx.reportAnalytics("token_error", {
        username: erroruser.fullname,
        errormessage: e.message,
        userid: erroruser.uid,
        time: new Date().getTime()
      });
      wx.showModal({
        confirmColor: "#7ec792",
        title: "token错误",
        content: "刷新失败,请尝试删除小程序",
        showCancel: false
      });
    }
  }
}
</script>