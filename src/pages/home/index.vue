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
                            <view class="listCon " hidden="{{!item.shows}}">
                                <text> {{ item.contents}} </text>
                            </view>
                        </view>
                    </block>
                </view>
            </view>
        </view>
        <!-- 悬浮 -->
        <view class="btn-suspend"></view>
        <!-- 登录弹窗 -->
        <view class="modal-content">
            <view class="modal-mask"></view>
            <view class="modal-dialog">
                <view class="login-container">
                    <view class="login-item">
                        <label>昵称：</label>
                        <input type="text" />
                    </view>
                    <view class="login-item">
                        <label>密码：</label>
                        <input password type="text" />
                    </view>
                    <view class="login-item">
                        <label>大区：</label>
                        <view class="select_box">
                            <view class="select" @tap="selectTap">
                                <text class="select_text">{{selectData[selectIndex].text}}</text>
                                <image class='select_img' src='../../images/sel.jpg' />  
                            </view>
                            <view class="option_box" wx:if="{{selectShow}}">
                                <text class='option' wx:for='{{selectData}}' wx:key='this' data-index='{{index}}' catchtap='optionTap'>{{item.text}}</text>
                            </view>
                        </view>
                    </view>
                    <view class="login-item">
                        <label>验证码：</label>
                        <input class="verifyImg-input" />
                        <image class="verifyImg" />
                    </view>
                    <button class="btn-login">登录</button>
                </view>
            </view>
            <view class="modal-btn"><button class="btn-close"></button></view>
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
    export default class Index extends auth {
        config = {
            navigationBarTitleText: "首页"
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
            that.tabBarData = that.$parent.tabBarClickHandle(0, this);
            that.$apply();
            let result = await super.onLoad();
            if (!result) {
              return;
            }
            //this.tabBarData=this.$parent.globalData.tabBar
            
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
            selectShow:false,  //控制下拉列表的显示隐藏
            selectData:[
                {
                    value:'',
                    text:'请选择大区'
                },{
                    value:'150000',
                    text:'电信南方区'
                },{
                    value:'150001',
                    text:'联通北方区'
                }
            ],  //下拉列表的数据
            selectIndex:0, //选择的下拉列表下标
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
            selectTap(){
                this.selectShow=!this.selectShow;
                console.log(this.selectData.length)
            },
        };
        async onShow(){
            let that=this;
        };
        
    }
</script>
<style >
  
</style>