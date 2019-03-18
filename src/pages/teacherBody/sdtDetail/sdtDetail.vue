<template>
<div class="body">
    <div style="height:30rpx"></div>
    <view class="flex-x-m" slot="content">
        <li  class="flex-y stuImage" >
            <img class="images" mode="aspectFill" src="/static/images/headimg.png" >
            <span>张申然</span>
            <img @click="del" class="del" src="/static/images/image_del.png">
        </li>
    </view>
</div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
<style lang="stylus" scoped>
@import '../../../../static/css/app.css'
.body
    position absolute
    top 0rpx
    left 0rpx
    right 0rpx
    bottom 0rpx
    padding 20rpx 20rpx 200rpx 20rpx
    background #fff
    .stuImage
        position relative
        padding 20rpx 0rpx
        width 200rpx
        margin-left 27.5rpx
        margin-bottom 27.5rpx
        box-shadow #efefef 0rpx 0rpx 10rpx 
        font-size 24rpx
        background #f1f1f1
        span
            width 190rpx
            margin-top 5rpx
            text-align center
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
        .images
            width 80rpx
            height 80rpx
            border-radius 50%
        .del
            width 32rpx
            height 32rpx
            position absolute
            top 0rpx
            right 0rpx
</style>
