function getCtx(t,e=null){var n=getCurrentPages();const o=e||n[n.length-1];e=o.selectComponent(t);return e||null}function Toast(t){var{id:e="#meetToast",context:n=null}=t;const o=getCtx(e,n);o?.show(t)}Toast.hide=function(t={}){var{id:t="#meetToast",context:e=null}=t="string"==typeof t?{id:t}:t;const n=getCtx(t,e);n?.hide()},wx.meetToast=Toast,wx.meetLoading=function(t={}){Toast(Object.assign({type:"loading",mask:!0,message:"加载中..."},t))},wx.meetLoading.hide=Toast.hide;export{Toast as meetToast};