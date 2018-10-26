const appid = 'wx51c8d8bbc15b28e2'
const env = 'production'
const env1 = 'production1'
const constant = {
    fileServer: "http://card.kong.net",
    production: "https://hifun.kongzhong.com",
    production1: "https://hifunservice.kongzhong.com",
    development: "https://card.kong.net"
}
//process.env.TZ = 'Asia/Shanghai';
// urls 小程序的递归模块有问题，暂时使用两层结构，urls>auth>
let urls = {
    auth: {
        authorize: {
            method: 'GET',
            url: '/auth/wxa/v2/wwj'
        },
        refreshToken: {
            method: 'GET',
            url: '/auth/wxa/refreshToken'
        },
        userDetail: {
            method: 'GET',
            url: '/auth/user/detail'
        },
        currentTime: {
            method: 'GET',
            url: '/auth/currentTime'
        },
        verifyCode: {
            method: 'GET',
            url: '/auth/wxa/sendVerifyCode'
        },
        userMobile: {
            method: 'POST',
            url: '/auth/wxa/main/getusermobile'
        }
    },
    baseService: {
        qrcode: {
            method: 'GET',
            url: '/api/wxmainapi/createTmpQRCode2'
        },
        fileUpload: {
            method: 'POST',
            url: '/file/upload'
        }
    },
    config: {
        baseInit: {
            method: "GET",
            url: ""
        }
    }
}

let disposeUrl = function (obj, prefix) {
    Object.keys(obj).forEach(function (v) {
        let subV = obj[v];
        Object.keys(subV).forEach(function (sv) {
            if (subV[sv].url) {
                subV[sv].url = prefix + subV[sv].url
            }
        })
    })
    return obj;
}

module.exports = {
    appid: appid,
    server: constant[env],
    server1: constant[env1],
    fileServer: constant['fileServer'],
    api: disposeUrl(urls, constant[env])
}