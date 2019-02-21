import config from '@/config/index'
import store from '../store/'
import { mapState, mapMutations } from 'vuex'
import  SET_TOKEN  from '../store/mutation-types'
const http = {
    request(url, method, data, status){
        if(status === 'yes'){
            wx.showLoading({
                title:"玩命加载中..."
            })
        }
        if(store.state.id){
            data.id = store.state.id
        }
        console.log(store.state.formId,22)
        if(store.state.formId&&store.state.formId.length > 0){
            data.formId = store.state.formId
        }

        return new Promise((resolve, reject) => {
            wx.request({
                url:config.host + url,
                data:data,
                method:method,
                header: {'content-type': 'application/x-www-form-urlencoded',
                // 'Authorization':,
                // 'Content-Type': 'application/json'
            },
                success:function(res){
                    wx.hideLoading();
                    if(res.statusCode!=200){
                        wx.showToast({
                            title: "网络出错，稍后再试",
                            icon: "none"
                        });
                        return false;
                    }
                    store.commit("REMOVE_ALL_FORM_ID")
                    let result = res.data
                    if(result.code == -4){
                        store.commit("REMOVE_TOKEN")
                        wx.showToast({
                            title:result.msg,
                            icon:"none"
                        })
                        wx.reLaunch({
                            url:'/pages/welcome/main'
                        })
                        return false;
                    }
                    if(result.code !== 0){
                        wx.showToast({
                            title:result.msg,
                            icon:"none"
                        })
                        resolve(null)
                        return false
                    }
                    resolve(result.data)
                },
                fail: function (error) {
                    // wx.hideLoading();
                    console.error(error)
                    reject(error);//请求失败
                },
                complete: function () {
                    // wx.hideLoading();
                }
            })

        })
    },
    get:function(url,data,status){
        return this.request(url,'GET',data,status)
    },
    post:function(url,data){
        return this.request(url,'POST',data)
    },
    delete:function(url,data){
        return this.request(url,'DELETE',data)
    },
    put:function(url,data){
        return this.request(url,'PUT',data)
    }
}

export default http