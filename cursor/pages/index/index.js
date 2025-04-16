// index.js
Page({
  data: {
    
  },
  
  // 开始游戏
  startGame: function() {
    console.log('开始游戏按钮被点击');
    wx.navigateTo({
      url: '../team/team',
      success: function() {
        console.log('导航到组队页面成功');
      },
      fail: function(err) {
        console.error('导航失败', err);
      }
    });
  },
  
  // 显示规则
  showRules: function() {
    wx.showModal({
      title: '游戏规则',
      content: '一名玩家手持设备，屏幕上显示需要猜的词语，但持有者看不到。其他玩家通过语言或肢体动作描述，该词语持有者根据描述进行猜测。猜对后点击左半边区域，跳过则点击右半边区域。每轮有时间限制，规定时间内猜对的词语数量越多，得分越高。',
      showCancel: false,
      confirmText: '知道了'
    });
  },
  
  // 查看历史记录
  showHistory: function() {
    wx.showToast({
      title: '历史记录功能开发中',
      icon: 'none'
    });
  },
  
  // 进入设置页
  goToSettings: function() {
    wx.navigateTo({
      url: '../settings/settings',
    });
  }
})
