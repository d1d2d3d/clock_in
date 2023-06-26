
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    haswork: false,
    identify: '',
    student_1: [{
        icon: '/pages/grid/定位.png',
        title: '打卡',
        url: '/pages/clock_in/index'
      },
      {
        icon: '/pages/grid/更多.png',
        title: '',
        url: ''
      }
    ],
    student_2: [{
        icon: '/pages/grid/退出登录.png',
        title: '重新登录',
        url: '../login/login'
      },
      {
        icon: '/pages/grid/更改密码.png',
        title: '更改密码',
        url: '../change_password/index'
      },
      {
        icon: '',
        title: '个人信息',
        url: '../personal_information/index'
      },
      {
        icon: '/pages/grid/更多.png',
        title: '',
        url: ''
      }
    ],
    teacher_1: [{
        icon: '/pages/grid/任务.png',
        title: '打卡情况',
        url: '../list/index'
      },
      {
        icon: '/pages/grid/发布色块.png',
        title: '发布打卡',
        url: '../issue_task/index'
      },
      {
        icon: '/pages/grid/更多.png',
        title: '',
        url: ''
      }
    ],
    teacher_2: [{
        icon: '/pages/grid/更改密码.png',
        title: '修改密码',
        url: '../change_password/index'
      },
      { //这里跳转不了
        icon: '',
        title: '个人信息',
        url: '../personal_information/index'
      },
      {
        icon: '/pages/grid/退出登录.png',
        title: '重新登录',
        url: '../login/login'
      },
      {
        icon: '/pages/grid/更多.png',
        title: '',
        url: ''
      }
    ]
  },

  onShow() {
	  console.log("导航界面")
	  console.log(app.data.global_identify)
      var that=this
      that.setData({
        identify:app.data.global_identify
      })
      console.log(that.data.identify)
      that.data.account=app.data.global_account 
      console.log("进入主界面")
    var account=app.data.global_account
    console.log(account)
    wx.request({
      url: app.data.url+'/isCard',
      method: 'GET',
      data:{
        account:account
      },
      success: function (res) {
        //  const  res=JSON.parse(res.data)
        console.log('主界面服务器')
        console.log(res)
    //   console.log( res.status)
        if (res.data.status == 'successful') {
          app.data.global_haswork=true
          console.log(that.data.identify)
          if(that.data.identify=='学生'){
          wx.showModal({
            title: '你有一个未完成的打卡任务',
            content: '是否前往打卡',
            success: function(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../clock_in/index',
                })
              } else if (res.cancel) {
               
              }
            }
          })
        }
        }
      }
    })
  },

  onShareAppMessage() {
    return app.shareMessage();
  },
  goto_information() {
    wx.switchTab({
      url: '../personal_information/index'
    })
  },
  handleClick({
    detail
  }) {
    console.log(detail);
  },
});