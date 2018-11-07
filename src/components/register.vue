<template>
    <!-- 登录弹窗 -->
    <view class="modal-content" wx:if='{{modalShow}}'>
        <view class="modal-mask"></view>
        <view class="modal-dialog">
            <view class="modal-btn"><button class="btn-close" @tap="modalHide"></button></view>
            <view class="login-container" >
                <view class="login-box clearfloat">
                    <view class="login-item">
                        <label>昵称：</label>
                        <input type="text" data-name="nickName" @input="loginInput" />
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
                    <view class="login-item">
                        <label>验证码：</label>
                        <input class="verifyImg-input" data-name="code" @input="loginInput" />
                        <image class="verifyImg" />
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
                value:'150000',
                text:'电信南方区'
            },{
                value:'150001',
                text:'联通北方区'
            }
        ],  //下拉列表的数据
        selectIndex:0, //选择的下拉列表下标
        userInfo : {
            nickName:'',
            password:'',
            region:'',
            code:'',
            tips:''
        }
      };
      async onLoad(){
       
      }
      async onShow(){
          console.log(this.modalShow)
      }
      methods = {
        //关闭弹窗
        modalHide(){
            //关闭弹窗时，清除选择大区的记录
            this.selectIndex=0;
            this.userInfo.tips=""
            this.$apply();
            this.$emit('hideFn'); 
        },
        //登录
        login(){
            this.userInfo.tips="cuowu"
            console.log(this.userInfo)
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
            that.$apply();
        },
        //用户登录
        loginInput(e){
            let that=this;
            let key = e.currentTarget.dataset.name;
            console.log(e.detail.value)
            that.userInfo[key] = e.detail.value;
            that.$apply();
        }
      }
}
</script>

<style>

</style>

