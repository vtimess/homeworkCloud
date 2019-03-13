<template>
    <div class="body">
        <div style="margin-top:20rpx"></div>
        <div class="card" @click="toClassDetail">
            <div class="flex-x-sb card-title">
                <div class="flex-xc-yc">
                    <img class="image" src="/static/images/headimg.png">
                    <div class="flex-yf className">
                        <span>刘康康的日常</span>
                        <span style="color:#707070;font-size:26rpx;margin-top:10rpx">班群号:668565</span>
                    </div>
                </div>
                <span class="manage" @click="toClassDetail">管理</span>
            </div>
            <div class="card-footer">
                <span>创建时间：2019-03-18\t</span>
                <span>班群人数: 32 人</span>
            </div>
        </div>        
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    mounted() {
        this.$nextTick(() => {
            this.getData();
        });
    },
    methods:{
        //请求 获取班群列表
        getData(){

        },
        toClassDetail(){
            wx.navigateTo({
                url: '/pages/teacherBody/classDetail/main'
            })
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
    background #fff
    .card
        margin-left 30rpx
        margin-right 30rpx
        padding 20rpx
        border 1rpx solid #e6e6e6
        border-radius 5rpx
        box-shadow #efefef 0rpx 0rpx 10rpx 
        .card-title
            border-bottom 1rpx solid #f1f1f1
            padding-bottom 20rpx
            .image
                width 120rpx
                height 120rpx
                border-radius 50%
            .className
                width 200rpx
                margin-left 20rpx
                color #2c2c2c
                font-size 32rpx
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
            .manage
                margin-right 50rpx
                color #ed3f14
                font-weight 600rpx
                letter-spacing 5rpx
        .card-footer
            padding-top 20rpx
            color #8a8a8a
            font-size 24rpx

</style>
