<template>
    <div class="auth" >
        <open-data type="userAvatarUrl" class="useravatar"></open-data>
        <open-data type="userNickName" class="username"></open-data>
        <!-- 需要使用 button 来授权登录 -->
        <button class="loginbutton" v-if="canIUse" open-type="getUserInfo" @getuserinfo="onGetUserInfo">授权登录</button>
        <view style="text-align:center" wx:else>请升级微信版本</view>
    </div>
</template>

<script>
import config from '@/config/index'
import { mapState, mapMutations } from 'vuex'
import { SET_USER_INFO,SET_TOKEN} from '@/store/mutation-types'

export default {
    data(){
        return {
            canIUse: wx.canIUse('button.open-type.getUserInfo'),//判断小程序的API，回调，参数，组件等是否在当前版本可用。
            auth:true
        }
    },
    created() {
        if(this.token){
            if(this.userInfo){
               this.gotoIndex();
            }else{
                this.getUserInfo();
            }
        }else{
            //this.login()
        }
    },
    computed: {
        ...mapState([
            // 'id',
            'userInfo',
            'token'
        ])
    },
    methods: {
        ...mapMutations({
            //  setId : SET_ID,
             setUserInfo : SET_USER_INFO,
             setToken : SET_TOKEN,
        }),
        login:function(){
            let that = this
             wx.login({
                success: function(res) {
                    if (res.code) {
                    console.log(res.code);
                    // 发起网络请求
                    wx.request({
                        url: config.host+'/student/login',
                        method:'get',
                        data: {
                            code: res.code,
                        },
                        success:function(res){
                            let result = res.data;
                            if(result.code === 0){
                                let token = result.data
                                console.log(token,64)
                                that.setToken(token)
                                // that.setId(id)
                                that.getUserInfo(token)
                            }else{
                                wx.showToast({
                                    title:result.errMsg
                                })
                              
                            }
                        },
                        fail:function(err){
                            console.log("连接服务失败")
                        }
                    })
                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
             })
        },
        getUserInfo:function(token){
            let that = this
             //从服务器中拿userInfo
            wx.request({
                url: config.host +'/student/info',
                data: {
                    token: that.token
                },
                success: function(res) {
                    console.log(res)
                    let result = res.data
                    if(result.code === 0){
                        let userInfo = result.data
                        if(userInfo){
                            that.setUserInfo(userInfo)                            
                            that.gotoIndex()
                        }
                    }else{
                       console.log(res)
                    }
                }
            })
        },
        gotoIndex:function(){
             setTimeout(()=>{
                    console.log('跳转')
                    wx.reLaunch({url: '../homework/main'})
            },1000)
        },
        //授权
        onGetUserInfo:function(e){
            let wxUserInfo = e.mp.detail.userInfo;
            let userInfo = {}
            userInfo.nid = ""
            userInfo.sex = ""
            userInfo.name = wxUserInfo.nickName
            userInfo.avatarUrl = wxUserInfo.avatarUrl
            userInfo.phone = ""
            
            this.setUserInfo(userInfo);
            if(this.token){
                wx.reLaunch({
                    url: '../homework/main'
                })
            }
            
        }
    }
}
</script>
<style lang="stylus" scoped>
.auth
    
    width 100%
    height 100%
    position absolute
    top 0px
    left 0px
    .useravatar 
        display block
        width 200rpx
        height 200rpx
        border-radius 50%
        overflow hidden
        margin 200rpx auto 0
    .username
        display block
        margin-top 50rpx
        color #707070
        text-align center
    .loginbutton
        background-color #64dcdb
        color #fff
        margin 200rpx 20rpx 0 

</style>


