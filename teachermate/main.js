var clipboardText = $clipboard.text
var openID = clipboardText.split("openid=")[1]
var lat = 0
var lng = 0

var isContinue = false

main()

function main() {
    if(!openID) {
        $ui.alert({
            title: "未找到openID",
            message: "请先将个人信息页面的链接复制，再运行此脚本",
        })
        return
    }

    configUI()
    
    $location.select({
        handler: function(result) {
            lat = result.lat
            lng = result.lng
        }
    })
}

function configUI() {
    $ui.render({
        views: [{
            type: "button",
            props: {
                id: "mainBtn",
                title: "开始",
                bgcolor: $color("tint")
            },
            layout: function(make, view) {
                make.centerX.equalTo(view.super)
                make.centerY.equalTo(view.super)
                make.width.equalTo(120)
                make.height.equalTo(40)
            },
            events: {
                tapped: function(sender) {
                    if(isContinue) {
                        isContinue = false
                        sender.title = "开始"
                        sender.bgcolor = $color("tint")
                        $ui.toast("已停止")
                    } else {
                        isContinue = true
                        sender.title = "停止"
                        sender.bgcolor = $color("red")
                        $ui.toast("已开始")
                        start()
                    }
                }
            }
        }]
    })
}

function start() {
    $ui.toast("正在尝试签到...")
    requestAllCourseID(openID)
    if(!isContinue) {
        return
    }
    $delay(3, function() {
        start()
    })
} 

function checkin(openID, courseID, latitude, longitude) {
    $http.request({
        method: "POST",
        url: "https://www.teachermate.com.cn/wechat-api/v1/class-attendance/student-sign-in",
        header: {
            Accept: '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            Connection: 'keep-alive',
            Cookie: "wx_csrf_cookie=d5109d1f5987298e1119628878beac92",
            Host: "www.teachermate.com.cn",
            Origin: "https://www.teachermate.com.cn",
            "User-Agent": 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13E233 MicroMessenger/6.3.15 NetType/WIFI Language/zh_CN'
        },
        body: {
            openid: openID,
            course_id: courseID,
            lon: longitude,
            lat: latitude,
            wx_csrf_name: "688f1b52953ca0c458e9b8624356ac1b"
        },
        handler: function(resp) {
            var data = resp.data
            for(const i in data) {
                if(data[i][0] === "OK") {
                    isContinue = false
                    var btn = $("mainBtn")
                    btn.title = "开始"
                    btn.bgcolor = $color("tint")
                    $ui.alert({
                        title: "签到成功",
                        message: `名次: 第${data[i][1]}名`,
                    })
                }
            }
        }
    })
}

function requestAllCourseID(openID) {
    $http.request({
        method: "GET",
        url: "https://www.teachermate.com.cn/wechat-api/v1/students/courses?openid=" + openID,
        header: {
            Accept: '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            Connection: 'keep-alive',
            Cookie: "wx_csrf_cookie=d5109d1f5987298e1119628878beac92",
            Host: "www.teachermate.com.cn",
            Origin: "https://www.teachermate.com.cn",
            "User-Agent": 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13E233 MicroMessenger/6.3.15 NetType/WIFI Language/zh_CN'
        },
        handler: function(resp) {
            var data = resp.data
            var idList = []
            for(var i=0; i<data.length; i++) {
                let id = data[i]["id"]
                idList.push(id)
            }
            onGetAllCourseID(idList)
        }
    })
}

function onGetAllCourseID(idList) {
    checkin(openID, idList[idList.length-1], lat, lng) //只需提交一个courseID，就会对所有课程签到
}




