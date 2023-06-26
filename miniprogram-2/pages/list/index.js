/**

 */
const app = getApp();
Page({
      /**
       * 页面的初始数据
       */
      data: {
        item: [],
        picker:['全部', '已打卡', '未打卡'],
        selectedItem: '全部'
      },
      onLoad(opts) {
        var that = this
        wx.request({
              url: app.data.url + "/playCarded",
              method: 'GET',
              header: {
                'action': 'show'
              },
              success: function (res) {
                console.log(res)
                let response = res.data
                const result = response.status
                console.log(res.data)
                console.log(res.data.playCarded.length)
                const lenght = res.data.playCarded.length
                if (result == 'successful') {
                  var array=[]
                  for (let i = 0; i <  res.data.playCarded.length; i++) {
                  array.push({
                    name: response.playCarded[i][0],
                    account: response.playCarded[i][1],
                    status: response.playCarded[i][2],
                    identify:response.playCarded[i][3],
                  });
                  console.log(array)
                }
                
      that.setData({
        item:array
      })
                }
          },
        })
      },
      onPickerChange (e) {//下拉菜单
          console.log(e)
        this.setData({ selectedItem:this.data.picker[e.detail.value]});
      },
   change_clock_status(e){//修改打卡状态
    console.log(e)
    var that=this
wx.showModal({
    title: '更改打卡信息',
    content: '确定修改该学生本次打卡记录？',
    success (res) {
      if (res.confirm) {
        wx.showModal({
            title: '开发中',
            content: '该功能正在开发中...',
            confirmText: '确定',
            cancelText: '',
            input: true,
            success(res) {
              if (res.confirm) {
                console.log('User clicked OK');
              } else if (res.cancel) {
                console.log('User clicked Cancel');
              }
            }
          });
        that.setData({
            
        })
      } else if (res.cancel) {
        console.log('User cancelled');
      }
    }
  })
   },
      onShareAppMessage() {
            return app.shareMessage();
          },
          handleSwitch(e) {
            console.log(e);
          },
          // onShow() {
          //     wx.request({
          //         url: app.data.url,
          //         method:'POST',
          //         data:{
          //           account:this.data.account,
          //           password:this.data.password
          //         },
          //         header:{
          //           'content-type': 'application/json', 
          //           'action':'show'
          //         },
          //         success:function(res){
          //             console.log(res)
          //             let response = res.data
          //             const result = response.status
          //             console.log(res.data)
          //             if(result == 'successful'){
          //           this.setData({
          //               item:response.item
          //           })
          //             }
          //         }
          //       })
          //   },
      });