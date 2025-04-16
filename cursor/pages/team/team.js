// team.js
Page({
  data: {
    playerCount: 4,
    players: [
      { id: 1, name: '玩家1' },
      { id: 2, name: '玩家2' },
      { id: 3, name: '玩家3' },
      { id: 4, name: '玩家4' }
    ],
    teams: [
      { id: 1, name: '队伍1', members: [] },
      { id: 2, name: '队伍2', members: [] }
    ]
  },
  
  // 更改玩家数量
  changePlayerCount: function(e) {
    const count = parseInt(e.detail.value);
    let players = [];
    
    for (let i = 1; i <= count; i++) {
      players.push({ id: i, name: `玩家${i}` });
    }
    
    this.setData({
      playerCount: count,
      players: players
    });
  },
  
  // 更新玩家名称
  updatePlayerName: function(e) {
    const index = e.currentTarget.dataset.index;
    const name = e.detail.value;
    
    let players = this.data.players;
    players[index].name = name;
    
    this.setData({
      players: players
    });
  },
  
  // 随机分配队伍
  randomizeTeams: function() {
    let players = [...this.data.players];
    
    // 打乱玩家顺序
    for (let i = players.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [players[i], players[j]] = [players[j], players[i]];
    }
    
    // 分配队伍
    const teams = [
      { id: 1, name: '队伍1', members: [] },
      { id: 2, name: '队伍2', members: [] }
    ];
    
    players.forEach((player, index) => {
      const teamIndex = index % 2;
      teams[teamIndex].members.push(player);
    });
    
    this.setData({
      teams: teams
    });
    
    wx.showToast({
      title: '队伍已分配',
      icon: 'success'
    });
  },
  
  // 开始游戏
  startGame: function() {
    // 存储玩家和队伍信息
    wx.setStorageSync('gamePlayers', this.data.players);
    wx.setStorageSync('gameTeams', this.data.teams);
    
    wx.navigateTo({
      url: '../prepare/prepare',
    });
  },
  
  // 返回首页
  goBack: function() {
    wx.navigateBack();
  }
}) 