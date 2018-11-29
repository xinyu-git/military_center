/**
 * id  每个新闻的id
 * itemClass 标题样式
 * listTitle  新闻的标题
 * shows  默认第一个为true，其他均为false  控制手风琴展开
 * contents 新闻的内容
 *        通过type来控制是文字还是表格的渲染。
 *        一行文字：{color:'#b1b1b1',type:'text',value:'　　活动时间：11月5日00:00至11月10日24:00'} 
 *          type:table 为表格渲染 type:th 为表头  
 *          type:'td' 单元格----tdTheme:为单元格中的内容
 *          explame:
 *                  {type:'td',tdTheme:[
*                  {value:[{tdName: '购买车位'},{tdName: '扩充兵营'},{tdName: '购买100%乘员'},{tdName: '再训练100%乘员'}]},
*                  {value:[{tdName: '200'},{tdName: '200'},{tdName: '100'},{tdName: '100'}]},
*              ]}
*          渲染出来是：
*                  购买车位         200
*                  扩充兵营         200
*                  购买100%乘员     100
*/

var listContent=[
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
                    {value:[{tdName: '666万银币',rowspan:4},{tdName: '6661万银币',rowspan:2}]}
                ]}
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
                ]}
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
            {color:'#b1b1b1',type:'text',value:'　　具体详情及规则请查看游戏内“任务与活动”，一切以游戏内时间、数据为准！'}                               
        ]
    },
    {
        id:'04',
        itemClass:'listBtn4',
        listTitle:'首充返金100% 另送高级账号+500000银币+战场神器',
        shows:false,
        contents:[
            {color:'#b1b1b1',type:'text',value:'　　活动时间：长期有效'},
            {color:'#b1b1b1',type:'text',value:'　　活动规则：自注册之日起在《坦克世界》及《战机世界》均从未有过充值记录的玩家，在《坦克世界》或《战机世界》中首次充值，并单笔充值≥2000金币，可于次日18:00自动额外获得100%的金币返还，返还上限为4000金币；除金币返还之外，玩家还将额外获得58试验型（7天）。例如，玩家首次单笔充值2000金币，可额外获得2000金币及58试验型（7天）。'},
            {color:'#b1b1b1',type:'text',value:'　　充值说明：从2017年4月18日起，奖励的58号试验型（7天），更改为：3天VIP+500000银币+B2 740（f）（7天）。'},
            {color:'#b1b1b1',type:'text',value:'　　本活动仅限《坦克世界》游戏内直充、会员中心点券划拨这两种充值渠道参与；请您及时将充值点券划拨为游戏金币，以便于我们统计发奖。'},
            {color:'#b1b1b1',type:'text',value:'　　小贴士：如获奖账号被发现挂机、或工作室代挂机行为，经客服核实确认，将不予发放奖励，同时按规定进行不同时长的封停。有任何疑问欢迎致电客服：010-82296980。'}
        ]
    }
]

module.exports = {
    listContent: listContent
} 