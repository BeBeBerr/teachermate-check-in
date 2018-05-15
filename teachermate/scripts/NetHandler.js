var isCheckInSuccess = false
var rankNumber = 0

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
                    isCheckInSuccess = true
                    rankNumber = data[i][1]
                    /*
                    isContinue = false
                    var btn = $("mainBtn")
                    btn.title = "开始"
                    btn.bgcolor = $color("tint") 
                    $ui.alert({
                        title: "签到成功",
                        message: `名次: 第${data[i][1]}名`,
                    }) */
                }
            }
        }
    })
}

function requestAllCourseID(openID, latitude, longitude) {
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
            onGetAllCourseID(idList, openID, latitude, longitude)
        }
    })
}

function onGetAllCourseID(idList, openID, latitude, longitude) {
    checkin(openID, idList[idList.length-1], latitude, longitude) //只需提交一个courseID，就会对所有课程签到
}

function tryToCheckIn(openID, latitude, longitude) {
    requestAllCourseID(openID, latitude, longitude)
}

function getCheckInState() {
    return isCheckInSuccess
}

function getRankNumber() {
    return rankNumber
}

module.exports = {
    tryToCheckIn: tryToCheckIn,
    getCheckInState: getCheckInState,
    getRankNumber: getRankNumber
}

