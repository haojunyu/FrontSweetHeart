//profile.js
//获取应用实例
var app = getApp(),
    getApiData = require("../../utils/apiData.js").getApiData
Page({
  data: {
    userInfo: {},
    ordNum: {}
  },
  //事件处理函数
  bindViewTap: function() {
    console.log(this.data.userInfo)
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('profile onLoad')




  },
  onShow: function(){
    console.log('profile onShow')
    // 获取个人账户信息
    var that = this
    var userUri = app.globalData.baseUrl + '/api/v1.0/users/' + app.globalData.userInfo['id']
    var token = app.globalData.token + ':none'
    getApiData( userUri, {}, token, function(data){
      console.log('getApiData[onLoad] users/id')
      // 更新全局cashbox
      app.globalData.userInfo['cashbox'] = data['cashbox']
      that.setData({
        userInfo : app.globalData.userInfo
      })
    })

    console.log(app.globalData.userInfo)
    // 获取各类状态订单的数量
    var orderUri = app.globalData.baseUrl + '/api/v1.0/users/'+app.globalData.userInfo['id']+'/orders/statusNum'
    getApiData( orderUri, {}, token, function(data){
      console.log('getApiData[onLoad] orders/statusNum')
      that.setData({
        ordNum : data
      })
    })
  }
})
