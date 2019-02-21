<template>
    <div class="list" @click="hwShow">
        <div class="header">
            <img src="/static/images/physics.png" />
            <span >{{homework.teacherName}}</span>
        </div>
        <div class="hr"></div>
        <div class="mid">
            <p>{{homework.description}}</p>
            <span>可提交</span>
        </div>
        <div class="footer">
            <img src="/static/images/clock.png"/>
            <time>{{date}} 截止 {{end}}</time>
        </div>
    </div>
</template>
<script>
import utils from '@/utils/'
export default {
    props:{
        homework:Object
    },
    data () {
        
    },
    created() {
        this.buttons=[
            {status:'待提交',color:""},
            {status:'待批改',color:""},
            {status:'已完成',color:""}
        ]
        this.imgs=[
            {subject:'语文',img:'/static/images/chinese.png'},
            {subject:'数学',img:'/static/images/math.png'},
            {subject:'英语',img:'/static/images/english.png'},
            {subject:'化学',img:'/static/images/chemistry.png'},
            {subject:'物理',img:'/static/images/physics.png'},
            {subject:'生物',img:'/static/images/biology.png'},
            {subject:'地理',img:'/static/images/geography.png'},
            {subject:'其他',img:'/static/images/subject.png'}
        ]
    },
    computed: {
        end(){
            let nowtime = new Date()
            return nowtime > this.homework.endTime ? '(已截止)':''
        },
        date(){
            return utils.formatTime(this.homework.endTime)
        }
    },
    methods: {
        hwShow:function(){
            wx.navigateTo({
            url:'/pages/homeworkInfo/main'
            })
        },
    },
}
</script>
<style lang="stylus" scoped>
.list
    height 300rpx
    margin 25rpx 30rpx
    background-color #fff
    border-radius 16rpx
    box-shadow: 4rpx 4rpx 5rpx rgba(100, 255, 255, 0.3);
    .header
        height 76rpx
        img
            width 64rpx
            height 64rpx
            margin 6rpx
            float left
        span
            height 76rpx
            line-height 76rpx
            font-size 28rpx
    .hr
        border-bottom 1rpx solid #f3f4f5
        margin 0rpx 20rpx
    .mid
        height 124rpx
        p
            width 345rpx
            font-size 34rpx
            margin-left 30rpx
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            line-height 124rpx
            float left
        span
            width 100rpx
            height 60rpx
            margin 0rpx 107rpx
            font-size 32rpx
            line-height 184rpx
            color #ff0000
            display inline
    .footer
        height 100rpx
        img
            width 30rpx
            height 30rpx
            float left
            margin-left 15rpx
            margin-right 10rpx
        time
            margin-top 40rpx
            font-size 24rpx
            color #cdcdcd
        
</style>
