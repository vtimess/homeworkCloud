<template>
    <div class="body">
        <div class="flex-xf-yc header">
            <img src="/static/images/headimg.png">
            <div class="flex-yf">
                <span class="name">不屑灯笼酷爱洗澡</span>
                <span class="time">56分钟前</span>
            </div>
        </div>
        <div class="title">
            <span >对象类型直接复制,只是将引用指向同一个地址</span>
        </div>
        <div class="flex-xc images">
            <img src="/static/images/headimg.png">
            <img src="/static/images/headimg.png">
            <img src="/static/images/headimg.png">
        </div>
        <div class="footer">
            <ul class="flex-x">
                <li class="flex-xc">
                    <img src="/static/images/share.png" >
                    <span>分享</span>
                </li>
                <li>
                    <img src="/static/images/message.png">
                    <span>回复</span>
                </li>
                <li>
                    <img src="/static/images/zan.png" >
                    <span>1</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        listData:Object
    },
    data(){
        return{

        }
    },
    methods:{
        callchild(status,val){
            this.$emit("click", val);
            console.log(val)
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '../../static/css/app.css'
.body
    width 100%
    height auto
    max-height 600rpx
    background #fff
    .header
        width 100%
        height 100rpx
        padding 20rpx
        color #2c2c2c
        border-bottom 1rpx solid #e6e6e6
        img 
            width 100rpx
            height 100rpx
            border-radius 50%
            margin-right 20rpx
    .images
        height auto
        img
            float left
            width 200rpx
            height 200rpx
            padding 5rpx
    .title
        width 600rpx
        font-size 32rpx
        color #707070
        overflow hidden
        padding 20rpx
        text-overflow ellipsis
        display -webkit-box
        -webkit-line-clamp 2
        -webkit-box-orient vertical
    .footer
        font-size 24rpx
        img
            width 64rpx
            height 64rpx
 


</style>
