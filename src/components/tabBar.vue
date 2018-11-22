<template>
    <view class="nav_box">
        <block wx:for="{{tabBar.list}}" wx:key="index">
          <view class="nav_item {{ item.selected  ? 'nav_itemActive' : ''}}" data-index="{{index}}" data-url="{{item.pagePath}}"  @tap="jump">
              <image src='../../images/ico.png' />
              <text>{{item.text}}</text>
          </view>
        </block>
    </view> 
</template>

<script>
    import wepy from "wepy";
    export default class Swiper extends wepy.component{
      props = {
        tabBar : {
          type:Object,
          default:{}
        },
        modalShow :{
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
        jump(e){
          let that=this;
          let url=e.currentTarget.dataset.url;
          this.$emit('jumpFn',url); 
        }
      }
}
</script>

<style>

</style>

