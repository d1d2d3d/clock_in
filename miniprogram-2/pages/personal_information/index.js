
var app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tag: false, //是否可以修改标志
    reshoot:false,
    mode: 1, //拍照or从相册选择
    //以下向服务器提交
    src: 'about.png',//app.data.global_src, //图片地址
    account:'',
    name: '',
    password: '',
    identify:'',
    gender: '', // 性别
    birthday:'', // 生日
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
  },
  onLoad() {
this.setData({

  account: app.data.global_account,
  name: app.data.global_name,
  password: app.data.global_password,
  identify:app.data.global_identify,
  gender: app.data.global_gender, // 性别
  birthday:app.data.global_birthday, // 生日
})
  },
    /**
   * 生命周期函数--监听页面隐藏
   */
  onShow() {
this.setData({
  tag:false,
  account: app.data.global_account,
  name: app.data.global_name,
  password: app.data.global_password,
  identify:app.data.global_identify,
  gender: app.data.global_gender, // 性别
  birthday:app.data.global_birthday, // 生日
})
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
    this.setData({
      identify: e.detail.item.label
    })
  },
  handlemode(e) {
    this.setData({
      mode: e.detail.item.value
    })
  },
  handleDate(e) {
    console.log(e)
    this.setData({
    birthday: e.detail.formatValue
    })
  },
  // 选择图片
  chooseimage() {
    var that=this
    console.log("qian")
  console.log(that.data.tag)
  wx.chooseMedia({
    success(res) {
      that.setData({
        src:res.tempFiles[0].tempFilePath,
        tag: true
      })
    }
  })
  },

  change(){
  this.setData({
    tag:true
    })
  },
  submit() {
var that=this
    if (!this.data.name||!this.data.account||!this.data.identify||!this.data.src) {
      wx.showToast({
        title: '请完整填写信息',
        icon: 'none'
      })
      return
    }
    wx.request({
      url: app.data.url,
      method: 'POST',
      data:{
        account:this.data.account,
        name:this.data.name,
        identify:this.data.identify,
        gender:this.data.gender,
        birthday:this.data.birthday
      },
      header: {
        'content-type': 'application/json',
        'action': 'cInfo'
      },
      success(res){ 
        console.log("服务器")
          console.log(res )
          const response=res.data
          if(response.status == 'successful'){
		  app.data.global_name=that.data.name
		  app.data.global_birthday=that.data.birthday
		  app.data.global_gender=that.data.gender
            wx.showToast({
              title: '修改成功',
              icon:'success',
              duration: 2000
            })
            that.setData({
              tag:false
            })
          }else{
            wx.showToast({
              title: '修改失败',
              icon:'false',
              duration: 2000
            })
          }
      }
    })
  },
});