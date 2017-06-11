//cake.js
//获取应用实例
var app = getApp(),
    getApiData = require("../../utils/apiData.js").getApiData
Page({
  data: {
    orders : [],
    status : null
  },
  // 装载页面
  onLoad: function(request){
    console.log(request.status)
    this.setData({
      status:request.status
    })

  },
  // 显示界面
  onShow: function(){
    var orderUrl = app.globalData.baseUrl + '/api/v1.0/users/' + app.globalData.userInfo['id'] + '/status/' + this.data.status
    var that = this
    var token = app.globalData.token + ':none'
    console.log('token: '+token)
    getApiData( orderUrl + '/orders', {}, token, function(data){
      console.log('getApiData[onLoad] users/*/status/*/orders')
      that.setData({
        orders : data.orders
      })
      wx.setStorageSync(orderUrl, data.orders)
    })

  },
  goComment: function (e) {
    console.log(e)
    var cakeId = e.currentTarget.dataset.cakeid
    var orderId = e.currentTarget.dataset.orderid
    console.log(cakeId)
    console.log(orderId)
    wx.navigateTo({
      url: '../comment/comment?cakeId='+cakeId+'&orderId='+orderId
    })
  },
  goCakeDetail: function(e){
    var cakeUri = e.currentTarget.dataset.uri
    wx.navigateTo({
      url: '../cake/cake?uri='+cakeUri
    })
  }
})
