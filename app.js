//app.js
App({
  onLaunch: function() {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowWidth + "," + res.windowHeight);
        that.globalData.windowHeight = res.screenHeight
        that.globalData.windowWidth = res.screenWidth
      }
    });
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    windowWidth:0,
    windowHeight: 0
  }
})
