<style lang="css">
.field__title--radius {
  padding-bottom: 10px;
}
</style>
<template>
<view>
    <view class="zan-panel-title">完善信息</view>
    <view class="zan-panel">
        <view class="zan-cell zan-field">
            <view class="zan-cell__hd zan-field__title">真实姓名</view>
            <input class="zan-field__input zan-cell__bd" bindinput="bindInput" data-name="fullname" type="text" placeholder="请输入姓名"/>
        </view>
        <view class="zan-cell zan-field"> 
            <view class="zan-cell__hd zan-field__title">手机号</view>
            <input type="number" class="zan-field__input zan-cell__bd" placeholder="请输入手机号"  bindinput="bindInput"  data-name="mobile" maxlength="11"/>
        </view>
        <view class="zan-cell zan-field">
            <view class="zan-cell__hd zan-field__title">验证码</view>
            <input class="zan-field__input zan-cell__bd" type="number" placeholder="请输入短信验证码" bindinput="bindInput"  data-name="checkcode" maxlength="6"/>
            <view class="zan-cell__ft">
                <button class="zan-btn zan-btn--mini zan-btn--primary" bindtap="sendCheckCode">{{checkcodebtn}}</button>
            </view>
        </view>
    </view>
    <view style="margin:25px 0;">
        <view class="zan-btns">
            <button class="zan-btn zan-btn--primary" bindtap="register" disabled="{{!submitbtnenable}}">确 定</button>
        </view>    
    </view>
</view>
</template>
<script>
import wepy from "wepy";
import api from "../../config/api";

var countdown = 0;
export default class Signup extends wepy.page {
  config = { enablePullDownRefresh: false };
  data = {
    base_name: {
      title: "真实姓名",
      placeholder: "姓名"
    },
    base_tel: {
      error: true,
      title: "手机号",
      inputType: "number",
      placeholder: "请输入手机号"
    },
    fullname: "",
    mobile: "",
    fromcode: "",
    isAgree: true,
    checkcode: "",
    checkcodebtn: "获取验证码",
    checkcodebtnenable: true,
    submitbtnenable: false,
    allowGetNum: false,
    originate: ""
  };

  async getPhoneNumber(e) {
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      console.info("同意授权", this.$parent.globalData.loginInfo);
      this.allowGetNum = true;
      if (!this.$parent.globalData.loginInfo.code) {
        this.allowGetNum = false;
        return;
      }
      let formdata = {
        code: this.$parent.globalData.loginInfo.code,
        iv: e.detail.iv,
        userInfo: this.$parent.globalData.loginInfo.userinfo,
        encryptedData: e.detail.encryptedData
      };
      let res = await this.$parent.globalData.post(
        `/auth/wxa/main/getusermobile`,
        formdata
      );
      if (res.data && res.data.phoneNumber) {
        this.mobile = res.data.phoneNumber;
        this.$apply();
      }
    } else if (e.detail.errMsg == "getPhoneNumber:fail user deny") {
      console.error("拒绝");
      this.allowGetNum = false;
    } else if (
      e.detail.errMsg == "getPhoneNumber:fail:cancel to confirm login"
    ) {
      console.error("取消");
      this.allowGetNum = false;
    }

    console.log(e.detail.errMsg == "getPhoneNumber:ok");
  }

  onLoad(options) {
    this.originate = options._originate ? options._originate : "";
    console.log("from auth originate info", this.originate);
    console.log("!!", this.$parent.globalData.token);
    console.log("??", this.$parent.globalData.loginInfo);
  }
  onShow() {
    console.log(this.$parent.globalData.userInfo);
  }
  methods = {
    async sendCheckCode(e) {
      let that = this;
      if (!this.checkcodebtnenable) return;
      if (!/^1\d{10}$/.test(that.data.mobile)) {
        wx.showModal({
          confirmColor: "#7ec792",
          title: "提示",
          showCancel: false,
          content: "手机号填写错误，请重新填写手机号！"
        });
        return;
      }
      this.checkcodebtnenable = false;
      this.checkcodebtn = `正在发送中`;
      let result = await this.$parent.globalData.post(
        `${api.api.auth.verifyCode.url}`,
        { mobile: this.mobile }
      );
      if (result.errorCode) {
        this.submitbtnenable = false;
        wx.showModal({
          confirmColor: "#7ec792",
          title: "提示",
          showCancel: false,
          content: result.message,
          success: function(res) {
            console.log(res);
            console.log(result);
          }
        });
        this.checkcodebtn = `获取验证码`;
        this.checkcodebtnenable = true;
      } else {
        this.submitbtnenable = true;
        let countdown = 60;
        let innerloop = setInterval(() => {
          countdown--;
          if (countdown == 0) {
            that.checkcodebtn = `获取验证码`;
            that.checkcodebtnenable = true;
            clearInterval(innerloop);
          } else {
            that.checkcodebtn = `${countdown} s`;
          }
          that.$apply();
        }, 1000);
      }
    },
    bindInput(e) {
      let key = e.currentTarget.dataset.name;
      this[key] = e.detail.value;
      this.$apply();
    },
    bindAgreeChange() {
      this.isAgree = !this.isAgree;
      this.$apply();
    },
    async register() {
      let that = this;
      let suggest = "";
      if (!this.isAgree) {
        wx.showModal({
          confirmColor: "#7ec792",
          title: "提示",
          showCancel: false,
          content: "请先阅读并同意条款！"
        });
        return;
      }
      if (!this.fullname.trim()) {
        wx.showModal({
          confirmColor: "#7ec792",
          title: "提示",
          showCancel: false,
          content: "请填写姓名哦"
        });
        return;
      }
      wx.showLoading({ title: "请稍后", mask: true });
      let result = await this.$parent.globalData.post(
        `${api.server}/auth/wxa/user/register`,
        {
          fullname: this.data.fullname,
          mobile: this.data.mobile,
          checkcode: this.data.checkcode
        }
      );
      // if (this.fromcode.trim() !== ''){
      //     console.log("去认证老师了...")
      //     let result1 = await this.$parent.globalData.post(`${api.server}/api/user/cert/save`,{code : this.fromcode})
      //     if (result1.state == 200){
      //         //注册老师成功
      //         suggest = "createnewclass";
      //     }
      // }
      wx.hideLoading();

      // console.error(result)
      // return;
      if (!!result.errorCode) {
        wx.showModal({
          confirmColor: "#7ec792",
          title: "提示",
          showCancel: false,
          content: result.messasge || "出错了，请重试"
        });
      } else {
        await this.$parent.globalData.refreshUserInfo();
        wx.showToast({
          title: "注册成功",
          icon: "success",
          duration: 2000
        });
        wx.setStorageSync("ttt", 1);
        setTimeout(function() {
          if (that.originate) {
            wx.reLaunch({ url: `/${decodeURIComponent(that.originate)}` });
          } else {
            wx.reLaunch({ url: "/pages/home/index?suggest=" + suggest });
          }
        }, 2000);
      }
    }
  };

  events = {
    zanFieldChange(e) {
      const { componentId, detail } = e;

      console.log("[zan:field:change]", componentId, detail);
    },

    zanFieldFocus(e) {
      const { componentId, detail } = e;

      console.log("[zan:field:focus]", componentId, detail);
    },

    zanFieldBlur(e) {
      const { componentId, detail } = e;

      console.log("[zan:field:blur]", componentId, detail);
    }
  };
}
</script>

<style lang="scss">
.zan-field {
  padding: 7px 15px;
  color: #333;
}

.zan-field--wrapped {
  margin: 0 15px;
  background-color: #fff;

  &::after {
    left: 0;
    border-width: 1px;
    border-radius: 4px;
  }
}

.zan-field--wrapped + .zan-field--wrapped {
  margin-top: 10px;
}

.zan-field--error {
  color: #f40;
}

/* 圆角输入框时，将边框也置红 */
.zan-field--wrapped.zan-field--error::after {
  border-color: #f40;
}

.zan-field__title {
  color: #333;
  min-width: 65px;
  padding-right: 10px;
}

.zan-field__input {
  flex: 1;
  line-height: 1.6;
  padding: 4px 0;
  min-height: 22px;
  height: auto;
  font-size: 14px;
}

.zan-field__placeholder {
  font-size: 14px;
}

.zan-field__input--right {
  text-align: right;
}
</style>