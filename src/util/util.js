var windowWidth , windowHeight;
function fit2(_cb){
	console.log("into fit2");
	_cb()
}
function sleep(s){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('promise resolved')
      }, s)
    })
  }
function fitImageScreen(e,_callback) {
	//获取屏幕宽高 
		var imageSize = {};
		var originalWidth = e.detail.width;//图片原始宽 
		var originalHeight = e.detail.height;//图片原始高 
		var originalScale = originalHeight/originalWidth;//图片高宽比 
		//console.log('originalWidth: ' + originalWidth)
		//console.log('originalHeight: ' + originalHeight)
		//console.log("typeof _callback is " , typeof _callback)
		if( !!windowWidth ){
			//console.log("into second util")
			var windowscale = windowHeight/windowWidth;//屏幕高宽比 
			//console.log('windowWidth: ' + windowWidth)
			//console.log('windowHeight: ' + windowHeight)
			if(originalWidth<windowWidth){
				imageSize.imageWidth = originalWidth;
				imageSize.imageHeight = originalHeight;
				//console.log("imageSize 1", imageSize)
				_callback(imageSize);
				return;
			}
			if(originalScale < windowscale){//图片高宽比小于屏幕高宽比 
				//图片缩放后的宽为屏幕宽 
				imageSize.imageWidth = windowWidth;
				imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
			}else{//图片高宽比大于屏幕高宽比 
				//图片缩放后的高为屏幕高 
				imageSize.imageHeight = windowHeight;
				imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
			}
			//console.log("imageSize 2", imageSize)
			_callback(imageSize);
		}else{
			//console.log("into first time")
			wx.getSystemInfo({
				success: function(res) {
					//console.log("typeof _callback is " , typeof _callback)
					windowWidth = res.windowWidth;
					windowHeight = res.windowHeight;
					//console.log("windowWidth is ",windowWidth, " windowHeight is ", windowHeight)
					var windowscale = windowHeight/windowWidth;//屏幕高宽比 
					//console.log('windowWidth: ' + windowWidth)
					//console.log('windowHeight: ' + windowHeight)
					if(originalWidth<windowWidth){
						imageSize.imageWidth = originalWidth;
						imageSize.imageHeight = originalHeight;
						//console.log("imageSize 1", imageSize)
						_callback(imageSize);
						return;
					}
					if(originalScale < windowscale){//图片高宽比小于屏幕高宽比 
						//图片缩放后的宽为屏幕宽 
						imageSize.imageWidth = windowWidth;
						imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
					}else{//图片高宽比大于屏幕高宽比 
						//图片缩放后的高为屏幕高 
						imageSize.imageHeight = windowHeight;
						imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
					}
					//console.log("imageSize 2", imageSize)
					_callback(imageSize);
				}
			})
		}

	
	
	//console.log('缩放后的宽: ' + imageSize.imageWidth)
	//console.log('缩放后的高: ' + imageSize.imageHeight)
	
}
function DateFormat(d){	
  var mm = d.getMonth() + 1; 
  var dd = d.getDate();
  return [d.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');
};

const richTextAdapter = {
	"s":"del",
	"u":"p"
}

function buildRichTextObj(node){
	// let that = this;
	let rtobj = {};
	let rtattrs = {};
	if(node){
		let tag = node.tag;
		//let tagType = node.tagType;
		if(node.node == 'element'){
			// rtobj.type = 'node';
			if(richTextAdapter[tag]){
				rtobj.name = richTextAdapter[tag];
			}else{
				rtobj.name = tag;
			}
			if(node.attr){
				rtattrs = {...node.attr};
				for (let attr in rtattrs) {
					let _v = rtattrs[attr];
					if(typeof _v == "object"){
						if(_v instanceof Array){
							rtattrs[attr] = _v.join("")
						}
					}
				} 
				if(tag=='img'){
					rtattrs.class = 'rt-wxa-image'
					// rtattrs.style = `${rtattrs.style};width:80%;display:block;margin:auto;`;	
				}
				rtobj.attrs = rtattrs;
			}
		
			if(node.nodes && node.nodes.length>0){
				let children = [];
				node.nodes.forEach(function(n){
					let sub_rtobj = buildRichTextObj(n)
					children.push(sub_rtobj)
				})
				rtobj.children = children;
			}
		}else if(node.node == 'text'){
			rtobj.type = 'text';
			rtobj.text = node.text;
		}
	}
	return rtobj;
}

/**
 * 存储用户在某部门（昵称）下的昵称
 * @param userId
 * @param deparmentNo
 * @param nickName
 */
function saveUserDept2Buffer(userId,departmentNo,nickName){
	console.log("save info",userId,departmentNo,nickName)
	let key = `${userId}_${departmentNo}`;
	let userDeptInfo = wx.getStorageSync("user:deptinfo");
	if(!userDeptInfo){ userDeptInfo = {}; }
	if(!userDeptInfo[key]){ userDeptInfo[key] = {}; }
    userDeptInfo[key] = nickName;
    wx.setStorageSync('user:deptinfo',userDeptInfo)
}

/**
 * 获取用户在某部门（班级）下的昵称
 * @param userId
 * @param departmentNo
 * @returns {string}
 */
function getUserNickNameByDept(userId,departmentNo){
    let key = `${userId}_${departmentNo}`;
    let userDeptInfo = wx.getStorageSync("user:deptinfo");
    if(userDeptInfo && userDeptInfo[userId]){
    	return userDeptInfo[key] ? userDeptInfo[key] : "";
	}else{
    	return "";
	}
}

function formatLocation(longitude, latitude) {
    if (typeof longitude === 'string' && typeof latitude === 'string') {
        longitude = parseFloat(longitude)
        latitude = parseFloat(latitude)
    }

    longitude = longitude.toFixed(2)
    latitude = latitude.toFixed(2)

    return {
        longitude: longitude.toString().split('.'),
        latitude: latitude.toString().split('.')
    }
}

/**
 * 如果被比较的日期小于'要比较的日期，那么返回的是负数
 * 如果被比较的日期大于'要比较的日期，那么返回的是正数
 * @param date1 被比较的日期参数
 * @param date2 要比较的日期参数
 * @returns {*}
 */
function computeDate(date1, date2){
	let d1 = date1.getTime();
    let d2 = date2.getTime();
	let tmp_time = d1 - d2;
    let oneMinTime = 60 * 1000;
    let oneHourTime = 60 * oneMinTime;
    let oneDayTime = 24 * oneHourTime;
	let result_day = Math.floor(tmp_time / oneDayTime);
	if(result_day == 0){
        let result_Hour = Math.floor(tmp_time / oneHourTime);
        if(result_Hour ==0 ){
            let result_Time = Math.floor(tmp_time / oneMinTime);
            if(result_Time == 0){
                return {
                	type:"equals",
					value:result_Time
				}
			}else{
                return {
                    type:"minute",
                    value:result_Time
                }
			}
        }else{
            return {
                type:"hour",
                value:result_Hour
            }
		}
	}else{
        return {
            type:"day",
            value:result_day
        }
	}
}

/*获取当前页url*/
function getCurrentPageUrl(){
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length-1]    //获取当前页面的对象
    var url = currentPage.route    //当前页面url
    return url
}

/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs(){
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length-1]    //获取当前页面的对象
    var url = currentPage.route    //当前页面url
    var options = currentPage.options    //如果要获取url中所带的参数可以查看options
    
    //拼接url的参数
    var urlWithArgs = url + '?'
    for(var key in options){
        var value = options[key]
        urlWithArgs += key + '=' + value + '&'
    }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length-1)
    
    return urlWithArgs
}

module.exports = {
	fit2 : fit2,
    sleep : sleep,
	fitImageScreen : fitImageScreen,
	DateFormat : DateFormat,
	buildRichTextObj : buildRichTextObj,
    saveUserDept2Buffer : saveUserDept2Buffer,
    getUserNickNameByDept : getUserNickNameByDept,
    formatLocation : formatLocation,
	timeInterval : computeDate,
    getCurrentPageUrl: getCurrentPageUrl,
    getCurrentPageUrlWithArgs: getCurrentPageUrlWithArgs
} 
