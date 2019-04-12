<template>
    <div class="self">
        <div class="head">
            <div class="flex-y user">
                <open-data type="userAvatarUrl" class="useravatar"></open-data>
                <open-data type="userNickName" class="username"></open-data>
                <span class="motto">-愿望是半个生命,淡漠是半个死亡</span>
            </div>
            <view class="fake-searchbar" @click="navigateTo(releaseUrl)">
                <icon type="search" size="14" color="#1D1D1D" />
                <text class="fake-placeholder" >搜索你想知道的知识和技术</text>
            </view>
        </div>
        <div class="navList">
            <ul class="flex-x-m">
                <li class="flex-xc-yc nav-2" @click="navigateTo(learnUrl)">学习Echart</li>
                <li class="flex-xc-yc nav-1" @click="navigateTo(createUrl)">创建班群</li>
                <li class="flex-yc nav-1 " @click="navigateTo(feedbackUrl)">
                    <img src="/static/images/teacher_edit.png"> 
                    <span>意见反馈</span>
                </li>
                <li class="flex-xc-yc nav-2" @click="logout">退出登录</li>
            </ul>
            <div class="flex-xc footer">-HEO技术支持-</div>
        </div>
    </div>
</template>
<script>
import store from '../store/'
import {CLEAR_ALL} from '../store/mutation-types'

export default {
    data(){
        return{
            releaseUrl:'/pages/teacherBody/releaseworks/main',
            learnUrl:'/pages/teacherBody/learnChart/main',
            createUrl:'/pages/teacherBody/createClass/main',
            feedbackUrl:'/pages/teacherBody/feedback/main',

        }
    },
    methods:{
        navigateTo(val){
            wx.navigateTo({
                url: val
            })
        },
        logout(){
            wx.showModal({
                title: '提示',
                content: '是否确定退出登录?',
                success(res) {
                    if (res.confirm) {
                        store.commit(CLEAR_ALL);
                        let status = '2'
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
<style lang="stylus" scoped>
.self
    width 100%
    height 100%
    position absolute
    top 0px
    left 0px
    padding-bottom 40rpx
    background-color #fff
    .head
        width 100%
        padding-top 100rpx
        padding-bottom 80rpx
        position relative
        background -webkit-linear-gradient(bottom,#383945,#32333F) no-repeat
        .user
            justify-content center
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
                font-size 34rpx
            .motto
                width 360rpx
                margin-top 10rpx
                color rgba(255, 255, 255, 0.48)
                font-size 24rpx
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
        .fake-searchbar
            position absolute
            bottom 0
            left 50%
            transform translate(-50%, 50%)
            height 92rpx
            width 91.4%
            display flex
            justify-content center
            align-items center
            background-color #fff
            border-radius 4rpx
            box-shadow rgba(153, 153, 153, 0.24) 0 2px 7px
            .fake-placeholder 
                margin-left 12rpx
                color rgba(153, 153, 153, 0.89)
                font-size 28rpx
    .navList
        margin-top 100rpx
        font-size 28rpx
        color #2c2c2c
        padding 5rpx
        img
            width 64rpx
            height 64rpx
        .nav-1
            width 220rpx
            height 160rpx
            background #f1f1f1
            border-radius 10rpx
            margin-left 20rpx
            margin-bottom 20rpx
        .nav-2
            width 460rpx
            height 160rpx
            background #f1f1f1
            border-radius 10rpx
            margin-left 20rpx
            margin-bottom 20rpx
        .footer
            margin-top 30rpx
            font-size 24rpx
            color #e6e6e6
        
</style>
