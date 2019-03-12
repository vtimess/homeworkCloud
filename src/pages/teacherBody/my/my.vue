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
                <li class="flex-yc nav-1">
                    <img src="/static/images/teacher_edit.png"> 
                    <span>意见反馈</span>
                    </li>
                <li class="flex-xc-yc nav-2">退出登录</li>
            </ul>
            <div class="flex-xc footer">-HEO技术支持-</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            releaseUrl:'/pages/teacherBody/releaseworks/main',
            worksUrl:'',
            classUrl:'',
            learnUrl:'',
            createUrl:'/pages/teacherBody/createClass/main',

        }
    },
    methods:{
        navigateTo(val){
            wx.navigateTo({
                url: val
            })
        }
    }
    
    
}
</script>
<style lang="stylus" scoped>
@import '../../../../static/css/app.css'
.self
    width 100%
    height 100%
    position absolute
    top 0px
    left 0px
    background-color #fff
    .user
        position absolute
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
        margin-top 340rpx
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
