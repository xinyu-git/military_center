<template>
    <view class="nav_box">
        <block wx:for="{{tabBar.list}}" wx:key="index">
          <view class="nav_item {{ item.selected  ? 'nav_itemActive' : ''}}" data-index="{{index}}" data-url="{{item.pagePath}}"  @tap="jump">
              <image src='../../images/ico.png' />
              <text>{{item.text}}</text>
          </view>

          <!-- <navigator url="{{item.pagePath}}" open-type="redirect" hover-class="none" @tap="jump">
              <view class="nav_item {{ item.selected  ? 'nav_itemActive' : ''}}" data-index="{{index}}">
                  <image src='../../images/ico.png' />
                  <text>{{item.text}}</text>
              </view>
            </navigator> -->
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
      async onShow(){
        
      }
      async onLoad(){
        //console.log(this.$parent.$parent.globalData.loginState)
      }
      methods = {
        jump(e){
          let url=e.currentTarget.dataset.url;
          wx.redirectTo({ url: url });
          // console.log(e)
          // if(this.loginState == 0){
          //   return false
          // }else{
          //   wx.redirectTo({ url: url });
          // }
        }
      }
}
</script>

<style>

</style>

