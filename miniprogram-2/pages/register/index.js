//注册
var app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    reshoot: false, //是否重拍标志
    mode: 1, //拍照or从相册选择
    //以下向服务器提交
    src: '', //图片地址
    account: '',
    name: '',
    password: '',
    identify: '教师',
    gender: '男', // 性别
    birthday: '', // 生日
    //
    radioList: [{
        checked: true,
        value: 1,
        label: '男'
      },
      {
        checked: false,
        value: 2,
        label: '女'
      }
    ],
    identifyList: [{
        checked: true,
        value: 1,
        label: '教师'
      },
      {
        checked: false,
        value: 2,
        label: '学生'
      }
    ],
    modeList: [{
        checked: true,
        value: 1,
        label: '从相册选择'
      },
      {
        checked: false,
        value: 2,
        label: '拍照'
      }
    ],
  },

  handleInput1(e) {
    this.setData({
      account: e.detail.value
    })
  },
  handleInput2(e) {
    this.setData({
      name: e.detail.value
    })
  },
  handleInput3(e) {
    this.setData({
      password: e.detail.value
    })
  },
  handlegender(e) {
    this.setData({
      gender: e.detail.item.label
    })
  },
  handleidentify(e) {
    console.log(this.data)
    this.setData({
      identify: e.detail.item.label
    })
  },
  handlemode(e) {
    this.setData({
      mode: e.detail.item.value,
      src:''
    })
  },
  handleDate(e) {
    this.setData({
    birthday: e.detail.formatValue
    })

  },
  // 拍照
  reTakePhoto() {
    this.setData({
      reshoot: false
    });
  },
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
  error(e) { //获取图片失败时
    wx.showToast({
      title: '请允许小程序使用摄像头',
      icon: 'none',
      duration: 2000
    });
  },

  chooseimage() {
    var that =this
    wx.chooseMedia({
      success(res) {
        console.log(res)
        that.setData({
          src:res.tempFiles[0].tempFilePath,
        })
      }
    })
  },
  submit() {
    if (!this.data.name||!this.data.account||!this.data.password||!this.data.identify||!this.data.src) {
      wx.showToast({
        title: '请完整填写信息',
        icon: 'none'
      })
      return
    }
    console.log(this.data)
    wx.uploadFile({
      filePath: this.data.src,
      header:{
          'action':'register'
      },
      name: 'file',
      url: app.data.url,
      formData:{
        'account':this.data.account,
        'name':this.data.name,
        'password':this.data.password,
        'identify':this.data.identify,
        'gender':this.data.gender,
        'birthday':this.data.birthday
      },
      success:function(res){
          const response = JSON.parse(res.data) 
          console.log(response.status )
          if(response.status == 'successful'){
            wx.showToast({
              title: '注册成功',
              icon:'success',
              duration: 2000
            })
            wx.navigateTo({
              url: '../login/login',
            })
          }else{
            wx.showToast({
              title: '没有检测到人脸或账号已存在',
              icon:'none',
              duration: 2000
            })
          }
      }
    })
  }
});