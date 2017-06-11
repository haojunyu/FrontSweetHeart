var Base64 = require('Base64.js')
module.exports = {
  getApiData(url, data, token, callback){
    wx.request({
      url     : url,
      data    : data,
      header  : {
        'Authorization': 'Basic ' + Base64.encode(token),
        'Context-Type'  : 'application/json'
      },
      success : function(res){
        callback(res.data)
      }
    })
  },
  getFulApiData(url, data, token, sucCallBack, comCallBack){
    wx.request({
      url     : url,
      data    : data,
      header  : {
        'Authorization': 'Basic ' + Base64.encode(token),
        'Context-Type'  : 'application/json'
      },
      success : function(res){
        sucCallBack(res.data)
      },
      complete : function(res){
        comCallBack(res.data)
      }
    })
  },
  postApiData(url, data, token, callback){
    wx.request({
      url     : url,
      data    : data,
      method  : 'POST',
      header  : {
        'Authorization': 'Basic ' + Base64.encode(token),
        'Context-Type'  : 'application/json'
      },
      success : function(res){
        callback(res.data)
      }
    })
  },
  putApiData(url, data, token, callback){
    wx.request({
      url     : url,
      data    : data,
      method  : 'PUT',
      header  : {
        'Authorization': 'Basic ' + Base64.encode(token),
        'Context-Type'  : 'application/json'
      },
      success : function(res){
        callback(res.data)
      }
    })
  }
}
