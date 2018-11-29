<template>
    <view class="swiper-container">  
        <swiper indicator-dots="{{indicatorDots}}"
                  autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}">
            <block wx:for="{{imgUrls}}" wx:key="index">
                <swiper-item>
                    <image src="{{item}}" class="slide-image" />
                </swiper-item>
            </block>
        </swiper>   
    </view>
</template>

<script>
    import wepy from "wepy";
    import api from "../config/api";
    import imgUrls from "../util/swiper";
    export default class Swiper extends wepy.component{
        data = {
            //imgUrls: imgUrls.imgUrls,
            imgUrls:[],
            indicatorDots: false,
            autoplay:true,
            interval:3000,
            duration:500,
            exchangeData:[]
        };
        async onLoad(){
            let that = this;
            that.getImgUrl();
        }
        method = {  

        };
        //获取轮播图的数据
        async getImgUrl(){
            let that = this;
            let result = await that.$parent.$parent.globalData.get(
                `${api.server}/military_minor/json/swiper.json`
            );
            that.imgUrls=result;
            that.$apply();
        }
}
</script>

<style>

</style>

