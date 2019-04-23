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
        <div class="flex-yf comments" v-if="postData.hostRe">
            <span>热门评论</span>
            <div class="flex-xsb-yt nav" v-for="(items,rindex) in postData.hostRe" :key="rindex">
                <div class="avatar"  @click="look(items.userId)" ><avatar :src="items.avatar" size="default" ></avatar></div>
                <div class="flex-yf nav-con" @click="reply(items.username,items.id)">
                    <div class="flex-xf-yc">
                        <span>{{items.username}}</span>
                        <!-- <span>楼主</span> -->
                    </div>
                    <span class="text">{{replyCon?replyCon:''}}{{items.content}}</span>
                </div>
                <img style="width:38rpx;height:38rpx" src="/static/images/like.png" @click="like(items.id)">
            </div>
        </div>
        <div class="flex-yf comments">
            <span>所有评论</span>
            <div class="flex-xsb-yt nav" v-for="(items,indexs) in postData.re" :key="indexs">
                <div class="avatar"  @click="look(items.userId)" ><avatar :src="items.avatar" size="default" ></avatar></div>
                <div class="flex-yf nav-con" @click="reply(items.username,items.id)">
                    <div class="flex-xf-yc">
                        <span>{{items.username}}</span>
                        <!-- <span>楼主</span> -->
                    </div>
                    <span class="text">{{items.reUsername?'回复'+items.reUsername+':':''}}{{items.content}}</span>
                </div>
                <img style="width:38rpx;height:38rpx" src="/static/images/like.png" @click="like(items.id)">
            </div>
        </div>
        <div style="height:100rpx"></div>
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
            <button @click="rePosts">发表</button>
        </div>
    </div>
</template>
<script>
import host  from '@/http/config'
import avatar from '@/components/lk-avatar'

export default {
    components:{
      avatar,
    },
    data(){
        return{
            postData:{},
            placeholder:'评论一下吧~',
            comment:'',
            replyCon:'',
            focus:false,
            reId:-1,
        }
    },
    onLoad({id}){
        this.id = id
        this.getData()
    },
    methods: {
        //页面数据
        getData(){
            this.$api.postDetail(
                this.id
            ).then(data=>{
                this.postData = data
                this.postData.images = data.images.map(item=>{
                    return host + item
                })
                console.log(this.postData)
            }).catch(code=>{

            })
        },
        //评论功能
        rePosts(){
            this.$api.rePost({
                postId:this.postData.id,
                reId:this.reId,
                content:this.comment,
                images:[],
            }).then(data=>{
                this.reId = -1;
                this.placeholder = "评论一下吧~";
                this.getData()
            }).catch(code=>{
                wx.showToast({
                    icon:'none',
                    title:'评论失败!'
                },500)
            })
        },
        like(val){
            this.$api.commentZan({
                reId:val
            }).then(data=>{
                wx.showToast({
                    icon:'none',
                    title:'点赞成功'
                },500)
            }).catch(code=>{
                
            })
        },
        //帖子点赞
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
                
            })
        },
        //预览图片
        preview(val){
            wx.previewImage({
                current: val, // 当前显示图片的http链接
                urls: this.postData.imageList // 需要预览的图片http链接列表
            })
        },
        //点击评论设置input
        goReply(){
            this.placeholder = "评论一下吧~";
            this.focus = true
        },
        //input回复内容
        reply(name,id){
            this.placeholder = `回复${name}:`;
            this.reId = id
            this.focus = true
        },
        //查看个人资料
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
        padding 30rpx 40rpx
        border-bottom 0.5rpx solid #e6e6e6
        .nav
            width 100%
            padding 20rpx 0rpx
            .nav-con
                font-size 28rpx
                color #707070
                padding 0rpx 30rpx
                span
                    width 200rpx
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                .text
                    color #2c2c2c
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

