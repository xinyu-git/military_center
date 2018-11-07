<template>
    <view class="table-outer-box">
        <view class="table table-theme table-flex">
            <view class="item" wx:for="{{tableThemes}}" wx:key="{{index}}">{{item}}</view>
        </view>
        <view class="table table-item table-flex" wx:for="{{tableItems}}" wx:key="{{index}}">
            <view class="item" wx:for="{{item}}" wx:key="{{index}}">{{item}}</view>
        </view>
    </view>
</template>

<script>
    import wepy from "wepy";
    export default class Table extends wepy.component{
        props = {
            tableThemes :{
                type:Object
            },
            tableItems:{
                type:Array
            }
        }
        data = {
            
        };
        async onShow(){
          
        }
        async onLoad(){
          
        }
        methods = {
          
        }
}
</script>

<style>
/* .table-outer-box {
    display: flex;
    flex-direction: column;
    padding: 50rpx 50rpx 0;
    flex: 1;
}
.table {
    height: 80rpx;
    color: #fff;
    line-height: 80rpx;
    border-top: 1rpx solid #5f677a;
    border-bottom: 1rpx solid #5f677a;
    text-align: center;
}

.table-flex {
    display: flex;
}

.table-theme {
    font-size: 28rpx;
}

.table-item {
    font-size: 24rpx;
    opacity: 0.6;
}

.item {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    flex: 1;
}

.scroll-view {
    flex: 1;
} */
</style>

