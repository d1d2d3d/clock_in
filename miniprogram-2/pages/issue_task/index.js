/**
 * Meet UI, Meet You!
 * @author jayen
 * @version v1.0.1
 */
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        latitude: '',
        longitude: '',
        date1:'',
        date2:'',
        address: ''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (opts) {
        this.setData({
          
        });
    },
    onShareAppMessage() {
        return app.shareMessage();
    },
    /**
     * 确定操作
     * @param {object} e
     */
    handledate1(e) {
        console.log(e);
this.setData({
  date1:e.detail.formatValue
})
    },
    handledate2(e) {
      console.log(e);
      this.setData({
        date2:e.detail.formatValue
      })
  },
    onMarkerTap(e) {
        var that = this
        wx.getLocation({
            type: 'wgs84',
            isHighAccuracy: true,
            success(res) {
              console.log(e)
              var latitude = e.detail.latitude
              var longitude = e.detail.longitude
              console.log('所选地点经纬度:', e.detail.longitude, e.detail.latitude)
              that.setData({
                  latitude: latitude,
                  longitude: longitude,
                })
                wx.request({
                  url: 'https://apis.map.qq.com/ws/geocoder/v1/',
                  data: {
                    location: e.detail.latitude + ',' + e.detail.longitude,
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
      var that = this;
      if (that.data.date1== ''||that.data.date2==''||that.data.address=='') {
        wx.showToast({
          title: '请完整输入信息',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      var date1_array = that.data.date1.split(':')
      var date2_array =  that.data.date2.split(':')
      var time1=parseInt(date1_array[0]) * 60 + parseInt(date1_array[1])
      var time2=parseInt(date2_array[0]) * 60 + parseInt(date2_array[1])
      if(time1>=time2)
      {
        wx.showToast({
            title: '打卡时间错误',
            icon: 'none',
            duration: 2000
        })
        return
      }
      console.log(time2)
      wx.showLoading({
        title: 'Loading...',
      })
      setTimeout
    
      wx.request({
        url: app.data.url,
        method: 'POST',
        data: {
          start_time: time1,
          end_time:time2,
          latitude:that.data.latitude,
          longitude:that.data.longitude
        },
        header: {
          'content-type': 'application/json',
          'action': 'playCard'
        },
        success: function (res) {
          console.log('打卡服务器')
          console.log(res)
          let response = res.data
          const result = response.status
          const identify = response.idenify
          if (result == 'successful') {
                    wx.hideLoading()
                    wx.showToast({
                    title: '发布成功',
                    icon: 'none',
                    duration: 2000
                })
  // app.data.global_src=response.src
          } else {
            wx.hideLoading()
            wx.showToast({
              title: '发布失败，请稍后重试',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
})