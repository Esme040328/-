// pages/prepare/prepare.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDown: 3,
    currentPlayer: {},
    ready: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取玩家和队伍信息
    const players = wx.getStorageSync('gamePlayers') || [];
    
    if (players.length > 0) {
      this.setData({
        currentPlayer: players[0]
      });
    }
    
    // 开始倒计时
    this.startCountDown();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    if (this.countDownTimer) {
      clearInterval(this.countDownTimer);
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 开始倒计时
  startCountDown: function() {
    let count = this.data.countDown;
    
    this.countDownTimer = setInterval(() => {
      count--;
      
      if (count <= 0) {
        clearInterval(this.countDownTimer);
        this.setData({
          countDown: '准备开始',
          ready: true
        });
        
        // 延迟跳转到游戏页面
        setTimeout(() => {
          wx.navigateTo({
            url: '../game/game',
          });
        }, 1000);
      } else {
        this.setData({
          countDown: count
        });
      }
    }, 1000);
  }
})