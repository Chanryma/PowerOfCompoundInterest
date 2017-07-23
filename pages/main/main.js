// main.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rates: [0.10, 0.15, 0.20, 0.30, 0.35],
    years: 20,
    cellWidth: 120,
    cells:[],
    calculate1Cells:[],
    calculate2Cells: [],
    currentTab: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '长期究竟有多长'
    })

    var that = this
    var cells = this.calculate1(this.data.years, this.data.rates)
    that.setData({
      cells: cells
    })
  },
  // calculate1Cells
  calculate1: function (years, rates) {
    var realValues = []
    var displayValues = []
    for (var y = 0; y <= years; y ++) {
      var column = [];
      var displayColumn = []
      for (var r = 0; r < rates.length; r++) {
        var value = Math.pow((1 + rates[r]), y)
        column.push(value)
        displayColumn.push(value.toFixed(2))
      }
      realValues.push(column)
      displayValues.push(displayColumn)
    }

    return displayValues
  },

  calculate2: function (years, rates) {
    var realValues = []
    var displayValues = []
    for (var y = 0; y <= years; y++) {
      var column = []
      var displayColumn = []
      var accounts = []
      if (y == 0) {
        for (var i = 0; i < rates.length; i++) {
          accounts = accounts.concat([1.00])
        }
        realValues.push(accounts)
        displayValues.push(accounts)
        continue
      } else {
        accounts = realValues[y - 1]
      }

      for (var r = 0; r < rates.length; r++) {
        var value = accounts[r] * ((1 + rates[r]))
        value = value + 1
        column.push(value)
        displayColumn.push(value.toFixed(2))
      }
      realValues.push(column)
      displayValues.push(displayColumn)
    }

    return displayValues
  },

  onSwiperChanged: function (e) {
    var that = this
    that.setData({ currentTab: e.detail.current });
    if (e.detail.current == 0) {
      var cells = that.calculate1(that.data.years, that.data.rates)
      that.setData({
        cells: cells
      })
    } else if (e.detail.current == 1) {
      var cells = that.calculate2(that.data.years, that.data.rates)
      that.setData({
        cells: cells
      })
    }
  }
})