<template>
    <view class="nav_box">
        <block wx:for="{{navList}}" wx:key="index">
            <view class="nav_item {{navActiveIndex==index ? 'nav_itemActive' : ''}}" @tap="navJump" data-index="{{index}}">
              <navigator url="{{item.pagePath}}">
                <image src='../../images/ico.png' />
                <text>{{item.text}}</text>
              </navigator>
            </view>
        </block>
    </view> 
</template>

<script>
    import wepy from "wepy";
    export default class Swiper extends wepy.component{
    data = {
        navList:[
            {
              pagePath:'index',
              text: '首页'
            },
            {
              pagePath:'pages/center/center',
              text:'个人中心'
            },
            {
              pagePath:'pages/exchange/exchange',
              text: '兑换'
            },
            {
              pagePath:'pages/activity/activity',
              text: '往期活动'
            }
        ],
        navActiveIndex:0
    }
}
</script>

<style>

</style>

