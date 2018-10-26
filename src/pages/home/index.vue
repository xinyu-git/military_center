<template>
  <view class="page">
    
  </view>
</template>
<script>
    import wepy from 'wepy';
    import api from "../../config/api";
    import auth from "../base/auth";
    export default class Index extends auth {
        config = {
            navigationBarTitleText: "军功中心"
        };
        async onShow(){
            
        };
        //页面的生命周期函数
        async onLoad() {
            let result = await super.onLoad();
            if (!result) {
              return;
            }
        };
        //可用于页面模板绑定的数据
        data = {
          items:[
              {
                  url:'/pages/dataUpload/dataUpload',
                  icon:'icon-dataUpload',
                  text:'娃娃机抄码表',
                  codeType:1
              },{
                  url:'/pages/replenishment/index',
                  icon:'icon-replenishment',
                  text:'娃娃机补货',
                  codeType:1
              },{
                  url:'/pages/stock/stockList',
                  icon:'icon-stock',
                  text:'库存管理',
                  codeType:2
              },{
                  url:'/pages/dollEditor/index?stocktype=1',
                  icon:'icon-pickUpGoods',
                  text:'提货',
                  codeType:2
              },{
                  url:'/pages/dollEditor/index?stocktype=3',
                  icon:'icon-returnGoods',
                  text:'退货',
                  codeType:2
              }
          ]
        };
        //事件处理函数(集中保存在methods对象中)
        methods = {
            
        };
        async onShow(){
            let that=this;
        };
        
    }
</script>
<style >
  
</style>