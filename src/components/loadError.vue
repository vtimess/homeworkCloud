<template>
    <div class="flex-yc error" @click="click">
        <img src="/static/images/load-error.png" >
        <span>加载失败,点击重试</span>
    </div>
</template>

<script>

export default {
    data(){
        return{

        }
    },
    methods: {
        click(e){
            this.$emit("click",e)
        }
    },
    
}
</script>
<style lang="stylus" scoped>
.error
    position absolute
    top 0rpx
    left 0rpx
    right 0rpx
    height 100%
    background #fff
    img
        width 192rpx
        height 192rpx
    span
        font-size 32rpx
        color #707070
</style>
