
// pages/add/add.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reshoot: false,//是否重拍标志
    src: '',//图片地址
    name: '',
    account: '',
    password:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 用户名输入
  InputUser(e) {
    this.setData({
      name: e.detail.value//获取输入框的值
    })
  },

  // 学号输入
  InputID(e) {
    this.setData({
      account: e.detail.value
    })
  },
  // 拍照
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath,
          reshoot: true
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '拍照错误',
          icon: 'none',
          duration: 2000
        });
      }
    })
  },
  error(e) {//获取图片失败时
    wx.showToast({
      title: '请允许小程序使用摄像头',
      icon: 'none',
      duration: 2000
    });
  },
    // 重拍
    reTakePhoto() {
      this.setData({
        reshoot: false
      });
    },
     

  // 向服务器上传图片获取反馈
  upload(e) {
    var that = this;
    if (that.data.name == ''||that.data.account==''||that.data.src=='') {
      wx.showToast({
        title: '请完整填写信息',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    wx.uploadFile({
      url: app.data.url, //向该链接上传图片
      filePath: that.data.src,
      name: 'file',
      header:{
         'action':'fpwd'
      },
      formData: {
        'username': that.data.name,
        'account': that.data.account
      },
      success: function (res) {//服务器返回的数据
        console.log(res);
        var data = JSON.parse(res.data);//对象转换
        if(data.status=='successful')
        {
          that.setData({
            password:data.pwd
          })
          wx.showToast({
              title: '找回成功，密码为'+that.data.password,
              icon: 'success',
              duration: 2000
          });
        }else   
         { wx.showToast({
          title: '人脸识别错误，未能找回密码，请重试',
          icon: 'false',
          duration: 2000
          })
        }
        }
    })
  },
})