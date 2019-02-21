<template>
    <div class="body">
        <div class="info">
            <ul>
                <li class="befroe">
                    <p>班群老师</p>
                    <span>{{classBean.teacherName}}</span></li>
                <li class="befroe">
                    <p>班群名称</p>
                    <span>{{classBean.className}}</span></li>
                <li class="befroe">
                    <p>班群号</p>
                    <span>{{classBean.classId}}</span></li>
                <li class="befroe">
                    <p>班群人数</p>
                    <span>{{classBean.joinNumber}}</span></li>
                <li class="after">
                    <p>科目</p>
                    <span>{{classBean.subject}}</span></li>
            </ul>     
        </div>
        <div class="mid">
            <p>创建时间</p>
            <span>{{setTime}}</span>
        </div>
        <button @click="exit">退出班群</button>
    </div>
</template>
<script>
import utils from '@/utils/'
export default {
    data() {
        return{

        }
    },
    onLocad:function(options){
        let that = this
        let classBean =JSON.parse(options.classBean)
        that.setData({
            classBean: classBean
        })
    },
    computed:{
        setTime(){
            return utils.formatTime(this.classBean.setTime)
        }
    },
    methods: {

    }
}
</script>
<style lang="stylus" scoped>
.body
    position absolute
    top 0 
    left 0
    bottom 0
    right 0
    background-color #eee
    .info
        height 500rpx
        background-color #fff
        margin-top 20rpx
        padding 20rpx
        ul
            .befroe
                height 100rpx
                line-height 100rpx
                border-bottom 1rpx solid #e6e6e6  
                padding-left 10rpx
            .after
                height 100rpx
                line-height 100rpx
                padding-left 10rpx
    p
        float left 
        font-size 32rpx
        color #707070
    span 
        font-size 28rpx
        color #bfbfbf
        float right 
    .mid
        height 100rpx
        line-height 100rpx
        margin-top 20rpx
        padding 0rpx 20rpx
        background-color #fff
    button
        background-color #fff
        color #ff0000
        margin-top 20rpx
</style>
