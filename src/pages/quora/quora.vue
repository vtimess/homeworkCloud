<template>
    <div class="body">
        <div class="model" @click="details">
            <div class="flex-xf-yc header">
                <img src="/static/images/headimg.png">
                <div class="flex-yf header-title">
                    <span class="name">不屑灯笼酷爱洗澡</span>
                    <span class="time">56分钟前</span>
                </div>
            </div>
            <span class="title">{{title}}</span>
            <div class="flex-x-y images">
                <img @click="preview" mode="aspectFill" src="/static/images/headimg.png">
                <img @click="preview" mode="aspectFill" src="/static/images/headimg.png">
                <img @click="preview" mode="aspectFill" src="/static/images/headimg.png">
            </div>
            <div class="footer">
                <ul class="flex-x">
                    <li class="flex-xf-yc">
                        <img  src="/static/images/share.png" >
                        <span>分享</span>
                    </li>
                    <li class="flex-xf-yc">
                        <img src="/static/images/message.png">
                        <span>回复</span>
                    </li>
                    <li class="flex-xf-yc">
                        <img src="/static/images/zan.png" >
                        <span>点赞</span>
                    </li>
                </ul>
            </div>
            <div class="bottom"></div>
        </div>
        <div class="release">
        <img src="/static/images/edit.png" @click="release">
        </div>
        
    </div>
</template>
<script>
export default {
onPullDownRefresh(){
    // this.$refs.callchild.callchild(true,this.listData)
    //wx.stopPullDownRefresh()
},
// onReachBottom() {   
//     console.log("123456")
//     this.$refs.callchild.callchild(true,this.listData)  
//  },

onReachBottom: function () {
    var vm = this;
    vm.pageStatus = true
    setTimeout(function () {
        // vm.pageNo = vm.pageNo + 1;
        // var list =  JSON.parse(JSON.stringify(vm.list2));
        // vm.list = vm.list.concat(list);
        vm.pageStatus = false;
    }, 2000);
},
data(){
    return{
        
      title:"#RNG超话#2019年LOL世界赛决赛RNG 3:0 GRF 完虐!",
       
    
    }
},
methods:{
    //跳转详情页面
    details(e){
        console.log(e)
    },
    //预览图片
    preview(){
        wx.previewImage({
            current: '/static/images/example0.png', // 当前显示图片的http链接
            urls: [
                '',
                '',
                ''
                ] // 需要预览的图片http链接列表
        })
    },
    //跳转发布帖子页面
    release(){
      wx.navigateTo({
        url:'/pages/release/main'
      })
    },
},
 

}
</script>
<style <style lang="stylus" scoped>
@import '../../../static/css/app.css'
.body
    width 100%
    height auto
    max-height 600rpx
    background #fff
    .model
        .header
            width 100%
            height 100rpx
            color #2c2c2c
            padding 20rpx 20rpx 0rpx 20rpx
            img 
                width 100rpx
                height 100rpx
                border-radius 50%
                margin-right 20rpx
            .header-title
                .name
                    font-size 28rpx
                .time
                    color #707070
                    font-size 24rpx
        .images
            height auto
            padding 0rpx 20rpx 20rpx 20rpx
            img
                float left
                width 220rpx
                height 200rpx
        .title
            width 600rpx
            font-size 30rpx
            color #707070
            overflow hidden
            padding 20rpx 10rpx 10rpx 30rpx
            text-overflow ellipsis
            display -webkit-box
            -webkit-line-clamp 2
            -webkit-box-orient vertical
        .footer
            font-size 22rpx
            padding 0rpx 0rpx 10rpx 0rpx
            img
                width 48rpx
                height 48rpx
        .bottom
            height 20rpx
            background #f1f1f1
    .release
        position fixed
        right 80rpx
        bottom 100rpx
        img
            width 64rpx
            height 64rpx
</style>