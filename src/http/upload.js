import store from '../store/'
import {SET_TOKEN,REMOVE_ALL_FORM_ID} from '../store/mutation-types'
import  host from './config'

const upload = (type) => {

     /** 把token设置到请求头中 */
     let header = {
        'Authorization':store.state.token
    }
    /** 收集formid */
    let data = {
        type:type
    }
    let formId = store.state.formId;
    if(formId){
        data.formId = formId;
    }
  
    return new Promise((resolve,reject) =>{
        wx.chooseImage({
            count:1,
            success(res) {
                const filePath = res.tempFilePaths[0]
                wx.showLoading({
                    title:'正在上传图片'
                })
                wx.uploadFile({
                    url:host+"/upload/image",
                    filePath:filePath,
                    header:{
                        'Authorization':store.state.token,
                        'content-type':'application/json'
                    },
                    name:'file',
                    formData:data,
                    success(res){
                        wx.hideLoading()
                        const result = JSON.parse(res.data)
                        /** 如果code为-4，等于token无效 */
                        if(result.code === -4 || result.code === -3){
                            /** 清空token */
                            store.commit(SET_TOKEN,"")
                            /** 跳转登录页面 */
                            wx.reLaunch({
                                url:'/pages/login/main'
                            })
                            return
                        }
                        if(result.code === 0 ){
                            console.log(result.data,"666")
                            resolve(result.data)
                        }else{
                            reject(result.code)
                        }
                    },
                    fail: function (error) {
                        wx.hideLoading()
                        wx.showToast({
                            title: "网络出错，稍后再试",
                            icon: "none"
                        });
                    },
                    complete: function () {
                    }
                })
            }
        })
    })
}

export default upload