<template>
    <view class="container">
        <view class="page-body">
            <!-- 轮播图 -->
            <swiper></swiper>
            <view class="pageBox">
                <view class="exchangeBox">
                    <view class="userCount">个人军功：0</view>
                    <block  wx:for="{{exchangeData}}" wx:key="index">
                        <view class="exTitle">{{item.rewardType}}</view>
                        <view class="exchangeList">
                            <block wx:for="{{exchangeData[index].exchangeList}}" wx:key="index">
                                <view class="exchangeItem">
                                    <view class="rewardBox">
                                        <image src="{{item.src}}" />
                                        <view class="rewardName">
                                            <text>{{item.name}}</text>
                                        </view>
                                    </view>
                                    <button class="btn-exchange">{{item.number}}</button>
                                </view>
                            </block>
                        </view>
                    </block>
                </view>
            </view>
        </view>
        <!-- 登录弹窗 -->
        <view class="modal-content" style="display:none;">
            <view class="modal-mask"></view>
            <view class="modal-dialog">
                <view class="modal-btn"><button class="btn-close" @tap="chooseAddress"></button></view>
                <view class="userInfo_box">
                    <view class="warm-tips">
                        <text>温馨提示</text>
                        <text>1、库存数量为零后将无法继续兑换该奖品；</text>
                        <text>2、实物奖品需要填写正确收货地址才能邮寄（邮寄时间为兑换后的7-10个工作日）；</text>
                        <text>3、如没有填写收货地址，或填写错误的收货地址将无法收到实物奖品，请谨慎！</text>
                    </view>
                    <view class="userInfo-container">
                        <view class="login-item">
                            <label>兑换物品：</label>
                            <text>额恩恩</text>
                        </view>
                        <view class="login-item">
                            <label>联系人：</label>
                            <input type="text" />
                        </view>
                        <view class="login-item">
                            <label>联系方式：</label>
                            <input  type="text" />
                        </view>
                        <view class="login-item">
                            <label>收货地址</label>
                        </view>
                        <view class="login-item userInfo-item">
                            <label>省/市：</label>
                            <view class="select_box">
                                <view class="select" @tap="selectTap">
                                    <text class="select_text"> ee </text>
                                    <image class='select_img' src='../../images/sel.jpg' />  
                                </view>
                                <view class="option_box" >
                                    <text class="option" >eeeeeeee</text>
                                    <text class="option" >eeeeeeee1</text>
                                </view>
                            </view>
                        </view>
                        <view class="login-item userInfo-item">
                            <label>区/市：</label>
                            <view class="select_box">
                                <view class="select" @tap="selectTap">
                                    <text class="select_text"> ee </text>
                                    <image class='select_img' src='../../images/sel.jpg' />  
                                </view>
                                <view class="option_box" >
                                    <text class="option" >eeeeeeee</text>
                                    <text class="option" >eeeeeeee1</text>
                                </view>
                            </view>
                        </view>
                        <view class="login-item userInfo-item">
                            <label>区/县：</label>
                            <view class="select_box">
                                <view class="select" @tap="selectTap">
                                    <text class="select_text"> ee </text>
                                    <image class='select_img' src='../../images/sel.jpg' />  
                                </view>
                                <view class="option_box" >
                                    <text class="option" >eeeeeeee</text>
                                </view>
                            </view>
                        </view>
                        <view class="login-item">
                            <label>详细地址ee：</label>
                            <input  type="text" />
                        </view>
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
            exchangeData:[
                {
                    rewardType:'军武良品',
                    exchangeList:[
                        {
                            src:'../../images/r1.png',
                            name:'品坦克世界1:72 百运模型',
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
                },
                {
                    rewardType:'永久坦克',
                    exchangeList:[
                        {
                            src:'../../images/r1.png',
                            name:'永坦克世界1:72 百运模型',
                            number:'15军功'
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
                            number:'1688军功'
                        }
                    ]
                }
            ],
        };
        //事件处理函数(集中保存在methods对象中)
        methods = {
            chooseAddress(){
                wx.chooseAddress({
                    success:function(res){
                        console.log(res)
                    }
                })
            }
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
.rewardName{
    width:100%;
    padding:3rpx 0;
    min-height:60rpx;
    background: #7f0e09; 
    display: flex;
    align-items: center;
    position: absolute;
    left:0;
    bottom:0;
}
.rewardBox text{
    font-size:24rpx;
    color:#fff4f4;
    padding:0 10rpx;
    line-height: 30rpx;
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