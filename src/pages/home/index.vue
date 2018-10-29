<template>
    <view class="container">
        <view class="page-body">
            <!-- 轮播图 -->
            <swiper></swiper>
            <view class="pageBox">
                <view class="accordion">
                    <block wx:for="{{listContent}}" wx:key="index">
                        <view class="listEvent" >
                            <view class="listBtn {{item.itemClass}} {{ listCurrIndex == index ? 'listBtnCurr' : ''}}" data-changeid="{{item.id}}" @tap="showHide" data-index="{{index}}">
                                <text>{{item.listTitle}}</text>
                            </view>
                            <view class="listCon " hidden="{{!item.shows}}" >
                                <text> {{ item.contents}} </text>
                            </view>
                        </view>
                    </block>
                </view>
            </view>
        </view>
        <!-- 悬浮 -->
        <view class="btn-suspend">e</view>
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
        //页面的生命周期函数 wx:if="{{item.shows}}"
        async onLoad() {
            let result = await super.onLoad();
            if (!result) {
              return;
            }
        };
        //可用于页面模板绑定的数据
        data = {
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
            listCurrIndex:0
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
            }
        };
        async onShow(){
            let that=this;
        };
        
    }
</script>
<style >
  
</style>