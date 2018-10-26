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
    export default class Swiper extends wepy.component{
    data = {
        imgUrls: [
                '../../images/focus1.jpg',
                '../../images/focus2.jpg',
                '../../images/focus1.jpg',
        ],
        indicatorDots: false,
        autoplay:true,
        interval:3000,
        duration:500,
    }
}
</script>

<style>

</style>

