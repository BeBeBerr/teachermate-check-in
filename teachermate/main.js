var openID = ""
var lat = 0
var lng = 0

var isContinue = false
var triedCount = 0

var netHandler = require("scripts/NetHandler")

main()

function main() {

    $app.idleTimerDisabled = true //禁止自动休眠

    var clipboardText = $clipboard.text
    openID = clipboardText.split("openid=")[1]
    
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

function start() {
    
    if(netHandler.getCheckInState()) {
        setTryingStateTo(false)
        let rankNumber = netHandler.getRankNumber()
        $ui.alert({
            title: "恭喜",
            message: `您已签到成功\n名次: 第${rankNumber}名`,
        })
    } 

    if(triedCount >= 20) {
        setTryingStateTo(false)
    }
    
    if(!isContinue) {
        return
    }

    $ui.toast("正在尝试签到...")

    netHandler.tryToCheckIn(openID, lat, lng)
    triedCount += 1
    
    $delay(3, function() {
        start()
    })

} 

function setTryingStateTo(isContinueTrying) {
    let btn = $("mainBtn")
    if(isContinueTrying) {
        isContinue = true
        btn.title = "停止"
        btn.bgcolor = $color("red")
        $ui.toast("已开始")
        start()
    } else {
        isContinue = false
        btn.title = "开始"
        btn.bgcolor = $color("tint")
        $ui.toast("已停止")
    }
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
                    setTryingStateTo(!isContinue)
                }
            }
        }]
    })
}

module.exports = {
    setTryingStateTo: setTryingStateTo
}



