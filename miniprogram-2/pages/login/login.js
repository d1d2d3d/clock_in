// 登录界面.js
var app = getApp()
Page({
  data: {
    disabled: true,
    btnstate:  'default',
    visibility: true,
    account: '',
    password: ''
  },
  accountInput(e) {	  
    var a = e.detail.value;
    this.setData({
        account: a
      });
    if (a != '') {
      this.setData({
        disabled: false,
        btnstate: 'primary',
      });
    } else {
      this.setData({
        disabled: true,
        btnstate: 'default'
      });
    }
  },
  pwdBlur (e) {
	  console.log(e)
    var password = e.detail.value;
      this.setData({
        password: password
      });
  },
  visible() {
    this.setData({
      visibility: !this.data.visibility
    })
  },
  login(e) {
    var that = this;
    console.log(that.data.account)
    if (that.data.account =='') {
      wx.showToast({
        title: '请输入账号',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (that.data.password == '') {
	wx.showToast({
	  title: '请输入密码',
	  icon: 'none',
	  duration: 2000
	});
	return;
      }
    wx.request({
      url: app.data.url,
      method: 'POST',
      data: {
        account: that.data.account,
        password: that.data.password
      },
      header: {
        'content-type': 'application/json',
        'action': 'login'
      },
      success: function (res) {
          console.log("登录服务器")
          console.log(res)
        let response = res.data
        const result = response.status
        const identify = response.idenify
        if (result == 'successful') {
            // wx.hideLoading()
          wx.showToast({
            title: '登录成功',
            icon: 'none',
            duration: 4000
          })
app.data.global_account=response.account
app.data.global_name=response.name
app.data.global_gender=response.gender
app.data.global_identify=response.identify
app.data.global_birthday=response.birthday
// app.data.global_src=response.src
          if (response.identify == '教师') {
            wx.switchTab({
              url: '../grid/index'
            })
          } else {
            wx.switchTab({
              url: '../grid/index'
            })
          }
        } else {
          wx.showToast({
            title: '登录失败,请检查账号或密码!',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }
})