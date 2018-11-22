/**
 * rewardType:1 为实物奖励  rewardType：0为游戏内奖励
 */
var exchangeData=[
    {
        rewardTypeName:'军武良品',
        rewardType:1,
        exchangeList:[
            {
                src:'../../images/r2.jpg',
                name:'C系定制中坦59式手表',
                number:'158888军功',
                prizesId:8
            },
            {
                src:'../../images/r3.jpg',
                name:'哈罗恩棉油打火机',
                number:'58888军功',
                prizesId:6
            },
            {
                src:'../../images/r2.jpg',
                name:'坦克世界法丁勋章打火机',
                number:'58888军功',
                prizesId:16
            },
            {
                src:'../../images/r2.jpg',
                name:'坦克世界定制7周年勋章',
                number:'45888军功',
                prizesId:17
            },
            {
                src:'../../images/r2.jpg',
                name:'坦克世界定制纯棉毛巾(3条装)',
                number:'38888军功',
                prizesId:18
            },
            {
                src:'../../images/r2.jpg',
                name:'坦克世界定制刺绣秋冬袜(5双)',
                number:'32888军功',
                prizesId:11
            },
            {
                src:'../../images/r2.jpg',
                name:'狙击手开瓶器',
                number:'28888军功',
                prizesId:3
            }
        ]
    },
    {
        rewardTypeName:'永久坦克',
        rewardType:0,
        exchangeList:[
            {
                src:'../../images/r1.jpg',
                name:'268工程V型',
                number:'128800军功兑换',
                prizesId:'3_50689_1'
            },
            {
                src:'../../images/r1.jpg',
                name:'121B',
                number:'40000军功兑换',
                prizesId:'3_63537_1'
            },
            {
                src:'../../images/r1.jpg',
                name:'58号试验型',
                number:'15000军功兑换',
                prizesId:'3_63761_1'
            },
            {
                src:'../../images/r1.jpg',
                name:'ISU-130',
                number:'15000军功兑换',
                prizesId:'3_58625_1'
            },
            {
                src:'../../images/r1.jpg',
                name:'JPZ4-5',
                number:'15000军功兑换',
                prizesId:'3_61969_1'
            }
        ]
    }
]

module.exports = {
    exchangeData: exchangeData
} 