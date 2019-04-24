<template>
    <div class="self">
        <div class="main">
            <img class="header" :src="userData.avatarUrl" mode="scaleToFill">
        </div>
        <div class="flex-y user">
            <img :src="userData.avatarUrl" class="useravatar">
            <span>{{userData.name}}</span>
            <span class="motto">{{userData.motto?'-'+userData.motto:''}}</span>
        </div>
        <!-- <div class="flex-y user">
            <open-data type="userAvatarUrl" class="useravatar"></open-data>
            <open-data type="userNickName" class="username"></open-data>
            <span class="motto">-愿望是半个生命,淡漠是半个死亡</span>
        </div> -->
        <div class=".flex-xc-yc praise">
            <img :src="praiseUrl">
            <span>{{userData.likedNum}}</span>
        </div>
        <div class="modifyInfo" @click="modify">
            <img src="/static/images/modifyInfo.png" >
        </div> 
        <div class="container big">
            <Mylist v-for="item in bigData" :key="item.name" :Item="item"></Mylist>
        </div>
        <div class="container small">
            <Mylist v-for="item in smallData" :key="item.name" :Item="item"></Mylist>
        </div>
        <div class="flex-y container logout" @click="logout">
            <span>退出登录</span>
        </div>
        <div class="flex-xc heo">
            <span>— HEO技术支持 —</span>
        </div>
        
        
    </div>
</template>

<script>
import Mylist from '@/components/Mylist.vue'
import store from '../store/'
import {CLEAR_ALL} from '../store/mutation-types'


export default {
    components:{
        Mylist
    },
    data() {
        return {
            avatarUrl:"",
            praiseUrl:"/static/images/praise_no.png",
            bigData:[
                {
                    name:'我的班群',
                    url:'../myclass/main'
                },
                {
                    name:'我的作业',
                    url:'../mywork/main'
                },
                {   
                    name:'学习状况',
                    url:'../studyCondition/main'
                }
            ],
            userData:{},
            smallData:[
                {
                    name:'帮助中心',
                    url:'../problem/main'
                }
            ]
        }
    },
    onPullDownRefresh(){
        if(store.state.tabIndex == '2'){
            wx.stopPullDownRefresh()
        }
    },
    onLoad() {
        this.getData()
        // var that = this
        // wx.getUserInfo({
        //     success:function(res){
        //         that.avatarUrl = res.userInfo.avatarUrl
        //         console.log(that.avatarUrl)
        //     }
        // })
    },
    methods:{
        getData(){
            var that = this
            this.$api.getProfile().then(data=>{
                that.userData = data
                console.log(data)
            }).catch(code=>{
                wx.getUserInfo({
                    success:function(res){
                        that.avatarUrl = res.userInfo.avatarUrl
                        console.log(that.avatarUrl)
                    }
                })
            })
        },
        modify:function(){
            wx.navigateTo({
                url: '../modifyinfo/main'
            })
        },
        logout(){
            wx.showModal({
                title: '提示',
                content: '是否确定退出登录?',
                success(res) {
                    if (res.confirm) {
                        store.commit(CLEAR_ALL);
                        let status = '1'
                        wx.reLaunch({
                            url:'/pages/welcome/main?status='+status
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }   
    }
}
</script>
<style lang="stylus"  scoped>
.self
    width 100%
    height 100%
    padding-bottom 300rpx
    background-color #f6f6f6
    .main
        height 480rpx
        margin-bottom 50rpx
        overflow hidden
        border-radius 100% 100% 100% 100% / 0% 0% 30% 30%
        .header
            width 100%
            height 750rpx
            filter blur(10rpx) 
            background no-repeat
            background-size 100% 100%
    .user
        position absolute
        top 140rpx
        left 50%
        transform translate(-50%,0)
        align-items center
        .useravatar 
            width 140rpx
            height 140rpx
            border-radius 50%
            overflow hidden
            border: 2px solid #fff
            box-shadow: 0rpx 6rpx 5rpx rgba(0, 0, 0, 0.2)
        .username
            margin-top 10rpx
            color #fff
            font-size 30rpx
        .motto
            text-align center
            width 360rpx
            margin-top 10rpx
            color rgba(255, 255, 255, 0.7)
            font-size 24rpx
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
    
    .praise
        position absolute
        right 20rpx
        top 160px
        width fit-content    
        padding 10rpx
        padding-left 16rpx
        padding-right 16rpx
        background rgba(0,0,0,0.1)
        border-radius 25rpx
        img
            width 34rpx
            height 34rpx
        span 
            padding-left 5rpx
            font-size 26rpx
            color #ffffff
    .modifyInfo
        position absolute
        top 130rpx
        right 50rpx
        img
            width 54rpx
            height 54rpx
    .container
        background-color #fff
        border-radius 5rpx
        margin -20rpx 10%
        margin-bottom 50rpx
    .big
        height 300rpx
    .small
        height 90rpx
    .logout
        text-align center
        padding-top 15rpx
        padding-bottom 15rpx
        color #ff0000
    .heo
        span 
            font-size 24rpx
            color #e4e4e4
</style>
