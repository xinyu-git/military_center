
<template>
    <view class="container">
        <web-view src="{{url}}"></web-view>
    </view>
</template>

<script>
import wepy from 'wepy';
export default class ActivityCon extends wepy.page  {
    config = {
        navigationBarTitleText: "活动内容"
    };
    async onShow(){
            
    };
        //页面的生命周期函数 
    async onLoad(option) {
        let that = this;
        console.log(option)
        that.url = decodeURIComponent(option.url);
        this.$apply();
    };
    //可用于页面模板绑定的数据
    data = {
        url:''
    }
    methods = {

    }
}
</script>

<style>

</style>
