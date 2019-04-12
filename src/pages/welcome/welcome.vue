<template>
    <div class="auth" >
        <i-tabs v-show="show" :current="current" color="#64dcdb" @change="handleChange">
            <i-tab key="1" title="学生登录"></i-tab>
            <i-tab key="2" title="教师登录"></i-tab>
        </i-tabs>
        <open-data type="userAvatarUrl" class="useravatar"></open-data>
        <open-data type="userNickName" class="username"></open-data>
        <!-- 需要使用 button 来授权登录 -->
        <MyButton  openType="getUserInfo" @getuserinfo="getUserInfo">授权登录</MyButton>
    </div>
</template>

<script>
import MyButton  from '@/components/MyButton.vue'
import config from '@/config/index'
import { mapState, mapMutations } from 'vuex'
import { SET_STATUS,SET_USER_INFO,SET_TOKEN} from '@/store/mutation-types'

export default {
    components:{
      MyButton,
    },
    data(){
        return {
            canIUse: wx.canIUse('button.open-type.getUserInfo'),//判断小程序的API，回调，参数，组件等是否在当前版本可用。
            auth:true,
            show:true,
            register:"",
            nickName:"",
            gender:"",
            avatarUrl:"",
            current: '1',
            current_scroll: '1',
            key:'',
        }
    },
    onLoad(options){
        if(options.status){
            this.key = options.status
            this.current = options.status
        }
    },
    created() {
        if(this.status){
            console.log(this.status)
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
            this.show = val;
        },
        handleChange ({ mp }) {
            this.key = mp.detail.key
            this.current = mp.detail.key
        },
        handleChangeScroll ({ mp }) {
            this.current_scroll = mp.detail.key
        },
        
        login(wxCode){
            this.$api.login(
                this.key==2?'/t/login':'/s/login',
                {
                code: wxCode,
                type:this.status||1,
                nickName: this.nickName,
                avatarUrl: this.avatarUrl,
                gender: this.gender,
            }).then(token => {
                this.setToken(token);
                console.log("登录成功")
                var mainUrl = "/pages/teacher/main"
                if(this.key == 2){
                    this.setStatus("2")
                }else{
                    this.setStatus("1")
                    mainUrl = "/pages/student/main"
                }
                wx.reLaunch({
                    url:mainUrl
                })
            })
            
        },
        getUserInfo(e){
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
        // gotoIndex(){
        //      setTimeout(()=>{
        //             console.log('跳转')
        //             wx.reLaunch({url: '../homework/main'})
        //     },1000)
        // },
 
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


