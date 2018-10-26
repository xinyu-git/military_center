import wepy from 'wepy';
import {
    getCurrentPageUrlWithArgs
} from '../../util/util'

export default class auth extends wepy.page {
    async onLoad(options) {
        let cp = getCurrentPageUrlWithArgs();
        let userinfo = this.$parent.globalData.userInfo = this.$parent.globalData.userInfo || wx.getStorageSync('user:detail') || {};
        userinfo.isRegister = !!userinfo.nickname;
        console.log(userinfo)
        console.log(!!userinfo.nickname)
        if (!!userinfo.isRegister) {
            return true;
        }
        wx.showModal({
            confirmColor: "#7ec792",
            title: '授权',
            content: '为给您提供更好的服务，请授权获取个人信息。',
            showCancel: false,
            success: function(res) {
                wx.redirectTo({
                    url: `/pages/auth/login?_originate=${encodeURIComponent(cp)}`
                })
            }
        })
    }
}