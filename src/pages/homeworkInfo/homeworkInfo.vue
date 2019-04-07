<template>
    <div class="body">
        <div class="time">
            <time>{{homeworkData.beginTime}} 布置</time>
            <time>{{homeworkData.endTime}} 截止{{homeworkData.end}}</time>
            <span class="object">{{homeworkData.subject}}训练</span>
        </div>
        <div class="works">
            <p>作业详情: </p>
            <li>{{homeworkData.desc}}</li>
            <li><img style="width:300rpx;height:300rpx;" :src="homeworkData.images" ></li>
        </div>
        <div class="finish">
            <span v-if="!status" >还未有同学完成</span>
            <span v-if="status" @click="finished">36同学已经完成</span>
            <img src="/static/images/finish.png"/>
        </div>
        <StudentList></StudentList>
        <div class="footer">
            <button class="sub" @click="submit">{{homeworkData.status == '-1'?'提交作业':'已提交'}}</button>
        </div>
    </div>
</template>
<script>
import utils from '@/utils/'
import StudentList from '@/components/StudentList'
import host  from '../../http/config'

export default {
    components:{
      StudentList,
    },
    data() {
        return {
            status:false,
            homeworkData:{},
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
    onLoad(options){
        console.log(options)
        this.homeworkData = JSON.parse(options.homeworkData)
        this.homeworkData.images = `${host}${this.homeworkData.images}`
        console.log(this.homeworkData)
    },
    methods:{
        
        finished(){
            wx.navigateTo({
                url: '../finish/main'
            })
        },
        submit(){
            wx.navigateTo({
                url: '../photos/main?id='+this.homeworkData.id
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
