var app = getApp()
Page({
  data: {
    lat: '', //打卡范围中心点,打卡范围默认为1000
    lon: '',
    now_time:'232',
    time1: '',
    time2: '',
    reshoot: false,
    src: '', //图片地址
    mode: 1, //照片选择模式
    latitude: '',
    longitude: '',
    address: '',
    account: '',//学号
    map: '', //地图地址
    tag: false, //是否在打卡范围内标志,
    mark: true, //是否已经打卡标志
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
  onLoad() { //加载时执行，从服务器获取数据查看是否已经打卡(未打卡时才能收到服务器的数据)
    var that = this
    var now = new Date();
    console.log(now)
    var hour = now.getHours(); //时间
    var minutes = now.getMinutes();
    var now_time=hour * 60 + minutes
    that.setData({
	    now_time:now_time,
	    account:app.data.global_account
    })
    console.log("打卡服务器")
    wx.request({
      url: app.data.url+'/getCard',
      method: 'GET',
      data:{
	account:app.data.global_account
      },
      success(res) {
	console.log("打卡服务器")
        console.log(res)
        let response = res.data
        const result = response.status
        const identify = response.idenify
        if (result == 'successful') {
          that.setData({
            mark:false,
            time1: response.start_time,
            time2: response.end_time,
            lat: response.latitude,
            lon: response.longitude
          })
          console.log(that.data.mark)
          // app.data.global_src=response.src
        } else {}
      }
    })
  },
  handleInput1(e) {
    this.setData({
      account: e.detail.value
    })
  },
  handlemode(e) {

    this.setData({
      mode: e.detail.item.value
    })
  },
  //计算两点距离函数
  distance: function (la1, lo1, la2, lo2) {//单位为千米
	console.log(la1)
	console.log(lo1)
	console.log(la2)
	console.log(lo2)
    var La1 = la1 * Math.PI / 180.0
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    console.log(s)
    s = s * 6378.137; //地球半径
    s = Math.round(s * 10000) / 10000;
    console.log("距离")
    console.log(s)
    return s;
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
    var that = this
    wx.chooseMedia({
      success(res) {
        console.log(res)
        that.setData({
          src: res.tempFiles[0].tempFilePath,
        })
      }
    })
  },
  //按钮绑定函数，获取经纬度以及地址
  getLocation() {
    //打卡时间判断
    //if (now_time>=this.data.time1&&now_time<=this.data.time2)
    if (this.data.now_time<=this.data.time1||this.data.now_time>=this.data.time2) {
      wx.showToast({
        title: '不在打卡时间内',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    var that = this
    wx.getLocation({
      type: 'wgs84',
      isHighAccuracy: true,
      success(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude: latitude,
          longitude: longitude,
        })
        if (that.distance(that.data.lat, that.data.lon, that.data.latitude, that.data.longitude) < 1) {
          that.data.tag = true;
        }
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/',
          data: {
            location: res.latitude + ',' + res.longitude,
            key: 'AN4BZ-GXEYX-36U46-Z2N2U-XFYRO-T7BTQ'
          },
          success(res) {
              console.log(res)
            var address = res.data.result.address
            that.setData({
              address: address
            })
          }
        })
      }
    })
  },
  submit() {
	if (this.data.now_time<=this.data.time1||this.data.now_time>=this.data.time2) {
		wx.showToast({
		  title: '不在打卡时间内',
		  icon: 'none',
		  duration: 2000
		})
		return;
	      }
    console.log(this.data.address)
    if (!this.data.address) {
      wx.showToast({
        title: '请先获取位置',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (this.data.tag == false) {
      wx.showToast({
        title: '不在打卡范围内',
        icon: 'none',
        duration: 2000
      });
      return
    }
    var that = this;
    if (that.data.username == '') {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    wx.uploadFile({
      url: app.data.url, //向该链接上传图片
      filePath: that.data.src,
      name: 'file',
      header: {
        'action': 'face'
      },
      formData: {
        'username': that.data.username,
        'account': that.data.account
      },
      success: function (res) { //服务器返回的数据
        console.log(res);
        var data = JSON.parse(res.data); //对象转换
        // if(res.statusCode == 200){//服务器响应
        if (data.status == 'successful') {
          wx.showToast({
            title: '打卡成功',
            icon: 'success',
            duration: 2000
          });
          that.setData({
            mark: true
          })
          // wx.navigateTo({
          //   url: 'url',
          // })
        } else {
          wx.showToast({
            title: '人脸不匹配',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }
})