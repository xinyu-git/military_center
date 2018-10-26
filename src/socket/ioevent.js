const io = require('./weapp.socket.io')


module.exports = {
    socketinit: (app) => {
        let socket = io('https://io.kong.net/')

        app.globalData.socket1 = socket;
        app.globalData.chatusers = wx.getStorageSync("card:users") || {}
        app.globalData.chatmsg = wx.getStorageSync("card:chatmsg") || []
            //console.log("typeof app.globalData.chatusers ", app.globalData.chatusers)
            //console.log(!app.globalData.chatmsg.push)
        let me = app.globalData.userInfo
        if (!app.globalData.chatmsg.push) {
            console.log("init chatmsg to array")
            app.globalData.chatmsg = [];
        }
        if (typeof app.globalData.chatusers !== 'object') {
            console.log("init chatusers to {}")
            app.globalData.chatmsg = {};
        }
        app.globalData.chatmsglength = app.globalData.chatmsg.length
        socket.on("connect", () => {
            console.log('into connect')
            socket.emit('authentication', {
                token: app.globalData.token,
                client: 'wxa'
            });
            socket.on('authenticated', function() {
                console.log("already authenticated")
                socket.emit('join'); //发送加入事件
            });

            //console.log('0 . global user is ', app.globalData.chatusers)
        })
        socket.on('m:userinfo', (d) => {
            let users = app.globalData.chatusers
            console.log('m:userinfo : ', d);
            if (!!users["uid" + d.uid]) {
                users["uid" + d.uid] = {
                    id: d.uid,
                    fullname: d.fullname || '未名' + d.uid,
                    headimg: d.headimg,
                    nickname: d.nickname
                }
                app.globalData.EventBus.dispatch("userchage");
                wx.setStorageSync("card:users", users)
            }
        })
        socket.on('m:msg', (d) => {
            //app.globalData.chatusers = app.globalData.chatusers || {}
            console.log('m:msg : ', d);
            let users = app.globalData.chatusers
                //console.log('1. global user is ', app.globalData.chatusers)
            if (!users["uid" + d.from] && d.from !== me.id) {
                socket.emit('m:userinfo', {
                        uid: d.from
                    })
                    ///console.log(users)
                users["uid" + d.from] = {
                    id: d.from
                }
            }
            //users["uid" + d.from].lasttime = d.msgTime;
            //users["uid" + d.from].lastmsg = d
            //chatmsg里面存放1000条消息
            //console.log('new message come in, total count is ', app.globalData.chatmsglength)
            //console.log('chatmsg is', app.globalData.chatmsg)

            if (app.globalData.chatmsglength > 1000) {
                app.globalData.chatmsg.shift();
                app.globalData.chatmsglength--;
            }
            app.globalData.chatmsg.push(d);
            app.globalData.chatmsglength++;
            app.globalData.EventBus.dispatch("m:msg");
            wx.setStorageSync("card:chatmsg", app.globalData.chatmsg)
        })
    }
}