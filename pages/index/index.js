//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls: [
      "../../res/imgs/index/banner1.jpg",
      "../../res/imgs/index/banner2.jpg",
      "../../res/imgs/index/banner3.jpg"
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,

    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    console.log(this.data.userInfo)
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    this.setData({
      userInfo: app.globalData.userInfo
    })

    // 显示分享--分享带shareTicket
    wx.showShareMenu({
      withShareTicket: true
    })
    //调用应用实例的方法获取全局数据
    /*
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    */
  },

  onShareAppMessage: function () {
    return {
      title: '转发送券',
      desc: '转发微信小程序获取代金券，一次5元',
      path: 'pages/index/index?userId='+app.globalData.userInfo['id'],
      success: function(res) {
        // 转发成功
        console.log('function[onShareAppMessage] success!')
      },
      fail: function(res) {
        // 转发失败
        console.log('function[onShareAppMessage] fail!')
      }
    }
  }
})
