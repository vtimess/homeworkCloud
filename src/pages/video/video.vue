<template>
<div class="page-body">
    <div class="title" v-if="status">
        <title>第12期作业共性问题讲解！！！</title>
    </div>
    <div class="page-section">
        <video class="video" id="myVideo" src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400" 
        @play="bindplay" @pause="bindpause" @error="videoErrorCallback" :danmu-list="danmuList" objectFit='cover' show-center-play-btn="true" enable-danmu danmu-btn="true" control></video>
        <div class="footer">
            <div class="flex-x weui">
                <div class="weui-cell__bd">
                    <input v-model.lazy:value="danmu" @blur="bindInputBlur" class="weui-input" type="text" placeholder="弹幕礼仪>" />
                </div>
                <button @click="SendDanmu" class="page-body-button" type="primary" formType="submit">发送</button>
            </div>
        </div>
    </div>
    <div class="more">
        <ul class="flex-xf">
            <li class="flex-xf-yc">
                <img src="/static/images/praise.png" @click="praise">
                <span>666</span>
            </li>
            <li class="flex-xf-yc">
                <img src="/static/images/collect.png" @click="collect">
                <span>233</span>
            </li>
        </ul>
    </div>
    <div class="footer">
        <div class="comment">
            <ul>
                <li>
                    <p class="name">全部问答</p>
                    <span class="triangle"></span>
                </li>
            </ul>
        </div>
        <!-- <div class="question">

        </div>
        <div class="answer">

        </div> -->
    </div>
</div>
</template>
<script>
export default {
    onReady(res){
        this.videoContext = wx.createVideoContext('myVideo')
    },
    data(){
        return{
            src: '',
            status:true,
            inputValue: '',
            danmu:"",
            danmuList:[{
                text: '第 1s 出现的弹幕',
                color: '#ff0000',
                time: 1
            },
            {
                text: '第 3s 出现的弹幕',
                color: '#ff00ff',
                time: 3
            }] 
        }
    },
    methods:{
        //点赞
        praise(){
            wx.showToast({
                title: '么么哒',
                icon: 'none',
                duration: 1000
            })
        },
        //收藏视频
        collect(){
            wx.showToast({
                title: '已收藏',
                icon: 'none',
                duration: 1000
            })
        },
        //弹幕字体随机颜色
        getRandomColor () {
            const rgb = []
            for (let i = 0 ; i < 3; ++i){
                let color = Math.floor(Math.random() * 256).toString(16)
                color = color.length == 1 ? '0' + color : color
                rgb.push(color)
            }
            return '#' + rgb.join('')
        },
        //弹幕上传
        SendDanmu(){
            this.videoContext.sendDanmu({
                text: this.inputValue,
                color: this.getRandomColor()
            })
            //发送请求 上传弹幕danmuList
        },
        //当开始/继续播放时触发play事件
        bindplay(){
            this.status = false
        },
        //当暂停播放时触发 pause 事件
        bindpause(){
            this.status = true
        },
        //实时监听value
        bindInputBlur(){
            this.inputValue =  this.danmu
        },
        //视频播放出错时触发
        videoErrorCallback: function(e) {
            console.log('视频错误信息:')
            console.log(e.detail.errMsg)
        },
    },
    
    
}
</script>
<style lang="stylus" scoped>
@import '../../../static/css/app.css'
// @import '../../../static/css/weui.css'
.title
    position absolute
    top 0rpx
    left 0rpx 
    right 0rpx
    font-size 28rpx
    z-index 99999
    background rgba(0,0,0,0.1)
    padding 5rpx
    padding-left 20rpx
.page-section
    background #ffffff
    box-shadow 0px 2px 2px #f1f1f1
    .video
        width 100%
    .footer
        width 98%
        margin 0 auto
        height 64rpx
        .weui
            height 54rpx
            background #dbdbdb
            .weui-cell__bd
                width 100%
                .weui-input
                    height 54rpx
                    padding-left 10rpx
                    padding-right 10rpx
                    font-size 22rpx
                    background #f1f1f1
            .page-body-button 
                width 140rpx
                height 54rpx
                font-size 22rpx
                color #707070
                background #dbdbdb
            .page-body-button::after
                border none
.more
    width 96%
    margin 0 auto
    padding-top 20rpx
    ul
        width 100%
        padding-bottom 10rpx
        padding-left 5rpx
        border-bottom 1rpx solid #e6e6e6
        li
            width 140rpx
            img
                width 48rpx
                height 48rpx
            span
                font-size 28rpx
                color #2c2c2c
                line-height 46rpx 
                padding-left 5rpx
                height 46rpx
.footer
    padding-top 50rpx
    .comment
        width 96%
        margin 0 auto
        ul 
            width 100%
            border-bottom 1rpx solid #f1f1f1
            li 
                position relative
                width 140rpx
                padding-bottom 5rpx
                border-bottom 1rpx solid #64dcdb
                .name
                    color #64dcdb
                    font-size 30rpx
                    font-weight:bold
                    text-align center
                    padding-bottom 5rpx
                .triangle
                    position absolute
                    bottom 0rpx
                    left 50%
                    margin-left -3rpx
                    width 0
                    height 0
                    border-left 6rpx solid transparent
                    border-right 6rpx solid transparent
                    border-bottom 6rpx solid #64dcdb

</style>
