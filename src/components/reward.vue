<template>
    <view class="modal-content" wx:if='{{modalShow}}'>
        <view class="modal-mask"></view>
        <view class="modal-dialog reward-dialog">
            <view class="modal-btn"><button class="btn-close" @tap="modalHide"></button></view>
            <view class="modal-Info" >
                <view class="reTit">可领取物品</view>
                <view class="getAllContent">
                    <view class="re_table_title">
                        <view class="reTh" >
                            <text>活动名称</text>
                        </view>
                        <view class="reTh" >
                            <text>奖励内容</text>
                        </view>
                    </view>
                    <view class="re_table_con">
                        <scroll-view scroll-y style="height:400rpx;">
                            <block wx:for="{{rewardData}}" wx:key="index">
                                <view class="re_item">
                                    <text>{{item.hdName}}</text>
                                    <text>{{item.prizesName}}</text>
                                </view>
                            </block>
                        </scroll-view>
                    </view>
                </view> 
            </view>
            <view class="btnBox">
                <button class="btn-primary" @tap="getMissionPrizes">一键领取</button>
                <button class="btn-primary" @tap="modalHide">取消</button>
            </view>
        </view>
    </view>
</template>

<script>
    import wepy from "wepy";
    export default class reward extends wepy.component{
        props = {
            modalShow :{
                type:Boolean,
                value:false
            },
            rewardData:{
                type:Array,
            }
        }
        data = {
            
        };
        async onShow(){
          
        }
        async onLoad(){
          
        }
        methods = {
          //关闭弹窗
            modalHide(){
                this.props.msg=""
                this.$emit('hideFn','showReward'); 
                this.$apply();
            },
            //一键领取
            getMissionPrizes(){
                this.$emit('acceptReward'); 
                this.$apply();
            }
        }
}
</script>

<style>
.reTit{font-size:32rpx;color: #fff;margin-bottom: 10rpx;}
.getAllContent{width:95%;margin:0 auto;background:#373434;height:500rpx ;overflow: auto; }
.reward-dialog{padding:30rpx 30rpx}
.re_table_title{display: flex;}
.re_table_title .reTh{padding:5rpx 0;flex:1;border-bottom:1px solid #595959; }
.re_item{display: flex;padding:10rpx 5rpx;align-items: center;color:#ffebcc;}
.re_item text{flex:1;line-height: 35rpx;}
.btnBox{display: flex;}
</style>

