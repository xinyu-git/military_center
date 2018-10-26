<template>
    <view class="container">
        <view class="page-body">
            <!-- 轮播图 -->
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
        </view>
        <view class="nav_box">
          <block wx:for="{{navList}}" wx:key="index">
            <view class="nav_item " >
              <navigator url="{{item.url}}">
                <image src='../../image/ico.png'></image>
                <text>{{item.text}}</text>
              </navigator>
            </view>
          </block>
        </view> 
    </view>
</template>
<script>
    import wepy from 'wepy';
    import api from "../../config/api";
    import auth from "../base/auth";
    export default class Index extends auth {
        config = {
            navigationBarTitleText: "军功中心"
        };
        async onShow(){
            
        };
        //页面的生命周期函数
        async onLoad() {
            let result = await super.onLoad();
            if (!result) {
              return;
            }
        };
        //可用于页面模板绑定的数据
        data = {
          imgUrls: [
                'https://raw.githubusercontent.com/xinyu-git/military_center/master/image/focus1.jpg',
                'https://raw.githubusercontent.com/xinyu-git/military_center/master/image/focus2.jpg',
                'https://raw.githubusercontent.com/xinyu-git/military_center/master/image/focus1.jpg',
            ],
            indicatorDots: false,
            autoplay:true,
            interval:3000,
            duration:500,
            navList:[
                {
                  url:'index',
                  text: '首页'
                },
                {
                  url:'pages/center/center',
                  text:'个人中心'
                },
                {
                  url:'pages/exchange/exchange',
                  text: '兑换'
                },
                {
                  url:'pages/activity/activity',
                  text: '往期活动'
                }
            ]
        };
        //事件处理函数(集中保存在methods对象中)
        methods = {
            
        };
        async onShow(){
            let that=this;
        };
        
    }
</script>
<style >
  
</style>