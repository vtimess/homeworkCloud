<template>
    <div class="self">
        <div class="main">
            <img class="header" :src="avatarUrl" mode="scaleToFill">
        </div>
        <div class="flex-y user">
            <open-data type="userAvatarUrl" class="useravatar"></open-data>
            <open-data type="userNickName" class="username"></open-data>
            <span class="motto">-愿望是半个生命,淡漠是半个死亡</span>
        </div>
        <div class="flex-xc-yc praise">
            <img :src="praiseUrl" @click="praise">
            <span>{{number}}</span>
        </div>
        <div class="flex-xc-yc praiseOver">
            <img :src="praiseOverUrl">
            <span>+1</span>
        </div>
        <div class="container">
            <span></span>
        </div>
        
        <div class="flex-xc heo">
            <span>— HEO技术支持 —</span>
        </div>
        
    </div>
</template>

<script>
import Mylist from '@/components/Mylist.vue'
    export default {
        components:{
            Mylist
        },
        data() {
            return {
                times:0,
                number:666,
                avatarUrl:"",
                praiseUrl:"/static/images/praise_no.png",
                praiseOverUrl:"/static/images/praise_ok.png",
            }
        },
        onLoad() {
            var that = this
            wx.getUserInfo({
                success:function(res){
                    that.avatarUrl = res.userInfo.avatarUrl
                    console.log(that.avatarUrl)
                }
            })
        },
        methods:{
            praise(){
                if(++this.times <= 10){
                    this.number++;
                    this.praiseUrl="/static/images/praise_ok.png";
                }else{
                    console.log("今日已经赞完了！")
                }
            }
        }
    }
</script>
<style lang="stylus"  scoped>
@import '../../../static/css/app.css'
.self
    width 100%
    height 100%
    position absolute
    top 0px
    left 0px
    background-color #f6f6f6
    .main
        height 460rpx
        margin-bottom 50rpx
        overflow hidden
        // border-radius 100% 100% 100% 100% / 0% 0% 30% 30%
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
            width 38rpx
            height 38rpx
        span 
            padding-left 5rpx
            font-size 26rpx
            color #ffffff
    .praiseOver
        position absolute
        right 40rpx
        top 130px
        color #E9503C
        animation praiseOver 1.3s ease-in-out 2.7s infinite alternate
        img
            width 38rpx
            height 38rpx
        span 
            padding-left 5rpx
            font-size 30rpx
    .container
        background-color #fff
        border-radius 5rpx
        margin -20rpx 10%
        margin-bottom 50rpx

    .heo
        span 
            font-size 24rpx
            color #e4e4e4

@keyframes praiseOver {
    from transform translate(0,0)
    to transform translate(0,20rpx)
}
</style>
