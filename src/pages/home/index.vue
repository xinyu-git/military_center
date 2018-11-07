<template>
    <view class="container">
        <view class="page-body">
            <!-- 轮播图 -->
            <swiper></swiper>
            <view class="pageBox">
                <!-- 手风琴 -->
                <view class="accordion">
                    <block wx:for="{{listContent}}" wx:key="index">
                        <view class="listEvent" >
                            <view class="listBtn {{item.itemClass}} {{ listCurrIndex == index ? 'listBtnCurr' : ''}}" data-changeid="{{item.id}}" @tap="showHide" data-index="{{index}}">
                                <text>{{item.listTitle}}</text>
                            </view>
                            <view class="listCon " hidden="{{!item.shows}}">
                                <block wx:for="{{item.contents}}" wx:key="index">
                                    <view wx:if="{{item.type=='text'}}" class="listText">
                                        <text style="color:{{item.color}}">{{item.value}}</text>
                                    </view>
                                    <view wx:elif="{{item.type=='table'}}" class="listTable">
                                        <view class="table-outer-box">
                                            <block wx:for="{{item.value}}" wx:key="index">
                                                <view class="table table-theme table-flex" wx:if="{{item.type=='th'}}">
                                                    <view class="itemTh" wx:for="{{item.thTheme}}" wx:key="{{index}}">
                                                        <text>{{item.thName}}</text>
                                                    </view>
                                                </view>
                                                <view class="table table-item table-flex" wx:if="{{item.type=='td'}}" wx:key="{{index}}">
                                                    <block wx:for="{{item.tdTheme}}" wx:key="{{index}}" >                 
                                                        <view class="item {{item.value.length==1 ? 'merge' : ''}}">
                                                            <block wx:for="{{item.value}}" wx:key="{{index}}" >
                                                                <view class="item2" >
                                                                    <text>{{item.tdName}}</text>
                                                                </view>
                                                            </block>
                                                        </view>
                                                    </block>
                                                </view>
                                            </block>
                                        </view>                                       
                                    </view>
                                </block>
                            </view>
                        </view>
                    </block>
                </view>
            </view>
        </view>
        <!-- 悬浮 -->
        <view class="btn-suspend" @tap="getReward"></view>
        <!-- 底部导航 -->
        <tabBar :tabBar.sync="tabBarData"></tabBar>
        <!-- 登录弹窗  -->
        <register :modalShow.sync="showLogin" @hideFn.user="close"></register>
    </view>
</template>
<script>
    import wepy from 'wepy';
    import api from "../../config/api";
    import auth from "../base/auth";
    import Swiper from "../../components/swiper";
    import tabBar from "../../components/tabBar";
    import Register from "../../components/register";
    import Table from "../../components/table";
    export default class Index extends auth {
        config = {
            navigationBarTitleText: "首页"
        };
        components = {
            swiper: Swiper,
            tabBar: tabBar,
            register:Register,
            table:Table
        };
        async onShow(){
            
        };
        //页面的生命周期函数 
        async onLoad() {
            let result = await super.onLoad();
            if (!result) {
              return;
            }
            let that=this;
            that.tabBarData = that.$parent.tabBarClickHandle(0, this);
            that.$apply();
            
        };
        //可用于页面模板绑定的数据
        data = {
            tabBarData:{},
            listContent:[
                {
                    id:'01',
                    itemClass:'listBtn1',
                    listTitle:'暖心好礼 充值返金又返银',
                    shows:true,
                    contents:[
                        {color:'#b1b1b1',type:'text',value:'　　活动时间：11月5日00:00至11月10日24:00'},
                        {color:'#ff0000',type:'text',value:'　　领奖时间：11月6日18:00至11月17日23:00'},
                        {color:'#b1b1b1',type:'text',value:'　　活动规则：'},
                        {color:'#b1b1b1',type:'text',value:'　　活动期间，完成当日累计充值条件，即可在次日18:00获得对应奖励，连续完成6日累计充值条件，还可额外获得666万银币+黄金59（14天）。'},
                        {color:'#b1b1b1',type:'table',value:[
                            {type:'th',thTheme:[{thName: '日期'},{thName: '当日累计充值条件'},{thName: '对应奖励'},{thName: '连续完成6日奖励'}]},
                            {type:'td',tdTheme:[
                                {value:[{tdName: '11月5日'},{tdName: '11月6日'},{tdName: '11月7日'},{tdName: '11月8日'},{tdName: '11月9日'},{tdName: '11月10日'}]},   
                                {value:[{tdName: '2000金币（50元）'},{tdName: '2000金币（50元）'},{tdName: '2000金币（50元）'},{tdName: '2000金币（50元）'},{tdName: '2000金币（50元）'},{tdName: '2000金币（50元）'}]},   
                                {value:[{tdName: '200万银币'},{tdName: '150万银币+战斗经验加成100%（1小时）*3'},{tdName: '600金币'},{tdName: '100万银币'},{tdName: '500金币'},{tdName: '100万银币'}]},
                                {value:[{tdName: '666万银币'}]},
                            ]},
                        ]},
                        {color:'#b1b1b1',type:'text',value:'　　活动说明：'},
                        {color:'#b1b1b1',type:'text',value:'　　例：'},
                        {color:'#b1b1b1',type:'text',value:'　　11月5日充值50元，11月6日18:00前往军功中心领取200万银币；'},
                        {color:'#b1b1b1',type:'text',value:'　　11月6日充值50元，11月7日18:00前往军功中心领取150万银币+战斗经验加成100%（1小时）*3；'},
                        {color:'#b1b1b1',type:'text',value:'　　11月7日充值50元，11月8日18:00前往军功中心领取600金币；'},
                        {color:'#b1b1b1',type:'text',value:'　　11月8日充值50元，11月9日18:00前往军功中心领取100万银币；'},
                        {color:'#b1b1b1',type:'text',value:'　　11月9日充值50元，11月10日18:00前往军功中心领取500金币；'},
                        {color:'#b1b1b1',type:'text',value:'　　11月10日充值50元，11月11日18:00前往军功中心领取100万银币；'},
                        {color:'#b1b1b1',type:'text',value:'　　由于连续6日完成累计充值条件，11月11日18:00后还可获得666万银币+黄金59（14天）。'},
                        {color:'#b1b1b1',type:'text',value:'　　1、只有连续完成6日累计充值条件，才可领取666万银币+黄金59（14天），否则只能获得当日对应奖励；'},
                        {color:'#b1b1b1',type:'text',value:'　　2、请前往军功中心手动领奖，奖励有效期为7个自然日，过期将无法领取；'},
                        {color:'#b1b1b1',type:'text',value:'　　3、每种奖励仅可领取一次；'},
                        {color:'#b1b1b1',type:'text',value:'　　充值说明：本活动仅限《坦克世界》游戏内直充（推荐）、会员中心点券划拨这两种充值渠道参与；请您及时将充值点券划拨为游戏金币，以便于我们统计发奖。'}
                    ]
                },
                {
                    id:'02',
                    itemClass:'listBtn2',
                    listTitle:'超值折扣 7折换新装 精兵车位5折',
                    shows:false,
                    contents:[
                        {color:'#b1b1b1',type:'text',value:'　　活动时间：11月6日00:10至11月8日23:50'},
                        {color:'#b1b1b1',type:'text',value:'　　活动规则：'},
                        {color:'#b1b1b1',type:'text',value:'　　活动①、在《坦克世界》游戏内使用金币购买涂装、签名、徽章均可立享7折优惠。'},
                        {color:'#b1b1b1',type:'text',value:'　　活动②、在游戏内购买车位、扩充兵营、100%乘员等，金币售价低至5折。'},
                        {color:'#b1b1b1',type:'table',value:[
                            {type:'th',thTheme:[{thName: '类型'},{thName: '折后价（金币）'}]},
                            {type:'td',tdTheme:[
                                {value:[{tdName: '购买车位'},{tdName: '扩充兵营'},{tdName: '购买100%乘员'},{tdName: '再训练100%乘员'}]},
                                {value:[{tdName: '200'},{tdName: '200'},{tdName: '100'},{tdName: '100'}]},
                            ]},
                        ]}                      
                    ]
                },
                {
                    id:'03',
                    itemClass:'listBtn3',
                    listTitle:'红场阅兵 经验嗨不停',
                    shows:false,
                    contents:[
                        {color:'#ff0000',type:'text',value:'　　多系别金币坦克集结收益多'},
                        {color:'#b1b1b1',type:'text',value:'　　活动时间：11月6日00:00至11月14日24:00'},
                        {color:'#b1b1b1',type:'text',value:'　　使用金币坦克257工程(P)、E-100 WT(P)、AMX 105突击型、WZ120-1G、Strv 81、VK16801(P)、ELC EVEN 90、M60、T26E5参与战斗且在中战斗获胜，则战斗结束后可获得1.5倍经验收益和1.25倍银币收益。'},
                        {color:'#b1b1b1',type:'text',value:'　　'},
                        {color:'#ff0000',type:'text',value:'　　红场阅兵 C系坦克经验大丰收'},
                        {color:'#b1b1b1',type:'text',value:'　　活动时间：11月6日00:00至11月9日24:00'},
                        {color:'#b1b1b1',type:'text',value:'　　在标准模式中，使用C系任意坦克参与战斗且在战斗中达成以下条件，则战斗结束后可获得150%经验收益：'}, 
                        {color:'#b1b1b1',type:'text',value:'　　①战斗获胜。'}, 
                        {color:'#b1b1b1',type:'text',value:'　　②对敌方坦克造成的伤害≥1000。'},
                        {color:'#b1b1b1',type:'text',value:'　　'},  
                        {color:'#ff0000',type:'text',value:'　　红场阅兵 S系坦克经验大丰收'},
                        {color:'#b1b1b1',type:'text',value:'　　活动时间：11月6日00:00至11月9日24:00'},
                        {color:'#b1b1b1',type:'text',value:'　　在标准模式中，使用S系任意坦克参与战斗且在战斗中达成以下条件，则战斗结束后可获得150%经验收益：'}, 
                        {color:'#b1b1b1',type:'text',value:'　　①击毁敌方坦克≥1；'}, 
                        {color:'#b1b1b1',type:'text',value:'　　②战斗中对敌方坦克造成的伤害位于本队的前10名。'}, 
                        {color:'#b1b1b1',type:'text',value:'　　'},  
                        {color:'#ff0000',type:'text',value:'　　红场阅兵 C/S系十级经验加成'},
                        {color:'#b1b1b1',type:'text',value:'　　活动时间：11月6日00:00至11月9日24:00'},
                        {color:'#b1b1b1',type:'text',value:'　　在标准模式中，使用C系或S系十级坦克参与战斗且在战斗中达成以下条件，则战斗结束后可获得1.5倍经验收益：'}, 
                        {color:'#b1b1b1',type:'text',value:'　　①击毁敌方坦克≥1；'}, 
                        {color:'#b1b1b1',type:'text',value:'　　②战斗中对敌方坦克造成的伤害≥2000。'},  
                        {color:'#b1b1b1',type:'text',value:'　　'},   
                        {color:'#b1b1b1',type:'text',value:'　　具体详情及规则请查看游戏内“任务与活动”，一切以游戏内时间、数据为准！'},                                  
                    ]
                },
                {
                    id:'04',
                    itemClass:'listBtn4',
                    listTitle:'首充返金100% 另送高级账号+500000银币+战场神器',
                    shows:false,
                    contents:[
                        {color:'#b1b1b1',type:'text',value:'　　活动时间：长期有效'},
                        {color:'#b1b1b1',type:'text',value:'　　活动规则：'},
                        {color:'#b1b1b1',type:'text',value:'　　活动①、在《坦克世界》游戏内使用金币购买涂装、签名、徽章均可立享7折优惠。'},
                        {color:'#b1b1b1',type:'text',value:'　　活动②、在游戏内购买车位、扩充兵营、100%乘员等，金币售价低至5折。'},                    
                    ]
                }
            ],
            listCurrIndex:0,
            showLogin:false  //登录弹窗显示状态
        };
        //事件处理函数(集中保存在methods对象中)
        methods = {
            //手风琴
            showHide(e){
                let that = this;
                let contentFor = that.listContent;      
                let itemIndex=e.currentTarget.dataset.index;//操作元素绑定的index  
                for(let i=0;i<contentFor.length;i++){
                    if(e.currentTarget.dataset.changeid == contentFor[i].id){
                        if(that.listContent[i].shows){
                            that.listContent[i].shows = false;
                        }else{
                            that.listContent[i].shows = true;
                            that.listCurrIndex=itemIndex;   
                        }
                    }else{
                        that.listContent[i].shows = false;
                    }
                }
            },
            //关闭弹窗
            close(e){
                //关闭弹窗
                this.showLogin=false;
                this.$apply();
            },
            //一键领取
            getReward(){
                this.showLogin=true;
            }
        };
        
    }
</script>
<style >
.table-outer-box {
    display: flex;
    flex-direction: column;
    margin: 30rpx 0;
    flex: 1;
    border:1px solid #343434;
    border-right:none;
    border-bottom: none;
}
.table {
    color: #b1b1b1;
    
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
.itemTh{
    display: flex;
    align-items: center;
    justify-content: center;
}
.item,.itemTh {
    flex: 1;
    border-right:1px solid #343434;
    border-bottom: 1px solid #343434;
}
.item2{
    height: 80rpx;
    line-height: 30rpx;
    display:flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #343434;
    overflow: auto;
}
.merge .item2{
    height: 100%;
}
</style>