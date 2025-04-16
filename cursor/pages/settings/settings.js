// settings.js
Page({
  data: {
    gameDuration: 60, // 默认60秒
    wordLibraries: [
      { id: 'basic', name: '基础词库', checked: true },
      { id: 'movie', name: '电影词库', checked: false },
      { id: 'star', name: '明星词库', checked: false }
    ],
    difficulty: [
      { id: 'easy', name: '简单', checked: true },
      { id: 'medium', name: '中等', checked: false },
      { id: 'hard', name: '困难', checked: false }
    ],
    soundEnabled: true
  },
  
  // 设置游戏时长
  setGameDuration: function(e) {
    this.setData({
      gameDuration: e.detail.value
    });
  },
  
  // 选择词库
  selectWordLibrary: function(e) {
    const id = e.currentTarget.dataset.id;
    const wordLibraries = this.data.wordLibraries.map(item => {
      item.checked = item.id === id;
      return item;
    });
    
    this.setData({
      wordLibraries: wordLibraries
    });
  },
  
  // 选择难度
  selectDifficulty: function(e) {
    const id = e.currentTarget.dataset.id;
    const difficulty = this.data.difficulty.map(item => {
      item.checked = item.id === id;
      return item;
    });
    
    this.setData({
      difficulty: difficulty
    });
  },
  
  // 切换音效开关
  toggleSound: function() {
    this.setData({
      soundEnabled: !this.data.soundEnabled
    });
  },
  
  // 保存设置
  saveSettings: function() {
    // 保存设置到本地存储
    const settings = {
      gameDuration: this.data.gameDuration,
      wordLibrary: this.data.wordLibraries.find(item => item.checked).id,
      difficulty: this.data.difficulty.find(item => item.checked).id,
      soundEnabled: this.data.soundEnabled
    };
    
    wx.setStorageSync('gameSettings', settings);
    
    wx.showToast({
      title: '设置已保存',
      icon: 'success',
      duration: 1500,
      success: function() {
        setTimeout(function() {
          wx.navigateBack();
        }, 1500);
      }
    });
  },
  
  // 返回首页
  goBack: function() {
    wx.navigateBack();
  }
}) 