<template>
    <!-- 登录弹窗 -->
    <view class="modal-content" wx:if='{{modalShow}}'>
        <view class="modal-mask"></view>
        <view class="modal-dialog">
            <view class="modal-btn"><button class="btn-close" @tap="modalHide"></button></view>
            <view class="login-container" >
                <view class="login-box clearfloat">
                    <view class="login-item">
                        <label>账号：</label>
                        <input type="text" data-name="loginName" @input="loginInput" />
                    </view>
                    <view class="login-item">
                        <label>密码：</label>
                        <input password type="text" data-name="password" @input="loginInput"  />
                    </view>
                    <view class="login-item">
                        <label>大区：</label>
                        <view class="select_box">
                            <view class="select" @tap="selectTap">
                                <text class="select_text">{{selectData[selectIndex].text}}</text>
                                <image class='select_img' src='../../images/sel.jpg' />  
                            </view>
                            <view class="option_box" wx:if="{{selectShow}}">
                                <block wx:for='{{selectData}}' wx:key="index">
                                    <text class="option  {{ selectIndex == index ? 'selectedV':''}}"   data-index='{{index}}' @tap='optionTap'>{{item.text}}</text>
                                </block>
                            </view>
                        </view>
                    </view>
                    <view class="login-item" style="display:none;">
                        <label>验证码：</label>
                        <input class="verifyImg-input" data-name="verifyCode" @input="loginInput" />
                        <image class="verifyImg" src="{{userInfo.verifyImgSrc}}" @tap="changeImg" />
                    </view>
                    <view class="login-item loginTs"><text>{{userInfo.tips}}</text></view>
                </view>
                <button class="btn-login" @tap="login">登录</button>
            </view>
        </view>
    </view>
</template>

<script>
    import wepy from "wepy";
    import api from "../config/api"
    import md5 from "../util/md5";
    export default class Register extends wepy.component{
        props = {
          modalShow :{
              type:Boolean,
              value:false
          }
        }
        data = {
          selectShow:false,  //控制下拉列表的显示隐藏
          selectData:[
            {
                value:'',
                text:'请选择大区'
            },{
                value:'1500200',
                text:'电信南方区'
            },{
                value:'1500100',
                text:'联通北方区'
            }
          ],  //下拉列表的数据
          selectIndex:0, //选择的下拉列表下标
          userInfo : {
              loginName:'',
              password:'',
              region:'',
              zoneId:'',
              verifyCode:'',
              tips:'',
              verifyImgSrc:''
          }
        };
        async onLoad(){
            let that=this;
            that.userInfo.verifyImgSrc=api.server1+'/hdarmyweb/verifyCode?'+Math.random();
            that.$apply();
        }
        async onShow(){

        }
        methods = {
            //关闭弹窗
            modalHide(){
                //关闭弹窗时，清除选择大区的记录 
                this.selectIndex=0;
                this.userInfo.tips="";
                this.$emit('hideFn','showLogin'); 
                this.$apply();
            },
            //登录
            async login(){
                let that=this;
                //let playerDetail={};//存储玩家登录的信息
                if(that.userInfo.loginName==''){
                    that.userInfo.tips="请输入用户名";
                    return;
                }
                if(that.userInfo.password==''){
                    that.userInfo.tips="请输入密码";
                    return;
                }
                if(that.userInfo.zoneId!=1500200 && that.userInfo.zoneId!=1500100){
                    that.userInfo.tips="请选择大区";
                    return;
                }
                if(that.userInfo.password==null){
                    that.userInfo.password="";
                }
                //存储玩家登录的信息
                //playerDetail.loginName=that.userInfo.loginName;
                //playerDetail.zoneId=that.userInfo.zoneId;
                //playerDetail.region=that.userInfo.region;
                //请求传的数据
                let loginData={
                    op:'getTokenInLogin',
                    login:that.userInfo.loginName,
                    password:md5.hexMD5(that.userInfo.password),
                    zoneId:that.userInfo.zoneId
                }
                console.log(loginData)
                let result = await that.$parent.$parent.globalData.get(
                    `${api.server1}/hdarmyweb/tokenLogin`, loginData
                );
                console.log(result);
                
                if(result.vcode==0){
                    //存储玩家信息和token;
                    that.$parent.$parent.globalData.token=result.token;
                    that.$parent.$parent.globalData.expireTime=result.expiryDate;
                    //that.$parent.$parent.globalData.playerInfo=playerDetail;
                    //wx.setStorageSync("player:detail",playerDetail);
                    wx.setStorageSync("user:token", that.$parent.$parent.globalData.token);
                    wx.setStorageSync("user:expireTime", that.$parent.$parent.globalData.expireTime);
                    that.modalShow=false;
                }else{
                    that.userInfo.tips=result.msg;            
                }
                that.$apply();
            },
            //大区下拉
            selectTap(){
                this.selectShow=!this.selectShow;
                this.$apply();
            },
            //选择大区
            optionTap(e){
                let that=this;
                let selectIndex=e.currentTarget.dataset.index;
                that.selectIndex=selectIndex;
                that.selectShow=!that.selectShow;
                that.userInfo.region = that.selectData[selectIndex].text;
                that.userInfo.zoneId = that.selectData[selectIndex].value;
                that.$apply();
            },
            //用户登录
            loginInput(e){
                let that=this;
                let key = e.currentTarget.dataset.name;
                that.userInfo[key] = e.detail.value;
                that.$apply();
            },
            //刷新验证码
            changeImg() {
	            this.userInfo.verifyImgSrc=api.server1+'/hdarmyweb/verifyCode?'+Math.random();
            }
        }
      
}
</script>

<style>

</style>

