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
                                <text>{{playerDetail.nickName}}</text>
                            </view>
                            <view class="info-line">
                                <label>大区：</label>
                                <text>{{playerDetail.region}}</text>
                            </view>
                            <view class="info-line">
                                <label>现有军功：</label>
                                <text>{{military.nowCount}}</text>
                            </view>
                            <view class="info-line">
                                <label>总共获得军功：</label>
                                <text>{{military.sumCount}}</text>
                            </view>
                        </view>
                        <view class="loinOut">
                            <button class="btn-loginOut" @tap="loginOut">登出</button>
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
                            <view class="rewardCon" >
                                <scroll-view scroll-y style="height:400rpx;">
                                    <view class="tr" wx:for="{{prizesListPage}}" wx:key="index">
                                        <view class="td td1">{{item.hdName}}</view>
                                        <view class="td td2">{{item.prizesName}}</view>
                                        <view class="td td3">{{item.state}}</view>
                                    </view>
                                </scroll-view>
                            </view>
                        </view>
                        <!-- 分页 -->
                        <view class="page">
                            <text>{{pageNum}}</text>
                            <button class="page-btn prev" @tap="prevPage">上一页</button>
                            <button class="page-btn nextPage" @tap="nextPage">下一页</button>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 底部导航 -->
        <tabBar :activeIndex.sync="activeIndex" @jumpFn.user="jump"></tabBar>
        <!-- 登录弹窗  -->
        <register :modalShow.sync="showLogin"  @hideFn.user="close"></register>
    </view>
</template>
<script>
    import wepy from 'wepy';
    import api from "../../config/api";
    import auth from "../base/auth";
    import Swiper from "../../components/swiper";
    import tabBar from "../../components/tabBar";
    import Register from "../../components/register";
    export default class Center extends wepy.page {
        config = {
            navigationBarTitleText: "个人中心"
        };
        components = {
            swiper: Swiper,
            tabBar: tabBar,
            register:Register
        };
        //可用于页面模板绑定的数据
        data = {
            activeIndex:1,//底部导航当前索引值
            currentTab:0,   //个人信息/领奖记录----显示隐藏
            prizesList:[],  //奖励列表
            prizesListPage:[], //分页数据
            prizesList1:[
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
            ],
            showLogin:false,  //登录弹窗显示隐藏变量
            playerDetail:{},  //玩家详情
            military:{nowCount:'',sumCount:''},     //军功详情
            pageNum:'',     //领奖页码
            pageIndex:1,//当前页码
            pageSize:6,   //一页显示的数据量
            totalPage:null //总页数
        };
        async onShow(){
            let that=this;
            
        };
        //页面的生命周期函数 
        async onLoad() {
            let that=this;
            //玩家信息
            that.getPlayInfo();
            //获取军功
            that.getMilitary();
            //获取领奖记录
            that.getRecord();
            //console.log(that.playerDetail)
            that.$apply();
        };
        //事件处理函数(集中保存在methods对象中)
        methods = {
            //页卡
            tabNav(e){
                let that=this;
                let itemIndex=e.currentTarget.dataset.current;//操作元素绑定的index 
                that.currentTab=itemIndex;
            },
            //关闭弹窗
            close(e){
                this[e]=false;
                this.$apply();
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
            },
            //登出
            loginOut(){
                let that = this;
                wx.setStorageSync("user:token", '');
                wx.setStorageSync("user:expireTime", '');
                that.$parent.globalData.token=null;
                wx.reLaunch({ url: '/pages/home/index' });
                that.$apply();
            },
            //上一页
            prevPage(){
                let that = this;
                that.pageIndex--;
                if(that.pageIndex==0){
                    that.pageIndex=1;
                    return;
                };
                that.page(that.pageIndex);
            },
            //下一页
            nextPage(){
                let that = this;
                if(that.pageIndex==that.totalPage) {
                    return;
                };
                that.pageIndex++;
                that.page(that.pageIndex);
            }
        };
        //个人信息--现有军功/获得的军功
        async getMilitary(){
            let that = this;
            let result = await that.$parent.globalData.get(
                `${api.server1}/hdarmyweb/token/user?op=getArmyFeatsInfo`
            );
            that.military.nowCount = result.nowCount;
            that.military.sumCount = result.sumCount;
            that.$apply();
        };
        //领奖记录
        async getRecord(){
            let that = this;
            let result = await that.$parent.globalData.get(
                `${api.server1}/hdarmyweb/token/mission?op=getAllPrizesLog`
            );
            console.log(result)
            that.prizesList = result.prizesList;
            //获取第一页数据
            that.page(1);
            that.$apply();
        };
        //分页
        page(pageIndex){
            let that = this;
            let prizesList = that.prizesList;
            let totalPage = parseInt(prizesList.length / that.pageSize)+1;
            let pageSize = that.pageSize;
            that.totalPage = totalPage;  //总页数
            that.prizesListPage=[]; //置空
            that.pageNum=that.pageIndex+"/"+totalPage
            //判断分页和总页数的关系
            if(pageIndex<totalPage){
                for(let i=(pageIndex-1)*pageSize;i<=(pageIndex*pageSize-1);i++){
                    that.prizesListPage.push(prizesList[i])
                }
            }else if(pageIndex==totalPage){
                for(let i=(pageIndex-1)*pageSize;i<=(prizesList.length-1);i++){
                    that.prizesListPage.push(prizesList[i])
                }
            }
            this.$apply();
        };
        //获取玩家信息
        async getPlayInfo(){
            let that = this;
            let playerTemp={};
            let result = await that.$parent.globalData.get(
                `${api.server1}/hdarmyweb/token/tokenInfo?op=getUserInfo`
            );
            playerTemp.nickName=result.nickName;
            if(result.zoneId=='1500100'){
                playerTemp.region='联通北方区'
            }else if(result.zoneId=='1500200'){
                playerTemp.region='电信南方区'
            }
            that.playerDetail=playerTemp;
            that.$apply();
        };
    }
</script>
<style >
  .loinOut{margin-top: 20rpx;}
</style>