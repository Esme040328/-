// pages/game/game.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeLeft: 60, // 默认60秒
    currentWord: '',
    correctCount: 0,
    skipCount: 0,
    totalScore: 0,
    wordList: [
      '苹果', '香蕉', '橙子', '西瓜', '草莓',
      '电影', '电视剧', '综艺', '动画片', '纪录片',
      '足球', '篮球', '乒乓球', '羽毛球', '网球',
      '医生', '老师', '工程师', '律师', '科学家',
      '北京', '上海', '广州', '深圳', '成都'
    ],
    currentIndex: 0,
    isPlaying: true,
    isPaused: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取游戏设置
    const settings = wx.getStorageSync('gameSettings');
    
    if (settings) {
      this.setData({
        timeLeft: settings.gameDuration || 60
      });
    }
    
    // 随机打乱词语顺序
    this.shuffleWordList();
    
    // 设置第一个词
    this.setCurrentWord();
    
    // 开始倒计时
    this.startTimer();
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
    if (this.timer) {
      clearInterval(this.timer);
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

  // 返回上一页
  goBack: function() {
    // 暂停游戏
    if (!this.data.isPaused) {
      this.togglePause();
    }
    
    // 提示用户确认
    wx.showModal({
      title: '提示',
      content: '确定要退出游戏吗？当前游戏进度将不会保存。',
      success: (res) => {
        if (res.confirm) {
          // 清除定时器
          if (this.timer) {
            clearInterval(this.timer);
          }
          // 返回上一页
          wx.navigateBack();
        } else {
          // 继续游戏
          if (this.data.isPaused) {
            this.togglePause();
          }
        }
      }
    });
  },

  // 打乱词语顺序
  shuffleWordList: function() {
    const wordList = [...this.data.wordList];
    
    for (let i = wordList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordList[i], wordList[j]] = [wordList[j], wordList[i]];
    }
    
    this.setData({
      wordList: wordList
    });
  },
  
  // 设置当前词语
  setCurrentWord: function() {
    const { currentIndex, wordList } = this.data;
    
    if (currentIndex < wordList.length) {
      this.setData({
        currentWord: wordList[currentIndex]
      });
    } else {
      // 所有词语都已经用完，结束游戏
      this.endRound();
    }
  },
  
  // 开始计时器
  startTimer: function() {
    this.timer = setInterval(() => {
      if (this.data.isPaused) return;
      
      let timeLeft = this.data.timeLeft - 1;
      
      if (timeLeft <= 0) {
        clearInterval(this.timer);
        this.endRound();
      } else {
        this.setData({
          timeLeft: timeLeft
        });
      }
    }, 1000);
  },
  
  // 暂停/继续游戏
  togglePause: function() {
    this.setData({
      isPaused: !this.data.isPaused
    });
  },
  
  // 处理猜对
  handleCorrect: function() {
    if (!this.data.isPlaying || this.data.isPaused) return;
    
    this.setData({
      correctCount: this.data.correctCount + 1,
      totalScore: this.data.totalScore + 1,
      currentIndex: this.data.currentIndex + 1
    });
    
    this.setCurrentWord();
  },
  
  // 处理跳过
  handleSkip: function() {
    if (!this.data.isPlaying || this.data.isPaused) return;
    
    this.setData({
      skipCount: this.data.skipCount + 1,
      currentIndex: this.data.currentIndex + 1
    });
    
    this.setCurrentWord();
  },
  
  // 结束回合
  endRound: function() {
    this.setData({
      isPlaying: false
    });
    
    // 保存本轮结果
    const roundResult = {
      correctCount: this.data.correctCount,
      skipCount: this.data.skipCount,
      totalScore: this.data.totalScore,
      usedTime: 60 - this.data.timeLeft
    };
    
    wx.setStorageSync('roundResult', roundResult);
    
    // 跳转到结算页面
    wx.navigateTo({
      url: '../roundResult/roundResult',
    });
  }
})