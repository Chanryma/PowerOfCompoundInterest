//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '长期究竟有多长',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '长期究竟有多长'
    })

    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onClickButton: function () {
    wx.navigateTo({
      url: '../main/main'
    })
  }
})
