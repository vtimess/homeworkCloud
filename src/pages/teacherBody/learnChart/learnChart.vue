<template>
    <div class="body">
        <div class="flex-yc closed">
            <img src="/static/images/mark.png" >
            <span>暂未体验权限</span>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{

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
    background #fff
    .closed
        margin-top 100rpx
        img 
            width 160rpx
            height 160rpx
        span 
            margin-top 20rpx
            font-size 34rpx
</style>
