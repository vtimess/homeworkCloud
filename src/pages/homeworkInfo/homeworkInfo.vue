<template>
    <div class="body">
        <div class="time">
            <time>6月16日 周一 12:26 布置</time>
            <time>9月32日 周三 01:01 截止(已截止)</time>
            <span class="object">数学训练</span>
        </div>
        <div class="works">
            <p>作业详情: </p>
            <li>1. 第3~6题、第12题 p32</li>
            <li>2. 第3~6题、第12题 p12</li>
            <li>3. 第6题、第18题 p62</li>
            <li>4. 第1~4题、第12题p132</li>
        </div>
        <div class="finish">
            <span v-if="!status" >还未有同学完成</span>
            <span v-if="status" @click="finished">36同学已经完成</span>
            <img src="/static/images/finish.png"/>
        </div>
        <StudentList></StudentList>
        <div class="footer">
            <button class="sub" @click="submit">提交作业</button>
        </div>
    </div>
</template>
<script>
import utils from '@/utils/'
import StudentList from '@/components/StudentList'
export default {
    components:{
      StudentList,
    },
    data() {
        return {
            status:false,
            button:[
                // 提交作业
                // 重新提交
                // 已截止
                // 老师视频讲解
            ]
        }
    },
    computed:{
        // end(){
        //     let nowtime = new Date()
        //     return nowtime > this.homework.endTime ? '(已截止)':''
        // },
        // startDate(){
        //     return utils.formatTime(this.homework.startTime)
        // },
        // endDate(){
        //     return utils.formatTime(this.homework.endTime)
        // }
    },
    onLoad(){
        this.getData()
    },
    methods:{
        getData:async function(){
            let result = await this.$http.get('/student/homeworkInfo')
            if(result){
                this.homeworkInfo = result
                this.status = true
            }
        },
        finished(){
            wx.navigateTo({
                url: '../finish/main'
            })
        },
        submit(){
            wx.navigateTo({
                url: '../photos/main'
            })
        }
    }    
}
</script>
<style lang="stylus" scoped>
.body
    width 100%
    height auto
    .time
        position relative
        height 100rpx
        font-size 30rpx
        padding 20rpx
        color #515151 
        background-color #f3f4f5
        .object
            position absolute
            width 150rpx
            height 60rpx
            text-align center
            line-height 60rpx
            right 50rpx
            top 50%
            margin-top -30rpx
            color #fff
            border-radius 10rpx
            background-color #64dcdb
    .works
        p
            font-size 30rpx
            letter-spacing 0.1em
            color #707070
            margin 20rpx
        li
            font-size 28rpx
            color #515151
            margin 5rpx 140rpx
    .finish
        position relative
        margin-top 40rpx
        margin-bottom 40rpx
        img 
            width 100%
            height 40rpx
            position absolute
            top 5rpx
            left 0
        span
            display block
            text-align center
    .footer
        height 110rpx
        position fixed
        bottom 20rpx
        left 0
        right 0
        background-color #fff
        padding-top 10rpx
        button
            height 100rpx
            margin 20rpx 
            background-color #ff0000
            color #fff
            border-radius 10rpx
</style>
