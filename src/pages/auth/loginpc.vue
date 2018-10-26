<template>
<view class="page">
    <view style="margin:60px 0;text-align:center;font-size:16px;color:#666;">
        <image src="../../images/pclogin.png" style="display:block;margin:auto;width:240px;height:218px;"></image>
        <view>电脑端登陆确认</view>
    </view>
    <view style="margin:60px 0">
        <view class="zan-btns">
            <button class="zan-btn zan-btn--primary" bindtap="agree" disabled="{{canclick}}"> 确认登陆 </button>
            <button class="zan-btn zan-btn--primary" bindtap="go2mainpage" wx:if="{{showMainpage}}"> 去往首页</button>
        </view>    
    </view>
</view>

</template>
<script>
    import wepy from 'wepy'
    import config from '../../config/api'

    export default class loginPc extends wepy.page {
        
        config = {"navigationBarTitleText": "授权"}
        components= {
        }
        data = {
            key: '',
            canclick : true,
            showMainpage : false
        }
        async onLoad(options) {
            //进入到页面的时候，对告诉服务器，要lock住这个key
            this.key = options.key || options.scene;
            let result = await this.$parent.globalData.post(`${config.server}/auth/wxa/prepareAuthorize4PC?key=${this.key}`);
            if (result.errorCode){
                wx.showToast({
                    title: result.errmsg,
                    icon: 'success',
                    duration: 2000
                })
                this.showMainpage  = true;
                this.$apply();
                return ;
            }
            if (result.status == -1){
                wx.showToast({
                    title: result.message,
                    icon: 'success',
                    duration: 2000
                })
                this.showMainpage  = true;
                this.$apply();
                return;
            }
            this.canclick = false;
            this.$apply();
        }
        

        methods = {
            async agree(){
                let result = await this.$parent.globalData.post(`${config.server}/auth/wxa/authorize4PC?key=${this.key}`);
                if (result.errorCode){
                    wx.showToast({
                        title: result.errmsg,
                        icon: 'success',
                        duration: 2000
                    })
                    this.showMainpage  = true;
                    this.$apply();
                    return ;
                }
                if (result.status == -1){
                    wx.showToast({
                        title: result.message,
                        icon: 'success',
                        duration: 2000
                    })
                    this.showMainpage  = true;
                    this.$apply();
                    return;
                }
                
                wx.showToast({
                    title: '授权成功',
                    icon: 'success',
                    duration: 2000
                })
                
                setTimeout(function(){
                    wx.reLaunch({url: '/pages/home/index'})
                },2000)
            }
        }
    }
</script>
