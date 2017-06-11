//comment.js
var app = getApp(),
    getApiData = require("../../utils/apiData.js").getApiData,
    postApiData = require("../../utils/apiData.js").postApiData,
    putApiData = require("../../utils/apiData.js").putApiData,
    Base64 = require('../../utils/Base64.js')
Page({
  data: {
    key: 3,
    cakeId : null,
    orderId : null,
    showTopTips: '',
    files: []
  },
  onLoad: function (req) {
    console.log(req.cakeId)
    console.log(req.orderId)
    // 设置图片前缀：userId_cakeId_*
    this.setData({
      cakeId: req.cakeId,
      orderId: req.orderId
    })
  },
  //点击左边,半颗星
  selectLeft: function (e) {
    var key = e.currentTarget.dataset.key
    if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
      //只有一颗星的时候,再次点击,变为0颗
      key = 0;
    }
    console.log("得" + key + "分")
    this.setData({
      key: key
    })

  },
  //点击右边,整颗星
  selectRight: function (e) {
    var key = e.currentTarget.dataset.key
    console.log("得" + key + "分")
    this.setData({
      key: key
    })
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 8,  // 最多上传的照片数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        if(res.tempFilePaths.length > 8){
          that.setData({
            showTopTips:'最多只能上传8张图片'
          })
        }
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: res.tempFilePaths
        });
      }
    })
  },
  previewImage: function(e){
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  submitComment: function(e){

    // 更新数据库
    var that = this
    var token = app.globalData.token + ':none'
    var comUri = app.globalData.baseUrl + '/api/v1.0/comments'
    var data = {}
    data['cakeId']=this.data.cakeId
    data['userId']=app.globalData.userInfo['id']
    data['stars']=this.data.key
    data['comment']=e.detail.value.txt

    console.log('update database table comments...')
    postApiData( comUri, data, token, function(data){
      console.log(data)
      console.log('postApiData[submitComment] /comments')
      if(that.data.files.length!=0){
        // 上传图片到服务器
        that.uploadImage(that.data.files, data[2]['commentId'])
        wx.showToast({
            title: '图片上传成功',
            icon: 'success',
            duration: 3000
        });
      }

      // 更新订单状态
      var orderUri = app.globalData.baseUrl + '/api/v1.0/orders/' + that.data.orderId
      var ordData = {}
      ordData['status']=3
      putApiData( orderUri, ordData, token, function(data){
        console.log(data)
        console.log('putApiData[submitComment] /orders')
      })

      // 跳转到已评论界面
      wx.redirectTo({
        url: '../orders/orders?status=3'
      })
    })




  },
  // 递归上传图片到服务器
  uploadImage: function(files, commentId){
    console.log('function uploadImage...')
    console.log(files)
    console.log(commentId)
    var token = app.globalData.token + ':none'
    var preName = app.globalData.userInfo['id'] + '_' + this.data.cakeId + '_'
    // 批量上传图片到服务器
    if(files.length != 0){
      console.log('uploadImage '+files[0]+'....')
      var that = this
      wx.uploadFile({
        url: app.globalData.baseUrl + '/api/v1.0/upload',
        filePath: files[0],
        name: 'file',
        formData:{
          'fileName': preName + files[0].substring(13)
        },
        header  : {
          'authorization': 'Basic ' + Base64.encode(token),
          'context-type'  : 'multipart/form-data'
        },
        success: function(res){
          console.log(res)
          console.log('uploadImage '+files[0]+' successed!')
          var picUri = app.globalData.baseUrl + '/api/v1.0/pictures'
          var data = {}
          data['commentId']=commentId
          data['picName']=preName + files[0].substring(13)
          // 更新数据库表pictures
          postApiData( picUri, data, token, function(data){
            console.log(data)
            console.log('postApiData[POST] /pictures')
          })
          files.splice(0,1)
          that.uploadImage(files,commentId)
        },
        fail: function(res){
          console.log('wx.uploadFile fail...')
        },
        complete: function(res){
          console.log('wx.uploadFile complete...')
          console.log(res)
        }
      })
    }
  }
})
