<template>
    <view class="container">
        <view class="page-body">
            <!-- 轮播图 -->
            <swiper></swiper>
            <view class="pageBox">
                <!-- 个人信息/领奖记录 -->
                <view class="info-tab">
                    <view class="info-tab-list {{currentTab==0 ? 'on' : ''}}" data-current="0" @tap="tabNav">个人信息</view>
                    <view class="info-tab-list {{currentTab==1 ? 'on' : ''}}" data-current="1" @tap="tabNav">领奖记录</view>
                </view>
                <view class="info-content" >
                    <!-- 个人信息 -->
                    <view class="info-item {{currentTab==0 ? 'show' : ''}}" >
                        <view class="info-box">
                            <view class="info-line">
                                <label>昵称：</label>
                                <text>handry</text>
                            </view>
                            <view class="info-line">
                                <label>大区：</label>
                                <text>联通北方区</text>
                            </view>
                            <view class="info-line">
                                <label>现有军功：</label>
                                <text>4870</text>
                            </view>
                            <view class="info-line">
                                <label>总共获得军功：</label>
                                <text>48700</text>
                            </view>
                        </view>
                    </view>
                    <!-- 领奖记录 -->
                    <view class="info-item {{currentTab==1 ? 'show' : ''}}">
                        <view class="rewardTable">
                            <view class="tr tableTit">
                                <view class="th th1">活动名称</view>
                                <view class="th th2">活动奖励</view>
                                <view class="th th3">领取状态</view>
                            </view>
                            <view class="tr" wx:for="{{tableInfo}}" wx:key="index">
                                <view class="td td1">{{item.actName}}</view>
                                <view class="td td2">{{item.actReward}}</view>
                                <view class="td td3">{{item.getStatus}}</view>
                            </view>
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
        </view>
        <!-- 底部导航 -->
        <tabBar :tabBar.sync="tabBarData"></tabBar>
        <!-- 登录弹窗 -->
        <view class="modal-content" style="display:none;">
            <view class="modal-mask"></view>
            <view class="modal-dialog">
                <view class="modal-btn"><button class="btn-close"></button></view>
                <view class="modal-Info" >
                    <text>恭喜您获得</text>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
    import wepy from 'wepy';
    import api from "../../config/api";
    import auth from "../base/auth";
    import Swiper from "../../components/swiper";
    import tabBar from "../../components/tabBar";
    export default class Center extends auth {
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
            that.tabBarData = that.$parent.tabBarClickHandle(1, this);
            that.$apply();
        };
        //可用于页面模板绑定的数据
        data = {
            tabBarData:{},
            listContent:[
                {
                    id:'01',
                    itemClass:'listBtn1',
                    listTitle:'特惠福利 消费金币送银币',
                    contents:'活动时间：10月25日00:00至10月29日24:00',
                    shows:true
                },
                {
                    id:'02',
                    itemClass:'listBtn2',
                    listTitle:'特惠福利 75折起热卖VIP买1送1',
                    contents:'活动时间：10月25日00:00至10月29日24:00活动时间：10月25日00:00至10月29日24:00活动时间：10月25日00:00至10月29日24:00活动时间：10月25日00:00至10月29日24:00',
                    shows:false
                },
                {
                    id:'03',
                    itemClass:'listBtn3',
                    listTitle:'阿拉曼战役 经验大丰收',
                    contents:'活动时间：10月25日00:00至10月29日24:00',
                    shows:false
                },
                {
                    id:'04',
                    itemClass:'listBtn4',
                    listTitle:'首充返金100% 另送高级账号+500000银币+战场神器',
                    contents:'活动时间：10月25日00:00至10月29日24:00',
                    shows:false
                }
            ],
            listCurrIndex:0,
            currentTab:0,
            tableInfo:[
                {
                    actName:'辉煌的征程',
                    actReward:'银币 5000',
                    getStatus:'未领取'
                },
                {
                    actName:'辉煌的征程1',
                    actReward:'银币 4000',
                    getStatus:'未领取'
                },
                {
                    actName:'辉煌的征程2',
                    actReward:'银币 5000',
                    getStatus:'未领取'
                }
            ]
        };
        //事件处理函数(集中保存在methods对象中)
        methods = {
            showHide(e){
                let that = this;
                let contentFor = that.listContent;      
                let itemIndex=e.currentTarget.dataset.index;//操作元素绑定的index  
                for(let i=0;i<contentFor.length;i++){
                    if(e.currentTarget.dataset.changeid == contentFor[i].id){
                        if(that.listContent[i].shows){
                            that.listContent[i].shows = false;
                        }else{
                            that.listContent[i].shows = true;
                            that.listCurrIndex=itemIndex;   
                        }
                    }else{
                        that.listContent[i].shows = false;
                    }
                }
            },
            tabNav(e){
                let that=this;
                let itemIndex=e.currentTarget.dataset.current;//操作元素绑定的index 
                that.currentTab=itemIndex;
            }
        };
        async onShow(){
            let that=this;
        };
        
    }
</script>
<style >
  
</style>