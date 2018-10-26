<template>
    <view class="container">
        <view class="page-body">
            <!-- 轮播图 -->
            <swiper></swiper>
            <view class="pageBox">
                <view class="accordion">
                    <view class="listEvent">
                        <view class="listBtn listBtn1">
                            <text>特惠福利 消费金币送银币</text>
                        </view>
                        <view class="listCon">
                            <text>活动时间：10月25日00:00至10月29日24:00</text>
                            <text>活动时间：10月25日00:00至10月29日24:00</text>
                            <text>活动时间：10月25日00:00至10月29日24:00</text>
                            <text>活动时间：10月25日00:00至10月29日24:00</text>
                            <text>活动时间：10月25日00:00至10月29日24:00</text>
                            <text>活动时间：10月25日00:00至10月29日24:00</text>
                            <text>活动时间：10月25日00:00至10月29日24:00</text>
                            <text>活动时间：10月25日00:00至10月29日24:00</text>
                        </view>
                    </view>
                    <view class="listEvent">
                        <view class="listBtn listBtn2">
                            <text>特惠福利 75折起热卖VIP买1送1</text>
                        </view>
                        <view class="listCon"></view>
                    </view>
                    <view class="listEvent">
                        <view class="listBtn listBtn3">
                            <text>阿拉曼战役 经验大丰收</text>
                        </view>
                        <view class="listCon"></view>
                    </view>
                    <view class="listEvent">
                        <view class="listBtn listBtn4">
                            <text>首充返金100% 另送高级账号+500000银币+战场神器</text>
                        </view>
                        <view class="listCon"></view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 底部导航 -->
        <tabBar></tabBar>
    </view>
</template>
<script>
    import wepy from 'wepy';
    import api from "../../config/api";
    import auth from "../base/auth";
    import Swiper from "../../components/swiper";
    import tabBar from "../../components/tabBar";
    export default class Index extends auth {
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
            let result = await super.onLoad();
            if (!result) {
              return;
            }
        };
        //可用于页面模板绑定的数据
        data = {
            
        };
        //事件处理函数(集中保存在methods对象中)
        methods = {
            navJump(e){
                let that=this;
                let itemIndex=e.currentTarget.dataset.index;//操作元素绑定的index
                that.navActiveIndex=itemIndex;
            }
        };
        async onShow(){
            let that=this;
        };
        
    }
</script>
<style >
  
</style>