<template>
    <view class="container">
        <view class="page-body">
            <!-- 轮播图 -->
            <swiper></swiper>
            <view class="pageBox">
                <!-- 手风琴 -->
                <view class="accordion">
                    <block wx:for="{{listContent}}" wx:key="index">
                        <view class="listEvent" >
                            <view class="listBtn {{item.itemClass}} {{ listCurrIndex == index ? 'listBtnCurr' : ''}}" data-changeid="{{item.id}}" @tap="showHide" data-index="{{index}}">
                                <text>{{item.listTitle}}</text>
                            </view>
                            <view class="listCon" style="height:{{item.shows?'380':0}}rpx;">
                                <scroll-view scroll-y  class="scrollView " style="height:{{item.shows?'300':0}}rpx;">
                                    <block wx:for="{{item.contents}}" wx:key="index">
                                        <view wx:if="{{item.type=='text'}}" class="listText">
                                            <text style="color:{{item.color}}">{{item.value}}</text>
                                        </view>
                                        <view wx:elif="{{item.type=='table'}}" class="listTable">
                                            <view class="table-outer-box">
                                                <block wx:for="{{item.value}}" wx:key="index">
                                                    <view class="table table-theme table-flex" wx:if="{{item.type=='th'}}">
                                                        <view class="itemTh" wx:for="{{item.thTheme}}" wx:key="{{index}}">
                                                            <text>{{item.thName}}</text>
                                                        </view>
                                                    </view>
                                                    <view class="table table-item table-flex" wx:if="{{item.type=='td'}}" wx:key="{{index}}">
                                                        <block wx:for="{{item.tdTheme}}" wx:key="{{index}}" >                 
                                                            <view class="item">
                                                                <block wx:for="{{item.value}}" wx:key="{{index}}" >
                                                                    <view class="item2" style="height:{{item.rowspan >1 ?(item.rowspan*60):60}}rpx;">
                                                                        <text>{{item.tdName}} </text>
                                                                    </view>
                                                                </block>
                                                            </view>
                                                        </block>
                                                    </view>
                                                </block>
                                            </view>                                       
                                        </view>
                                    </block>
                                </scroll-view>
                            </view>
                        </view>
                    </block>
                </view>
            </view>
        </view>
        <!-- 悬浮 -->
        <view class="btn-suspend" @tap="getReward"></view>
        <!-- 底部导航 -->
        <tabBar  :activeIndex.sync="activeIndex" @jumpFn.user="jump"></tabBar>
        <!-- 登录弹窗  -->
        <register :modalShow.sync="showLogin"  @hideFn.user="close"></register>
        <!-- 提示文本弹窗  showBtn显示按钮 btnNum按钮的数量 btnNum:1——确定  btnNum:2——确定/取消-->
        <modal :modalShow.sync="showModal" :showBtn.sync="showBtn" :btnNum.sync="btnNum" :modalMsg.sync="modalMsg" @hideFn.user="close" @confirmFn.user="confirm"></modal>
        <!-- 奖品列表弹窗  -->
        <reward :modalShow.sync="showReward" :rewardData.sync="rewardData" @hideFn.user="close" @acceptReward.user="acceptReward"></reward>
    </view>
</template>
<script>
    import wepy from 'wepy';
    import api from "../../config/api";
    //import auth from "../base/auth";
    import Swiper from "../../components/swiper";
    import tabBar from "../../components/tabBar";
    import Register from "../../components/register";
    import Modal from "../../components/modal";
    import Reward from "../../components/reward";
    //import listContent from "../../util/news";
    export default class Index extends wepy.page {
        config = {
            navigationBarTitleText: "首页"
        };
        components = {
            swiper: Swiper,
            tabBar: tabBar,
            register:Register,
            modal:Modal,
            reward:Reward
        };
        async onShow(){
            //进入页面时需要隐藏掉原有的tabbar
             wx.hideTabBar({
                aniamtion: false
            })
        };
        //页面的生命周期函数 
        async onLoad() {
            // let result = await super.onLoad();
            // if (!result) {
            //   return;
            // }
            
            let that=this;
            //获取新闻信息
            that.getListContent();
            that.$apply();
        };
        //可用于页面模板绑定的数据
        data = {
            activeIndex:0, //底部导航当前索引值
            //listContent:listContent.listContent,
            listContent:[],
            listCurrIndex:0,
            showLogin:false,  //登录弹窗状态
            showModal:false, //提示文本弹状态
            showReward:false, //可领取奖品的弹窗
            modalMsg:'',      //提示文本内容
            btnNum:1,     //提示文本里按钮的数量
            showBtn:true,   //文本弹窗中的按钮
            rewardData:[],     //奖品数据
            rewardData1:[
                {
                    hdName:'不朽的功勋 活动四1',
                    prizesName:'银币 5000',
                    state:'未领取'
                },
                {
                    hdName:'辉煌的征程2',
                    prizesName:'银币 5000',
                    state:'未领取'
                },
                {
                    hdName:'辉煌的征程3',
                    prizesName:'银币 5000',
                    state:'未领取'
                },
                {
                    hdName:'辉煌的征程4',
                    prizesName:'银币 5000',
                    state:'未领取'
                },
                {
                    hdName:'辉煌的征程5',
                    prizesName:'银币 5000',
                    state:'未领取'
                },
                {
                    hdName:'辉煌的征程6',
                    prizesName:'银币 5000',
                    state:'未领取'
                },
                {
                    hdName:'辉煌的征程7',
                    prizesName:'银币 5000',
                    state:'未领取'
                },
                {
                    hdName:'辉煌的征程8',
                    prizesName:'银币 5000',
                    state:'未领取'
                },
                {
                    hdName:'辉煌的征程9',
                    prizesName:'银币 5000',
                    state:'未领取'
                },
            ]
        };
        //事件处理函数(集中保存在methods对象中)
        methods = {
            //手风琴
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
            //关闭弹窗
            close(e){
                this[e]=false;
                this.$apply();
            },
            //文本弹窗里的确定按钮执行的方法
            confirm(e){
                let that = this;
                let btnNum = that.btnNum;
                //通过按钮数量判断  按钮数量为一个确定按钮时，纯文本提示，关闭弹窗
                //按钮数量为2时，则为兑换游戏内奖品的二次弹窗。
                if(btnNum==1){
                    that.showModal=false;
                }
            },
            //一键领取--奖品列表
            async getReward(){
                let that = this;
                //let token_is_expired = await that.$parent.tokenIsExpired(); //token是否过期  过期-true 
                let hasToken =  that.$parent.hasToken();//是否存在token 
                //先判断用户是否登陆
                if(!hasToken){
                    that.showLogin=true;
                }else{
                    let result = await that.$parent.globalData.get(
                        `${api.server1}/hdarmyweb/token/mission?op=getCanGetUserPrizesList`
                    );
                    if(result.prizesList.length>0){
                        that.rewardData = result.prizesList;
                        that.showReward = true;
                    }else{
                        that.showModal = true;
                        that.modalMsg = '没有可以领取的奖品。'
                    }
                }
                that.$apply();
            },
            //点击奖品列表中的一键领取
            async acceptReward(){
                let that = this;
                let result = await that.$parent.globalData.get(
                    `${api.server1}/hdarmyweb/token/mission?op=getPrizes`
                );
                console.log(result)         //msg/vcode
                that.showReward = false;    //关闭奖品列表弹窗
                that.showModal = true;      //打开领取提示弹窗
                that.modalMsg = result.msg;
                that.$apply();
            },
            //点击底部导航判断
            async jump(url){
                let that=this;
                let hasToken =  that.$parent.hasToken();//是否存在token 
                if( !hasToken ){
                    that.showLogin=true;
                    that.$apply();
                }else{
                    wx.switchTab({ url: url });
                }
            }
        };
        //获取新闻的数据
        async getListContent(){
            let that = this;
            let result = await that.$parent.globalData.get(
                `${api.server}/military_minor/json/news.json`
            );
            that.listContent=result;
            that.$apply();
        }
    }
</script>
<style >
.table-outer-box {
    display: flex;
    flex-direction: column;
    margin: 30rpx 0;
    flex: 1;
    border:2rpx solid #343434;
    border-right:none;
    border-bottom: none;
}
.table {
    color: #b1b1b1;
    text-align: center;
}

.table-flex {
    display: flex;
}

.table-theme {
    font-size: 28rpx;
}

.table-item {
    font-size: 24rpx;
    opacity: 0.6;
}
.itemTh{
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2rpx solid #343434;
}
.item,.itemTh {
    flex: 1;
    border-right:2rpx solid #343434;
}
.item2{
    height:60rpx;
    line-height: 30rpx;
    display:flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2rpx solid #343434;
    overflow: auto;
}
</style>