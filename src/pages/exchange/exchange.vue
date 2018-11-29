<template>
    <view class="container">
        <view class="page-body">
            <!-- 轮播图 -->
            <swiper></swiper>
            <view class="pageBox">
                <view class="exchangeBox">
                    <view class="userCount">个人军功：{{nowCount}}</view>
                    <block  wx:for="{{exchangeData}}" wx:key="index">
                        <view class="exTitle">{{item.rewardTypeName}}</view>
                        <!-- item.rewardType：1 实物奖励 item.rewardType：0游戏内奖励 -->
                        <view class="exchangeList" wx:if="{{item.rewardType==1}}">
                            <block wx:for="{{item.exchangeList}}" wx:for-item="cell" wx:key="cellindex">
                                <view class="exchangeItem">
                                    <view class="rewardBox">
                                        <image src="{{cell.src}}" />
                                        <view class="rewardName">
                                            <text>{{cell.name}}</text>
                                        </view>
                                        <view class="stock">
                                            <text>{{cell.stock}}</text>
                                        </view>
                                    </view>
                                    <button class="btn-exchange" @tap="exchange" data-type="{{item.rewardType}}" data-name="{{cell.name}}" data-prizesId="{{cell.prizesId}}" >{{cell.number}}</button>
                                </view>
                            </block>
                        </view>
                        <view class="exchangeList" wx:elif="{{item.rewardType==0}}">
                            <block wx:for="{{item.exchangeList}}" wx:for-item="cell" wx:key="cellindex">
                                <view class="exchangeItem">
                                    <view class="rewardBox">
                                        <image src="{{cell.src}}" />
                                        <view class="rewardName">
                                            <text>{{cell.name}}</text>
                                        </view>
                                    </view>
                                    <button class="btn-exchange" @tap="exchange" data-type="{{item.rewardType}}" data-name="{{cell.name}}" data-prizesId="{{cell.prizesId}}">{{cell.number}}</button>
                                </view>
                            </block>
                        </view>
                    </block>
                </view>
            </view>
        </view>
        <!-- 兑换弹窗 -->
        <view class="modal-content" wx:if='{{modalShow}}'>
            <view class="modal-mask"></view>
            <view class="modal-dialog">
                <view class="modal-btn"><button class="btn-close" @tap="closeUserInfo"></button></view>
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
                            <text>{{exchangeInfo.rewardName}}</text>
                        </view>
                        <view class="login-item">
                            <label>联系人：</label>
                            <input type="text"  @input="bindInput" data-name="user" cursor-spacing="30"/>
                        </view>
                        <view class="login-item">
                            <label>联系方式：</label>
                            <input  type="number" maxlength="11" @input="bindInput" data-name="phone" cursor-spacing="20" />
                        </view>
                        <view class="login-item">
                            <label>收货地址</label>
                        </view>
                        <view class="login-item">
                            <label>请选择地区：</label>
                            <picker mode="region" @change="bindRegionChange" value="{{region}}" custom-item="{{customItem}}">
                                <view class="picker">
                                  {{region[0]}} - {{region[1]}} - {{region[2]}}
                                </view>
                            </picker>
                        </view>
                        <view class="login-item">
                            <label>详细地址：</label>
                            <input  type="text"  @input="bindInput" data-name="address" cursor-spacing="30"/>
                        </view>
                        <view class="login-item errorTs">
                            <text>{{errorTs}}</text>
                        </view>
                    </view>
                    <view class="dialogBtn_box">
                        <button class="dialog_btn" @tap="exchangeInkIndPrizes" disabled="{{disabled}}">确定</button>
                        <button class="dialog_btn" @tap="closeUserInfo">取消</button>
                    </view>
                </view>
            </view>
        </view>
        <!-- 提示文本弹窗  showBtn显示按钮 btnNum按钮的数量 btnNum:1——确定  btnNum:2——确定/取消 disabled——确定按钮的点击状态 -->
        <modal :modalShow.sync="showModal" :showBtn.sync="showBtn" :btnNum.sync="btnNum" :disabled.sync="disabled" :modalMsg.sync="modalMsg" @hideFn.user="close" @confirmFn.user="confirm"></modal>
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
    import Modal from "../../components/modal";
    import Register from "../../components/register";
    //import exchangeData from "../../util/exchange";
    export default class Exchange extends wepy.page {
        config = {
            navigationBarTitleText: "兑换"
        };
        components = {
            swiper: Swiper,
            tabBar: tabBar,
            modal:Modal,
            register:Register
        };
        async onShow(){
            let that = this;
        };
        //页面的生命周期函数 
        async onLoad() {
            let that=this;
            //底部导航
            //that.tabBarData = that.$parent.tabBarClickHandle(2, this);
            //个人军功
            that.getMilitary();
            //获取兑换奖品数据
            await that.getExchangeData();
            //获取奖励库存信息
            that.getPrizesStock();
            that.$apply();
           
        };
        //可用于页面模板绑定的数据
        data = {
            activeIndex:2,  //底部导航当前索引值
            showLogin:false,  //登录弹窗状态
            showModal:false, //提示文本弹状态
            showBtn:true,   //文本弹窗中的按钮
            modalMsg:'',      //提示文本内容
            btnNum:1,     //提示文本里按钮的数量
            //exchangeData:exchangeData.exchangeData, //初始的奖品信息
            exchangeData:[], //初始的奖品信息
            region: ['省/市', '区/市', '区/县'],
            customItem: '请选择', //可为每一列的顶部添加一个自定义的项  例如：全部
            modalShow:false,  //兑换弹窗
            exchangeInfo:{
                rewardName:'',
                user:'',
                phone:'',
                province:'省/市',
                city:'区/市',
                area:'区/县',
                address:''               
            },
            errorTs:'',  //实物兑换弹窗错误提示
            prizesId:'',
            nowCount:'',  //个人军功
            disabled:false, //按钮可点击状态
        };
        //事件处理函数(集中保存在methods对象中)
        methods = {
            //picker --省-市-区
            bindRegionChange: function (e) {
                let that = this;
                console.log('picker发送选择改变，携带值为', e.detail.value)
                that.region = e.detail.value;
                that.exchangeInfo.province=that.region[0];
                that.exchangeInfo.city=that.region[1];
                that.exchangeInfo.area=that.region[2];
            },
            //点击底部导航判断
            async jump(url){
                let that=this;
                let hasToken =  that.$parent.hasToken();//是否存在token 
                //先判断用户是否登陆 
                if( !hasToken ){
                    that.showLogin=true;
                    that.$apply();
                }else{
                    wx.switchTab({ url: url });
                }
            },
            //关闭实物地址弹窗
            closeUserInfo(){
                let that = this;
                that.modalShow = false;
            },
            //关闭弹窗--组件
            close(e){
                this[e]=false;
                this.$apply();
            },
            //兑换奖励弹窗 实物奖励和游戏内奖励兑换分别弹窗
            async exchange(e){
                let that = this;
                let rewardType = e.currentTarget.dataset.type;  //rewardType=1为实物  rewardType=0为游戏内奖品
                let rewardName = e.currentTarget.dataset.name;
                let prizesId = e.currentTarget.dataset.prizesid;  //奖品id
                that.prizesId=prizesId;  //兑换奖品的id
                //return false;
                if(rewardType==0){
                    //游戏内奖品
                    that.showModal=true; //显示提示文本弹窗
                    that.btnNum=2;  //提示文本两个按钮
                    that.modalMsg='确认兑换 '+rewardName+'?';
                }else if(rewardType==1){
                    //实物奖品
                    //获取单个奖品的库存  库存小于等于0时提示
                    let resultUnit = await that.$parent.globalData.get(
                        `${api.server1}/hdarmyweb/token/exchange?op=valInKind`,
                            {prizesId:prizesId }
                    );            
                    if(resultUnit.prizesCount<=0){
                        that.showModal = true;  //提示文本弹窗
                        that.modalMsg = '商品库存不足请选择其他礼品';
                        that.btnNum = 1;            //提示文本弹窗按钮数量
                        that.$apply();
                        return;
                    }
                    //如果库存足够，弹出实物兑换地址弹窗
                    that.modalShow = true;
                    that.region=['省/市', '区/市', '区/县'];  //每次兑换前初始化地区
                    //每次兑换前置空前一次输入的内容  特别注意兑换的奖品名称
                    that.exchangeInfo = {
                        rewardName:rewardName,
                        user:'',
                        phone:'',
                        province:'省/市',
                        city:'区/市',
                        area:'区/县',
                        address:'' 
                    };   
                    that.errorTs='';
                    that.$apply();
                }
                //that.$apply();
            },
            //地址弹窗输入信息
            bindInput(e) {
                let that = this;
                let key = e.currentTarget.dataset.name;
                that.exchangeInfo[key] = e.detail.value;
            },
            //文本弹窗里的确定按钮执行的方法
            confirm(e){
                let that = this;
                let btnNum = that.btnNum;
                //通过按钮数量判断  按钮数量为一个确定按钮时，纯文本提示，关闭弹窗
                //按钮数量为2时，则为兑换游戏内奖品的二次弹窗。
                if(btnNum==1){
                    that.showModal=false;
                }else if(btnNum==2){
                    that.exchangePrizes();
                }
            },
            //兑换实物弹窗里的确定方法
            async exchangeInkIndPrizes(e){
                let that = this;
                let exchangeInfo = that.exchangeInfo;
                let prizesId = that.prizesId; //奖品id
                if(exchangeInfo.user == ''){
                    that.errorTs = '请填写联系人';
                    return;
                }
                if(exchangeInfo.phone == ''){
                    that.errorTs = '请填写联系方式';
                    return;
                }
                if(exchangeInfo.province == '省/市' || exchangeInfo.province == '请选择'){
                    that.errorTs = '请选择省市';
                    return;
                }
                if(exchangeInfo.city == '请区市' || exchangeInfo.city == '请选择'){
                    that.errorTs = '请选择区市';
                    return;
                }
                if(exchangeInfo.area == '请区县' || exchangeInfo.area == '请选择'){
                    that.errorTs = '请选择区县';
                    return;
                }
                if(exchangeInfo.address == '' || exchangeInfo.address == null){
                    that.errorTs = '请填写具体收货地址';
                    return;
                }
                if(that.disabled) return;
                that.disabled=true; //按钮设置为不可点击
                let exchangeInfoData={
                    prizesId:prizesId,
                    c1:exchangeInfo.province,
                    c2:exchangeInfo.city,
                    c3:exchangeInfo.area,
                    address:exchangeInfo.address,
                    phone:exchangeInfo.phone,
                    lname:exchangeInfo.user
                }
                console.log(exchangeInfoData);
                
                //return false;
                let result = await that.$parent.globalData.get(
                    `${api.server1}/hdarmyweb/token/exchange?op=exchangeInKind`,
                    exchangeInfoData
                );
                
                that.modalShow = false; //关闭地址弹窗
                that.showModal = true;  //打开文本提示弹窗
                that.modalMsg = result.msg; //提示文本内容
                that.disabled=false;
                that.getMilitary();   //刷新军功值
                console.log(result)
                that.$apply();               
            },
            
        };
        // 获取实物奖品库存
        async getPrizesStock(){
            let that = this;
            let exchangeData = that.exchangeData; //初始奖励数据
            console.log(that.exchangeData)
            //let prizesDataTemp = [];
            //所有实物奖品的列表
            // let result1 = await that.$parent.globalData.get(
            //     `${api.server1}/hdarmyweb/token/exchange?op=gei`
            // );
            //prizesDataTemp = result.list;
            for(let i=0;i<exchangeData.length;i++){
                //实物奖品
                if(exchangeData[i].rewardType==1){
                    for(let j=0;j<exchangeData[i].exchangeList.length;j++){
                        //对数据 增加库存内容
                        //调用 库存接口 查询库存数据
                        let prizesId=exchangeData[i].exchangeList[j].prizesId;
                        let result = await that.$parent.globalData.get(
                            `${api.server1}/hdarmyweb/token/exchange?op=valInKind`,
                            {prizesId:prizesId }
                        );
                        exchangeData[i].exchangeList[j].stock='库存'+result.prizesCount;
                        that.$apply();
                        // for(let k=0;k<prizesDataTemp.length;k++){
                        //     if(exchangeData[i].exchangeList[j].prizesId==prizesDataTemp[k].prizesWebId){
                        //         exchangeData[i].exchangeList[j].stock='库存'+prizesDataTemp[k].nowCount
                        //     }
                        // }
                    }
                }
            }
            that.$apply();
        };
        //个人军功
        async getMilitary(){
            let that = this;
            let result = await that.$parent.globalData.get(
                `${api.server1}/hdarmyweb/token/user?op=getArmyFeatsInfo`
            );
            that.nowCount = result.nowCount;
            //that.military.sumCount = result.sumCount;
            that.$apply();
        };
        //兑换游戏内弹窗里的确定方法
        async exchangePrizes(){
            let that = this;
            let prizesId = that.prizesId;
            if(that.disabled) return;
            that.disabled=true; //按钮设置为不可点击
            let result = await that.$parent.globalData.get(
                `${api.server1}/hdarmyweb/token/exchange?op=exchangePrizes`,
                {prizesId:prizesId}
            );
            that.showModal = true;  //打开文本提示弹窗
            that.modalMsg = result.msg; //提示文本内容
            that.btnNum = 1;            //提示文本弹窗按钮数量
            that.disabled=false;
            that.getMilitary();   //刷新军功值
            console.log(result);
            that.$apply();
            
        };
        //获取兑换奖品的数据
        async getExchangeData(){
            let that = this;
            let result = await that.$parent.globalData.get(
                `${api.server}/military_minor/json/exchange.json`
            );
            that.exchangeData=result;
            that.$apply();
        }
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
    background: url(https://vi.kongzhong.com/military_minor/images/exV.png) no-repeat center 0;
    background-size:auto 100%;
}
.exTitle{
    text-align: center;
    line-height: 40rpx;
    color: #e06d30;
    background: url(https://vi.kongzhong.com/military_minor/images/h4.png) no-repeat center 0;
    background-size:auto 100%;
    margin-bottom: 10rpx;
}
.exchangeList{
    text-align: center;
    margin-bottom: 30rpx;
}
.exchangeItem{
    display: inline-block;
    margin:10rpx 15rpx;
    vertical-align: top;
}
.rewardBox{
    width:220rpx;
    height: 246rpx;
    margin-bottom:10rpx;
    background: url(https://vi.kongzhong.com/military_minor/images/jlbg.png) no-repeat center top;
    background-size:100% 100%;
    position: relative;
}
.rewardBox image{
    display: block;
    width:100%;
    height: 186rpx;
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
.rewardName text{
    font-size:24rpx;
    color:#fff4f4;
    padding:0 10rpx;
    line-height: 30rpx;
    text-align: center;
    width:100%;
}
.btn-exchange{
    width:200rpx;
    font-size:22rpx;
    color:#352000;
    background: url(https://vi.kongzhong.com/military_minor/images/jlbg1.png) repeat-x center top;
    background-size:auto 100%;
    line-height: 40rpx;
    padding:0 10rpx;
}
.stock{
    position:absolute;left: 10rpx;top: 2rpx;
}
.stock text{
    color:#352000;
}
.errorTs{text-align: center;color: red;}
</style>