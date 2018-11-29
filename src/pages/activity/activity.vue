<template>
    <view class="container">
        <view class="page-body">
            <!-- 轮播图 -->
            <swiper></swiper>
            <view class="pageBox">
                <view class="activityBox">
                    <view class="activityList">
                        <scroll-view scroll-y style="height:400rpx;">
                            <block wx:for="{{activityListPage}}" wx:key="index">
                                <view class="activityItem" @tap="showActivity" data-url="{{item.url}}">
                                    <view class="activityName">
                                        <text>{{item.name}}</text>
                                    </view>
                                    <view class="activityTime">
                                        <text>{{item.time}}</text>
                                    </view>
                                </view>
                            </block>
                        </scroll-view>
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
        <!-- 底部导航 -->
        <tabBar  :activeIndex.sync="activeIndex" @jumpFn.user="jump"></tabBar>
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
    //import activityList from "../../util/activity";
    export default class Activity extends wepy.page {
        config = {
            navigationBarTitleText: "军功中心"
        };
        components = {
            swiper: Swiper,
            tabBar: tabBar,
            register:Register
        };
        async onShow(){
            
        };
        //页面的生命周期函数 
        async onLoad() {
            let that=this;
            //底部导航
            that.tabBarData = that.$parent.tabBarClickHandle(3, this);
            //获取活动列表
            await that.getActivityList();
            //获取第一页数据
            that.page(1);
            that.$apply();
           
        };
        //可用于页面模板绑定的数据
        data = {
            activeIndex:3,    //底部导航当前索引值
            showLogin:false,  //登录弹窗状态
            //activityList:activityList.activityList,
            activityList:[],
            activityListPage:[],
            pageNum:'',     //领奖页码
            pageIndex:1,//当前页码
            pageSize:6,   //一页显示的数据量
            totalPage:null //总页数
        };
        //事件处理函数(集中保存在methods对象中)
        methods = {
            //点击底部导航判断
            async jump(url){
                let that=this;
                let hasToken =  that.$parent.hasToken();//是否存在token 
                if( !hasToken ){
                    that.showLogin=true;
                    that.$apply();
                }else{
                    wx.redirectTo({ url: url });
                }
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
            },
            //跳转
            showActivity(e){
                let url = e.currentTarget.dataset.url
                wx.navigateTo({ url: "activityCon?url=" + encodeURIComponent(url) });
            }
        };
        //分页
        page(pageIndex){
            let that = this;
            let activityList = that.activityList;
            let totalPage = parseInt(prizesList.length / that.pageSize)+1;
            let pageSize = that.pageSize;
            that.totalPage = totalPage;  //总页数
            that.activityListPage=[]; //置空
            that.pageNum=that.pageIndex+"/"+totalPage
            //判断分页和总页数的关系
            if(pageIndex<totalPage){
                for(let i=(pageIndex-1)*pageSize;i<=(pageIndex*pageSize-1);i++){
                    that.activityListPage.push(activityList[i])
                }
            }else if(pageIndex==totalPage){
                for(let i=(pageIndex-1)*pageSize;i<=(activityList.length-1);i++){
                    that.activityListPage.push(activityList[i])
                }
            }
            this.$apply();
        };
        //获取活动的数据
        async getActivityList(){
            let that = this;
            let result = await that.$parent.globalData.get(
                `${api.server}/military_minor/json/activity.json`
            );
            that.activityList=result;
            that.$apply();
        }
    }
</script>
<style >
.activityList{
    width:622rpx;
    margin:0 auto 30rpx;
    padding:30rpx 40rpx;
    background: url(https://vi.kongzhong.com/military_minor/images/infobg.png) no-repeat center top #1a1919;
    background-size:100% 510rpx;
}
.activityItem{
    display: flex;
    justify-content: space-between;
    font-size:26rpx;
    color:#fafafa;
    padding:10rpx 0;
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