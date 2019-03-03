<template>
    <div class="auth" >
        
        <open-data type="userAvatarUrl" class="useravatar"></open-data>
        <open-data type="userNickName" class="username"></open-data>
        <!-- 需要使用 button 来授权登录 -->
        <form @submit='getFormId' report-submit='true'>
            <button formType="submit" class="loginbutton" v-if="canIUse" open-type="getUserInfo" @getuserinfo="getUserInfo" >点击进入</button>
            <view style="text-align:center" wx:else>请升级微信版本</view>
        </form>
        <div v-show="show" class="flex-xc form">
            <div class="flex-yc all">
                <view  class="flex-xc-yc teacher" @click="occupation(1)" >
                    <span>教师</span>
                </view>
                <view  class="flex-xc-yc teacher" @click="occupation(2)" >
                    <span>学生</span>
                </view>
            </div>
        </div>
        
    </div>
</template>

<script>
import config from '@/config/index'
import { mapState, mapMutations } from 'vuex'
import { SET_STATUS,SET_USER_INFO,SET_TOKEN} from '@/store/mutation-types'

export default {
    data(){
        return {
            canIUse: wx.canIUse('button.open-type.getUserInfo'),//判断小程序的API，回调，参数，组件等是否在当前版本可用。
            auth:true,
            show:true,
            register:"",
            formId:"",
            nickName:"",
            gender:"",
            avatarUrl:"",
        }
    },
    onLoad(){

    },
    created() {
        
        if(this.status){
            this.next(false)
        }else{
            this.next(true)
        }
    },
    computed: {
        ...mapState([   //分发store中的数据到当前组件
            // 'id',
            'userInfo',
            'token',
            'status',
        ])
    },
    methods: {
        ...mapMutations({
            //  setId : SET_ID,
             setUserInfo : SET_USER_INFO,
             setToken : SET_TOKEN,
             setStatus : SET_STATUS,
        }),
        next(val){
            this.show = val
        },
        
        login:async function(wxCode){
            let result = await this.$http.post('/s/login',
                {
                    code: wxCode,
                    formId:this.formId,
                    nickName: this.nickName,
                    avatarUrl: this.avatarUrl,
                    gender: this.gender,
                });
            if(result){
                console.log(result,"token")
                this.setToken(result);
                this.gotoIndex();
                console.log(this.token,"token")
                // this.getUserInfo(this.token);
            }
        },
        getFormId(e){
            this.formId = e.mp.detail.formId;
            console.log(e,"formId")
        },
        getUserInfo(e){
            console.log(e,'getUserInfo')
            if (e.mp.detail.rawData){
                this.nickName = e.mp.detail.userInfo.nickName;
                this.avatarUrl = e.mp.detail.userInfo.avatarUrl;
                this.gender = e.mp.detail.userInfo.gender;
                this.wxLogin()
            } else {
                wx.showToast({
                    icon:'none',
                    title:'请授权登录小程序'
                })
            }
        },
        wxLogin(){
            let that = this;
            wx.login({
                success: function(res) {
                    if (res.code) {
                        console.log(res.code);
                        that.login(res.code);
                    }else{
                        wx.showToast({
                            icon:'none',
                            title:'登录失败'+res.msg
                        })
                    }
                }
            })
        },
        syncUserInfo(){
        },
        // syncUserInfo(token){
        //     let that = this
        //      //从服务器中拿userInfo
        //     wx.request({
        //         url: config.host +'/s/info',
        //         data: {
        //             token: token
        //         },
        //         success: function(res) {
        //             console.log(res)
        //             let result = res.data
        //             if(result.code === 0){
        //                 let userInfo = result.data
        //                 if(userInfo){
        //                     that.setUserInfo(userInfo)                            
        //                     that.gotoIndex()
        //                 }
        //             }else{
        //                console.log(res)
        //             }
        //         }
        //     })
        // },
        gotoIndex(){
             setTimeout(()=>{
                    console.log('跳转')
                    wx.reLaunch({url: '../homework/main'})
            },1000)
        },
        //授权
        // onGetUserInfo:function(e){
        //     console.log(e)
        //     let wxUserInfo = e.mp.detail.userInfo;
        //     let userInfo = {}
        //     userInfo.nid = ""
        //     userInfo.sex = ""
        //     userInfo.name = wxUserInfo.nickName
        //     userInfo.avatarUrl = wxUserInfo.avatarUrl
        //     userInfo.phone = ""
            
        //     this.setUserInfo(userInfo);
        //     if(this.token){
        //         wx.reLaunch({
        //             url: '../homework/main'
        //         })
        //     }
            
        // },
        occupation(val){
            this.setStatus(2);
            this.occupation = val;
            setTimeout(()=>{
                this.show = false
                wx.setNavigationBarTitle({
                    title:"Homework"
                })
            },500)
            console.log(val)
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '../../../static/css/app.css'
.auth
    width 100%
    height 100%
    position absolute
    top 0px
    left 0px
    .form
        width 100%
        height 100%
        background #fff
        position absolute
        top 0rpx
        left 0rpx
        .all
            height auto
            color #fff
            font-size 64rpx
            .teacher
                width 300rpx
                height 300rpx
                background #ffcccc
                border-radius 150rpx
                margin-bottom 100rpx
            
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


