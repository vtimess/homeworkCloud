<template>
    <div class="body">
        <div class="flex-xf-yc head">
            <img class="useravatar" :src="postData.avatar" @click="look(postData.userId)"/>
            <div class="flex-yf title">
                <span class="name">{{postData.username}}</span>
                <span class="motto">体育学院</span>
            </div>
        </div>
        <div class="flex-xx-yc content">
                <span>{{postData.content}}</span>
                <div class="flex-x-y images" >
                    <img v-for="item in postData.images" :key="item" :src="item" @click="preview(item)">
                </div>
                
        </div>
        <div class="flex-x-sb footer">
            <div style="width:500rpx;text-overflow:ellipsis;word-wrap:break-word">{{postData.beforeTime}}</div>
            <div class="flex-x-r">
                <li class="flex-xf-yc" >
                    <img v-if="postData.like" src="/static/images/like_fill.png" @click="postZan(postData.id)" >
                    <img v-else src="/static/images/like.png" @click="postZan(postData.id)">
                    <span>{{postData.likeNum?postData.likeNum:'赞'}}</span>
                </li>
                <li class="flex-xf-yc" @click="goReply">
                    <img src="/static/images/message.png">
                    <span>{{postData.commentNum?postData.commentNum:'评论'}}</span>
                </li>
            </div>
        </div>
        <div class="flex-yf comments">
            <span>热门评论</span>
            <div class="flex-xsb-yt nav">
                <img style="width:64rpx;height:64rpx" src="/static/images/chemistry.png" >
                <div class="flex-yf nav-con" @click="reply">
                    <div class="flex-xf-yc" style="width:140rpx;">
                        <span>张申然</span>
                        <!-- <span>楼主</span> -->
                        <img style="width:32rpx;height:32rpx" src="/static/images/like.png" >
                    </div>
                    <span class="text">1231321313212312312312312311564654564321322123123</span>
                </div>
                <img style="width:38rpx;height:38rpx" src="/static/images/like.png" >
            </div>
        </div>
        <div class="flex-yf comments">
            <span>所有评论</span>
            <div class="flex-xsb-yt nav">
                <img style="width:64rpx;height:64rpx" src="/static/images/chemistry.png" >
                <div class="flex-yf nav-con" @click="reply">
                    <div class="flex-xf-yc" style="width:140rpx;">
                        <span>张申然</span>
                        <!-- <span>楼主</span> -->
                        <img style="width:32rpx;height:32rpx" src="/static/images/like.png" >
                    </div>
                    <span class="text">{{replyCon?replyCon:''}}1231321313212312312312312311564654564321322123123</span>
                </div>
                <img style="width:38rpx;height:38rpx" src="/static/images/like.png" >
            </div>
        </div>
        <!-- <div>所有评论</div> -->
        <div class="flex-x-sb comment ">
            <textarea name="" 
            class=""
            rows="1"
            fixed="true"
            auto-height="true"
            v-model="comment"
            :focus="focus"
            cursor-spacing="30" 
            maxlength="50"
            :placeholder="placeholder"
            placeholder-style="" 
            adjust-position="true"></textarea>
            <button>发表</button>
        </div>
    </div>
</template>
<script>
import host  from '@/http/config'

export default {
    data(){
        return{
            postData:{},
            placeholder:'评论一下吧~',
            comment:'',
            replyCon:'',
            focus:false,
        }
    },
    onLoad({id}){
        console.log(id)
        this.getData(id)
    },
    methods: {
        getData(val){
            this.$api.postDetail(
                val
            ).then(data=>{
                this.postData = data
                this.postData.images = data.images.map(item=>{
                    return host + item
                })
                console.log(this.postData)
            }).catch(code=>{

            })
        },
        postZan(val){
            this.$api.postZan({
                postId:val
            }).then(data=>{
                this.postData.like = true;
                this.postData.likeNum++;
                wx.showToast({
                    icon:'none',
                    title:'点赞成功'
                },500)
                console.log(data)
            }).catch(code=>{
                wx.showToast({
                    icon:'none',
                    title:msg
                },500)
            })
        },
        preview(val){
            wx.previewImage({
                current: val, // 当前显示图片的http链接
                urls: this.postData.imageList // 需要预览的图片http链接列表
            })
        },
        goReply(){
            this.placeholder = "评论一下吧~";
            this.focus = true
        },
        reply(){
            console.log(666)
            this.placeholder = "回复某某某:";
            this.focus = true
        },
        look(val){
            wx.navigateTo({
                url:'/pages/profile/main?id='+val
            })
        }

    },
}
</script>
<style lang="stylus" scoped>
.body
    width 100%
    height 100%
    position absolute
    top 0px
    left 0px
    background-color #fff
    .head
        padding 30rpx 30rpx
        .useravatar
            width 100rpx
            height 100rpx
            border-radius 50%
            overflow hidden
            border: 2px solid #fff
            box-shadow: 0rpx 6rpx 5rpx rgba(0, 0, 0, 0.2)
        .title
            margin-left 20rpx
            padding-top 4rpx
            .name
                font-size 30rpx
                color #64dcdb
            .motto
                font-size 28rpx
                color #cdcdcd
    .content
        span
            font-size 28rpx
            color #2c2c2c
            padding 0rpx 30rpx
        .images
            padding-top 20rpx
            height auto
            img
                float left
                width 220rpx
                height 200rpx
    .footer
        font-size 22rpx
        padding 50rpx 20rpx 0rpx 100rpx
        border-bottom 0.5rpx solid #e6e6e6
        img
            width 40rpx
            height 40rpx
        span
            color #bfbfbf
        li
            margin 10rpx 50rpx
    .comments
        padding 20rpx 40rpx
        border-bottom 0.5rpx solid #e6e6e6
        .nav
            width 100%
            padding-top 20rpx
            .nav-con
                font-size 28rpx
                color #707070
                padding 0rpx 30rpx
                .text
                    margin-top 10rpx
                    width 500rpx
                    text-overflow ellipsis
                    word-wrap break-word
    .comment
        position fixed
        width 100%
        bottom 0rpx
        min-height 100rpx
        padding 12rpx 0rpx
        background #f8f8f8
        textarea
            width 500rpx
            height 60rpx
            padding 5rpx 10rpx
            margin-left 40rpx
            background #ffffff
        button
            color #ffffff
            background #64dcdb
            height 80rpx
            width 130rpx
            line-height 80rpx
            margin 0rpx 40rpx
            font-size 34rpx
        button::after
            border none
</style>

