// pages/add/add.js
//修改密码，通过学号姓名找到原密码，对比原密码，相同则修改原密码为新密码返回修改成功，不相同返回修改失败
var app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        reshoot: false, //是否重拍标志
        src: '', //图片地址
        name: '',
        account: '',
        oldpassword: '',
        newpassword: '',
    },
    // 用户名输入
    Inputname(e) {
        this.setData({
            name: e.detail.value //获取输入框的值
        })
    },
    Inputaccount(e) {
        this.setData({
            account: e.detail.value //获取输入框的值
        })
    },
    // 密码输入
    Input_oldpassword(e) {
        this.setData({
            oldpassword: e.detail.value
        })
    },
    Input_newpassword(e) {
        this.setData({
            newpassword: e.detail.value
        })
    },
    submit(e) {
        var that = this;
        if (that.data.account == '') {
            wx.showToast({
                title: '请输入账号',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        wx.showModal({
            title: '确认更改密码？',
            success: function (res) {
                if (res.cancel) {
                    return
                } else if (res.confirm) {

                    wx.request({
                        url: app.data.url,
                        method: 'POST',
                        data: {
                            account: that.data.account,
                            oldpassword: that.data.oldpassword,
                            newpassword: that.data.newpassword
                        },
                        header: {
                            'content-type': 'application/json',
                            'action': 'cpwd' //修改密码
                        },
                        success: function (res) {
                            console.log(res)
                            let response = res.data
                            const result = response.status
                            console.log(result)
                            if (result == 'successful') {
                                wx.showToast({
                                    title: '修改成功',
                                    icon: 'success',
                                    duration: 2000
                                })
                            } else {
                                wx.showToast({
                                    title: '修改失败,请检查账号或密码!',
                                    icon: 'none',
                                    duration: 2000
                                })
                            }
                        }
                    })
                }
            }
        })
    }
})