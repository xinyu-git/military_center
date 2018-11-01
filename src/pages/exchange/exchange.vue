<template>
    <view class="container">
        <view class="page-body">
            <!-- 轮播图 -->
            <swiper></swiper>
            <view class="pageBox">
                <view class="exchangeBox">
                    <view class="userCount">个人军功：0</view>
                    <view class="exTitle">军武良品</view>
                    <view class="exchangeList">
                        <block wx:for="{{exchangeList}}" wx:key="index">
                            <view class="exchangeItem">
                                <view class="rewardBox">
                                    <image src="{{item.src}}" />
                                    <text>{{item.name}}</text>
                                </view>
                                <button class="btn-exchange">{{item.number}}</button>
                            </view>
                        </block>
                    </view>
                    <view class="exTitle">永久坦克</view>
                    <view class="exchangeList">
                        <block wx:for="{{exchangeList}}" wx:key="index">
                            <view class="exchangeItem">
                                <view class="rewardBox">
                                    <image src="{{item.src}}" />
                                    <text>{{item.name}}</text>
                                </view>
                                <button class="btn-exchange">{{item.number}}</button>
                            </view>
                        </block>
                    </view>
                </view>
            </view>
        </view>
        <!-- 底部导航 -->
        <tabBar :tabBar.sync="tabBarData"></tabBar>
    </view>
</template>
<script>
    import wepy from 'wepy';
    import api from "../../config/api";
    import auth from "../base/auth";
    import Swiper from "../../components/swiper";
    import tabBar from "../../components/tabBar";
    export default class Exchange extends auth {
        config = {
            navigationBarTitleText: "军功中心"
        };
        components = {
            swiper: Swiper,
            tabBar: tabBar
        };
        async onShow(){
            
        };
        //页面的生命周期函数 
        async onLoad() {
            let that=this;
            that.tabBarData = that.$parent.tabBarClickHandle(2, this);
            that.$apply();
        };
        //可用于页面模板绑定的数据
        data = {
            tabBarData:{},
            exchangeList:[
                {
                    src:'../../images/r1.png',
                    name:'C系定制中坦59式手表',
                    number:'15888军功'
                },
                {
                    src:'../../images/r1.png',
                    name:'坦克世界1:72 百运模型',
                    number:'15588军功'
                },
                {
                    src:'../../images/r1.png',
                    name:'哈罗恩棉油打火机',
                    number:'15888军功'
                },
                {
                    src:'../../images/r1.png',
                    name:'C系定制中坦59式手表',
                    number:'15848军功'
                },
                {
                    src:'../../images/r1.png',
                    name:'坦克世界1:72 百运模型',
                    number:'15888军功'
                },
                {
                    src:'../../images/r1.png',
                    name:'哈罗恩棉油打火机',
                    number:'15488军功'
                }
            ]
        };
        //事件处理函数(集中保存在methods对象中)
        methods = {
            
        };
        async onShow(){
            
        };
        
    }
</script>
<style >
.exchangeBox{
    font-size:24rpx;
}
.userCount{
    color:#ffc948;
    line-height: 68rpx;
    text-align: center;
    margin-bottom: 10rpx;
    background: url(https://raw.githubusercontent.com/xinyu-git/military_center/master/src/images/exV.png) no-repeat center 0;
    background-size:auto 100%;
}
.exTitle{
    text-align: center;
    line-height: 40rpx;
    color: #e06d30;
    background: url(https://raw.githubusercontent.com/xinyu-git/military_center/master/src/images/h4.png) no-repeat center 0;
    background-size:auto 100%;
    margin-bottom: 10rpx;
}
.exchangeList{
    text-align: center;
    margin-bottom: 30rpx;
}
.exchangeItem{
    display: inline-block;
    margin:10rpx 10rpx;
}
.rewardBox{
    width:220rpx;
    height: 220rpx;
    margin-bottom:10rpx;
    background: url(https://raw.githubusercontent.com/xinyu-git/military_center/master/src/images/jlbg.png) no-repeat center top;
    background-size:100% 100%;
    position: relative;
}
.rewardBox image{
    display: block;
    width:100%;
    height: 125rpx;
    padding-top:15rpx;
}
.rewardBox text{
    font-size:24rpx;
    color:#fff4f4;
    background: #7f0e09;
    padding:5rpx 10rpx;
    line-height: 30rpx;
    position: absolute;
    left:0;
    bottom:0;
}
.btn-exchange{
    width:200rpx;
    font-size:22rpx;
    color:#352000;
    background: url(https://raw.githubusercontent.com/xinyu-git/military_center/master/src/images/jlbg1.png) repeat-x center top;
    background-size:10rpx 40rpx;
    line-height: 40rpx;
}
</style>