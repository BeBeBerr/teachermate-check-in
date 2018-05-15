# 微助教签到 JSBox 版

在帅气的威威的帮助下，参考[他的代码](https://github.com/taoweicn/teachermate-auto-check-in)实现了微助教签到 JSBox 版，更加易用。

## 使用

- 将 teachermate 文件夹放入 JSBox 中。你可以[点击链接](https://xteko.com/redir?name=teachermate&url=https://github.com/BeBeBerr/teachermate-check-in/releases/download/v1.0/teachermate.box)扫码二维码无痛安装脚本。你可以在 JSBox 或系统相机中扫码，若使用微信扫描二维码，则请点击“在 Safari ”中打开。
- 微信中打开微助教服务号，点击“我的”、“我的信息”、“个人信息”。进入详情页后，点击右上角省略号图标，点击复制链接按钮。

<img src="https://raw.githubusercontent.com/BeBeBerr/teachermate-check-in/master/img/1.PNG" style="zoom:40%" />

- 在 widget 或 JSBox 中运行 teachermate 脚本！

  <img src="https://raw.githubusercontent.com/BeBeBerr/teachermate-check-in/master/img/2.jpg" style="zoom:50%" />

**搞定！**

## 功能

- 复制链接后直接运行脚本即可，脚本会自动在剪切板中提取关键的 openid 信息。

- 运行脚本后，会弹出地图。可以模拟地图上任意一点进行签到，再也不怕开启 GPS 定位功能啦！

  <img src="https://raw.githubusercontent.com/BeBeBerr/teachermate-check-in/master/img/4.PNG" style="zoom:40%" />

- 点击开始按钮后，每隔一段时间会尝试签到一次。当点击停止按钮，或尝试超过一定次数后将停止。

  <img src="https://raw.githubusercontent.com/BeBeBerr/teachermate-check-in/master/img/5.PNG" style="zoom:40%" />

## 注意

- 程序还不完善，许多边界条件还没有考虑到，请不要过分信赖。
- 目前，连续尝试 20 次后会停止尝试。你可以在 `main.js` 中把相应的判断语句修改成你希望的次数。但是，长时间、高频率的签到行为可能存在风险。
- 签到成功后，会弹出提示框，并显示名次。
- 可以用来抢第一，不要逃课哦！

## 什么是 JSBox ？

JSBox 是一位非常 nb 的 iOS 开发者的独立作品，可以在 iOS 上运行 JavaScript 脚本。在简单应用场景下（比如微助教签到），无需再编写 iOS App。

JSBox 目前售价 40 元。





