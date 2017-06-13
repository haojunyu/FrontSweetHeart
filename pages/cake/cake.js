//cake.js
//获取应用实例
var app = getApp(),
    getApiData = require("../../utils/apiData.js").getApiData,
    postApiData = require("../../utils/apiData.js").postApiData,
    putApiData = require("../../utils/apiData.js").putApiData,
    md5 = require("../../utils/md5.js").hex_md5
Page({
  data: {
    cakeDetail: {},
    imgUrl: null,
    cakeComments: {},
    cakeUri: null,
    ordersNum : null,
    location: '江苏省镇江市润州区黄山西路万达广场写字楼A座716室',
    phone: '18261956851'
  },
  // 装载页面
  onLoad: function(request){
    console.log(request.uri)
    this.setData({
      cakeUri:request.uri
    })
    // 设置imgUrl
    this.setData({
      imgUrl: app.globalData.baseUrl + '/imgs/'
    })
    var that = this
    var token = app.globalData.token + ':none'
    console.log('token: '+token)
    getApiData( request.uri, {}, token, function(data){
      that.setData({
        cakeDetail:data
      })
    })

    // 获取甜点的订单数目
    var ordUri = this.data.cakeUri + '/orderNum'
    console.log(ordUri)
    getApiData( ordUri, {}, token, function(data){
      console.log(data)
      that.setData({
        ordersNum : data.orderNum
      })
    })

    // 获取完整的评论
    getApiData( request.uri+'/comments', {}, token, function(data){
      that.setData({
        cakeComments:data.comments
      })
    })
  },
  // 下单
  gobuy: function(e){
    var token = app.globalData.token + ':none'
    console.log('立即下单......')
    var cashbox = parseFloat(app.globalData.userInfo['cashbox'])
    var price = parseFloat(this.data.cakeDetail['price'])
    var fee = 0.0
    var discount = 0.0
    if( cashbox > 0){
      if(cashbox <= price){
        fee = price - cashbox
        discount = cashbox
      }else{
        fee = 0.01
        discount = price-0.01
      }
    }else{
      fee = price
    }

    var that = this
    // 获取预付单信息 （金额赋值为this.data.cakeDetail['price']）
    getApiData(app.globalData.baseUrl + '/api/v1.0/prepay', {
      'body' : app.globalData.mch_name + '-' + this.data.cakeDetail['cate']['desc'],
      'total_fee': fee,
      'notify_url': app.globalData.baseUrl + 'api/v1.0/notify'
    }, token, function(data){
      if(data['prepay']['return_code'] = 'SUCCESS' && data['prepay']['result_code']){
        // 付款
        var timeStamp = new Date().getTime().toString()
        var nonceStr = Math.random().toString(36).substr(2)
        var pack = 'prepay_id=' + data['prepay']['prepay_id']
        var signData = 'appId=' + data['prepay']['appid']
        signData += '&nonceStr=' + nonceStr
        signData += '&package=' + pack
        signData += '&signType=MD5&timeStamp='+timeStamp
        signData += '&key=666ZhangWangLuTin00SweetHeart999'
        wx.requestPayment({
          'timeStamp': timeStamp,
          'nonceStr': nonceStr,
          'package': pack,
          'signType': 'MD5',
          'paySign': md5(signData),
          'success':function(res){
            console.log('pay success......')
            console.log(res)
            // 记录单号
            var orderUri = app.globalData.baseUrl + '/api/v1.0/orders'
            var orderData = {}
            orderData['userId']=app.globalData.userInfo['id']
            orderData['cakeId']=that.data.cakeDetail.cakeId
            orderData['status']=1
            orderData['prepayId']=data['prepay']['prepay_id']
            // 更新数据库表orders
            postApiData( orderUri, orderData, token, function(data){
              console.log(data)
              console.log('postApiData[POST] /orders')
            })

            // 更新数据库表user.cashbox
            if(discount != 0.0){
              var userUri = app.globalData.baseUrl + '/api/v1.0/users/' + app.globalData.userInfo['id'] + '/subCash'
              putApiData(userUri, {
                'cash': discount
              }, token, function(res){
                console.log('消费余额'+ discount +'元成功！')
              })
            }

            // 跳转到已下单界面
            wx.redirectTo({
              url: '../orders/orders?status=1'
            })
          },
          'fail':function(res){
            console.log('pay fail......')
            console.log(res)
          }
        })
      }
      console.log(data)
    })
  }

})
