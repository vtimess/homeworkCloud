<template>
    <div class="self">
        <div class="flex-y user">
            <open-data type="userAvatarUrl" class="useravatar"></open-data>
            <open-data type="userNickName" class="username"></open-data>
            <span class="motto">-愿望是半个生命,淡漠是半个死亡</span>
        </div>
        <div class="navList">
            <ul class="flex-x-m">
                <li class="flex-xc-yc nav-1" @click="navigateTo(classUrl)">班群管理</li>
                <li class="flex-xc-yc nav-1" @click="navigateTo(worksUrl)">作业管理</li>
                <li class="flex-xc-yc nav-1" @click="navigateTo(releaseUrl)">布置作业</li>
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
export default {
    data(){
        return{
            releaseUrl:'/pages/teacherBody/releaseworks/main',
            worksUrl:'/pages/teacherBody/worksManage/main',
            classUrl:'/pages/teacherBody/classGroup/main',
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
                        console.log('用户点击确定')
                        store.commit(REMOVE_STATUS);
                        store.commit(REMOVE_TOKEN);
                        // wx.getStorageInfo({
                        //     success(res) {
                        //         console.log(res.keys)//当前 storage 中所有的 key
                        //         console.log(res.currentSize)//当前占用的空间大小, 单位 KB
                        //         console.log(res.limitSize)//限制的空间大小，单位 KB
                        //     }
                        // })
                        wx.clearStorageSync();
                        wx.reLaunch({
                            url:'/pages/welcome/main'
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
@import '../../static/css/app.css'
.self
    width 100%
    height 100%
    position absolute
    top 0px
    left 0px
    background-color #fff
    .user
        justify-content center
        margin-top 100rpx
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
            color #2c2c2c
            font-size 34rpx
        .motto
            width 360rpx
            margin-top 10rpx
            color rgba(0, 0, 0, 0.7)
            font-size 24rpx
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
    .navList
        margin-top 60rpx
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
