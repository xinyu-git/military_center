<template>
    <view class="modal-content" wx:if='{{modalShow}}'>
        <view class="modal-mask"></view>
        <view class="modal-dialog">
            <view class="modal-btn"><button class="btn-close" @tap="modalHide"></button></view>
            <view class="modal-Info" >
                <text>{{modalMsg}}</text>
            </view>
            <block wx:if="{{showBtn && btnNum==2}}">
                <view class="dialogBtn_box" >
                    <button class="dialog_btn" @tap="confirmBtn" disabled="{{disabled}}">确定</button>
                    <button class="dialog_btn" @tap="modalHide">取消</button>
                </view>
            </block>
            <block wx:else="{{showBtn && btnNum==1}}">
                <view class="dialogBtn_box" >
                    <button class="dialog_btn" @tap="confirmBtn">确定</button>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
    import wepy from "wepy";
    export default class modal extends wepy.component{
        props = {
            modalShow :{
                type:Boolean,
                value:false
            },
            modalMsg:{
                type:String
            },
            showBtn:{
                type:Boolean,
                value:false
            },
            btnNum:{
                type:Number,
                value:1
            },
            disabled:{
                type:Boolean,
                value:false
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
                //this.props.modalMsg=""
                this.$emit('hideFn','showModal'); 
                this.$apply();
            },
            //确定按钮
            confirmBtn(e){
                this.$emit('confirmFn',e); 
                this.$apply();
            }
        }
}
</script>

<style>

</style>

