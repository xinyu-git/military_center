<template>
    <view class="nav_box">
        <block wx:for="{{tabBar.list}}" wx:key="index">
          <navigator url="{{item.pagePath}}" open-type="redirect" hover-class="none">
              <view class="nav_item {{ item.selected  ? 'nav_itemActive' : ''}}" data-index="{{index}}">
                  <image src='../../images/ico.png' />
                  <text>{{item.text}}</text>
              </view>
            </navigator>
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
        }
      }
      data = {
        
      };
      async onLoad(){
        
      }
      methods = {
        
      }
}
</script>

<style>

</style>

