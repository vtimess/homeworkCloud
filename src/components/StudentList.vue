<template>
    <div class="list">
        <nav>1</nav>
        <div class="image" @click="look">
            <img src="/static/images/header.png" >
        </div>
        <li><p>张申然</p><span>从本群删除</span></li>
    </div>
</template>
<script>
export default {
    data(){
        return{
        }
    },
    methods:{
        look(){
            wx.navigateTo({
                url: '/pages/profile/main'
            })
        }
    },
    props:{
        finishList:Object
    },
}
</script>
<style lang="stylus" scoped>
.list
    height 100rpx
    nav 
        float left
        line-height 100rpx
        margin-left 30rpx
        margin-right 30rpx
    .image
        width 90rpx
        height 90rpx
        overflow hidden
        margin-top 5rpx
        border-radius 50%
        float left
        img
            width 90rpx
            height 90rpx
    li
        line-height 100rpx
        margin-left 200rpx
        padding-right 10rpx
        border-bottom 1rpx solid #8a8a8a
        p
            display inline
            font-size 32rpx
            color #2c2c2c
            width 130rpx
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
        span
            line-height 100rpx 
            font-size 28rpx
            color #707070
            float right
</style>
