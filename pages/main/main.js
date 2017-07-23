// main.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rates: [0.10, 0.15, 0.20, 0.30, 0.35],
    years: 20,
    cellWidth: 120,
    calculate1Cells: [],
    calculate2Cells: [],
    currentTab: 0,
    leftTabClass: "tab-default",
    rightTabClass: "tab-disselected",
    table1Hidden: false,
    table2Hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '长期究竟有多长'
    })

    var that = this
    var calculate1Cells = this.calculate1(this.data.years, this.data.rates)
    var calculate2Cells = this.calculate2(this.data.years, this.data.rates)
    that.setData({
      calculate1Cells: calculate1Cells,
      calculate2Cells: calculate2Cells,
    })
  },
  // calculate1Cells
  calculate1: function (years, rates) {
    var realValues = []
    var displayValues = []
    for (var y = 0; y <= years; y++) {
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

  onClickLeftTab: function () {
    this.setData({
      leftTabClass: "tab-default",
      rightTabClass: "tab-disselected",
      table1Hidden: false,
      table2Hidden: true
    })
  },

  onClickRightTab: function () {
    this.setData({
      leftTabClass: "tab-disselected",
      rightTabClass: "tab-default",
      table1Hidden: true,
      table2Hidden: false
    })
  }
})