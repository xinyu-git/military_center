<template>
<view class="page">
    <view style="margin:60px 0;text-align:center;font-size:16px;color:#666;">
        <image src="../../images/pclogin.png" style="display:block;margin:auto;width:240px;height:218px;"/>
        <view>登陆授权</view>
    </view>
    <view style="margin:60px 0">
        <view class="zan-btns">
            <button class="zan-btn zan-btn--primary"  open-type="getUserInfo" bindgetuserinfo="agree"> 授权 </button>
        </view>    
    </view>
</view>

</template>
<script>
import wepy from "wepy";
import config from "../../config/api";
import { api } from "../../config/api";
export default class loginPc extends wepy.page {
  config = { navigationBarTitleText: "授权" };
  components = {};
  data = {
    key: "",
    canclick: true,
    showMainpage: false
  };
  async onLoad(options) {
    //进入到页面的时候，对告诉服务器，要lock住这个key
    this.key = options.key || options.scene;
    this._originate = options._originate;
  }
  methods = {
    async agree(e) {
      let res1 = await wepy.login();
      let res2 = e.detail;
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
      await this.$parent.globalData.refreshUserInfo();
      console.log("/" + decodeURIComponent(this._originate));
      wx.reLaunch({ url: "/" + decodeURIComponent(this._originate) });
    }
  };
}
</script>
