//cake.js
//获取应用实例
var app = getApp(),
    getApiData = require("../../utils/apiData.js").getApiData
Page({
  data: {
    categories : [],
    cakes : [],
    cakeOrderNum: {},
    activeIndex: 0, // 选中类型的索引
    sliderOffset: 0,
    sliderWidth: 0
  },
  // 装载页面
  onLoad: function(){
    var storeCates = wx.getStorageSync('categories')
    if (storeCates){
      console.log('getStoreData[onLoad] categories')
      this.setData({
        categories : storeCates
      })

      var cateUrl = this.data.categories[this.data.activeIndex].uri
      var storeCakes = wx.getStorageSync(cateUrl)
      console.log('getStoreData[onLoad] categories/id/cakes')
      this.setData({
        cakes : storeCakes
      })
    }else{
      var that = this
      var token = app.globalData.token + ':none'
      console.log('token: '+token)
      getApiData( app.globalData.baseUrl + '/api/v1.0/categories', {}, token, function(data){
        console.log('getApiData[onLoad] categories')
        that.setData({
          categories : data.categories
        })
        wx.setStorageSync('categories', data.categories)

        var these = that
        wx.getSystemInfo({
          success: function(res) {
            var width = res.windowWidth / these.data.categories.length
            these.setData({
              sliderWidth: width,
              sliderOffset: width * these.data.activeIndex
            });
          }
        });

        var cateUrl = that.data.categories[that.data.activeIndex].uri
        var storeCakes = wx.getStorageSync(cateUrl)
        if (storeCakes){
          console.log('getStoreData[onLoad] categories/id/cakes')
          this.setData({
            cakes : storeCakes
          })
        }else{
          getApiData( cateUrl + '/cakes', {}, token, function(data){
            console.log('getApiData[onLoad] categories/id/cakes')
            these.setData({
              cakes : data.cakes
            })
            wx.setStorageSync(cateUrl, data.cakes)
          })
        }

      })
    }

    // 加载数据
/*    wx.request({
      url: 'https://flask.haojunyu.com/api/v1.0/categories',
      header: {
        'content-type': 'application/json'
      },
      success: function(res){
        console.log(res.data)


        that.setData({
          categories : res.data.categories
        })

      }
    })*/

  },
  // 显示界面
  onShow: function(){
    // 加载各种蛋糕的订单数量
    var that = this
    var token = app.globalData.token + ':none'
    getApiData( app.globalData.baseUrl + '/api/v1.0/orders/cakeNum', {}, token, function(data){
      console.log('getApiData[onLoad] orders/cakeNum')
      that.setData({
        cakeOrderNum : data
      })
    })

  },
  tabClick: function (e) {
    this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
    });

    var cateUrl = this.data.categories[this.data.activeIndex].uri
    var storeCakes = wx.getStorageSync(cateUrl)
    if (storeCakes){
      console.log('getStoreData[tabClick] categories/id/cakes')
      this.setData({
        cakes : storeCakes
      })
    }else{
      var that = this
      var token = app.globalData.token + ':none'
      getApiData( cateUrl + '/cakes', {}, token, function(data){
        console.log('getApiData[tabClick] categories/id/cakes')
        that.setData({
          cakes : data.cakes
        })
        wx.setStorageSync(cateUrl, data.cakes)
      })
    }
  }

})
