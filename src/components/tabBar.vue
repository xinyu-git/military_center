<template>
    <view class="nav_box">
        <block wx:for="{{tabs}}" wx:key="index">
          <view class="nav_item {{ activeIndex==index  ? 'nav_itemActive' : ''}}" data-index="{{index}}" data-url="{{item.pagePath}}"  @tap="jump">
              <image src='https://vi.kongzhong.com/military_minor/images/ico.png' />
              <text>{{item.text}}</text>
          </view>
        </block>
    </view> 
</template>

<script>
    import wepy from "wepy";
    import tabs from "../util/tabs";
    export default class Swiper extends wepy.component{
      props = {
        modalShow :{
            type:Boolean,
            value:false
        },
        activeIndex:{
          type: Number,
          value: 0,//默认当前选中第一项
        }
      }
      data = {
        tabs:tabs.tabs
      };
      async onShow(){
        //进入页面时需要隐藏掉原有的tabbar
        wx.hideTabBar({
           aniamtion: false
        })
      }
      async onLoad(){
        
      }
      methods = {
        jump(e){
          let that=this;
          let idx = e.currentTarget.dataset.index;
          let url=e.currentTarget.dataset.url;
          //如果点击当前所在的项，不会跳转
          if (idx == this.data.activeIndex)
          return;
          this.$emit('jumpFn',url); 
        }
      }
}
</script>

<style>

</style>

