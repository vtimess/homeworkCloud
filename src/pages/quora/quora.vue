<template>
    <div class="body">
        <div class="model">
            <div class="flex-xf-yc header">
                <img src="/static/images/headimg.png">
                <div class="flex-yf header-title">
                    <span class="name">不屑灯笼酷爱洗澡</span>
                    <span class="time">56分钟前</span>
                </div>
            </div>
            <span class="title">{{title}}</span>
            <div class="flex-x-y images">
                <img src="/static/images/headimg.png">
                <img src="/static/images/headimg.png">
                <img src="/static/images/headimg.png">
            </div>
            <div class="footer">
                <ul class="flex-x">
                    <li class="flex-xf-yc">
                        <img src="/static/images/share.png" >
                        <span>分享</span>
                    </li>
                    <li class="flex-xf-yc">
                        <img src="/static/images/message.png">
                        <span>回复</span>
                    </li>
                    <li class="flex-xf-yc">
                        <img src="/static/images/zan.png" >
                        <span>1</span>
                    </li>
                </ul>
            </div>
            <div class="bottom"></div>
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
        vm.pageNo = vm.pageNo + 1;
        var list =  JSON.parse(JSON.stringify(vm.list2));
        vm.list = vm.list.concat(list);
        vm.pageStatus = false;
    }, 2000);
},
data(){
    return{
        listData:[
            {
                title: '/static/images/example0.png',
                name: '《虫师》',
                time:'2019/4/25 09:17'
            },
            {
                url: '/static/images/example1.png',
                name: '《loading》',
                time:'2019/4/25 09:17'
            },
            {
                url: '/static/images/example2.png',
                name: '《冰与火之歌》',
                time:'2019/4/25 09:17'
            },
            {
                url: '/static/images/example3.png',
                name: '《鹿丸》',
                time:'2019/4/25 09:17'
            },
            {
                url: '/static/images/example4.png',
                name: '《星空》',
                time:'2019/4/25 09:17'
            },
            {
                url: '/static/images/example0.png',
                name: '《虫师》',
                time:'2019/4/25 09:17'
            },
            {
                url: '/static/images/example1.png',
                name: '《loading》',
                time:'2019/4/25 09:17'
            },
            {
                url: '/static/images/example2.png',
                name: '《冰与火之歌》',
                time:'2019/4/25 09:17'
            },
            {
                url: '/static/images/example3.png',
                name: '《鹿丸》',
                time:'2019/4/25 09:17'
            },
            {
                url: '/static/images/example4.png',
                name: '《星空》',
                time:'2019/4/25 09:17'
            }
        ],
      title:"#RNG超话#2020年LOL世界赛决赛RNG 3:0 GRF 完虐!",
       
    
    }
},
methods:{
    click(e){
        console.log(e)
    }
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
            font-size 24rpx
            padding 0rpx 0rpx 10rpx 0rpx
            img
                width 64rpx
                height 64rpx
        .bottom
            height 20rpx
            background #f1f1f1
</style>