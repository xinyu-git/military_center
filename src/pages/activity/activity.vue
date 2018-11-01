<template>
    <view class="container">
        <view class="page-body">
            <!-- 轮播图 -->
            <swiper></swiper>
            <view class="pageBox">
                <view class="activityBox">
                    <view class="activityList">
                        <block wx:for="{{activityList}}" wx:key="index">
                            <view class="activityItem">
                                <view class="activityName">
                                    <text>{{item.name}}</text>
                                </view>
                                <view class="activityTime">
                                    <text>{{item.time}}</text>
                                </view>
                            </view>
                        </block>
                    </view>
                    <!-- 分页 -->
                    <view class="page">
                        <text>1/1</text>
                        <button class="page-btn prev">上一页</button>
                        <button class="page-btn nextPage">下一页</button>
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
    export default class Activity extends auth {
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
            that.tabBarData = that.$parent.tabBarClickHandle(3, this);
            that.$apply();
        };
        //可用于页面模板绑定的数据
        data = {
            tabBarData:{},
            activityList:[
                {
                    name:'热血混战热血混战热血混战热血混战热血混战热血混战热血混战',
                    time:'2018/10/1'
                },
                {
                    name:'热血混战',
                    time:'2018/11/1'
                },
                {
                    name:'辉煌的征程',
                    time:'2018/10/1'
                },
                {
                    name:'热血混战',
                    time:'2018/12/1'
                },
                {
                    name:'热血混战',
                    time:'2018/10/1'
                },
                {
                    name:'辉煌的征程',
                    time:'2018/10/2'
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
.activityList{
    width:622rpx;
    margin:0 auto 30rpx;
    padding:30rpx 40rpx;
    background: url(https://raw.githubusercontent.com/xinyu-git/military_center/master/src/images/infobg.png) no-repeat center top #1a1919;
    background-size:100% 510rpx;
}
.activityItem{
    display: flex;
    justify-content: space-between;
    font-size:26rpx;
    color:#fafafa;
    margin:15rpx 0;
}
.activityName{
    width:430rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.activityTime{
    color:#a8a8a8;
}
</style>