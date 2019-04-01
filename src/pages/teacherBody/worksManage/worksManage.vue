<template>
    <div class="body">
        <view class="flex-yf">
        <!-- 导航栏 -->
        <view class="flex-x-m navbar">
            <block v-for="(item, index) in navbarTitle" :key="index">
            <view :class="'navbar-item '+(navbarActiveIndex === index ? 'navbar-item-active' : '')" :data-navbar-index="index" @click.stop="onNavBarTap">
            <text>{{item}}</text>
            </view>
            </block>
        </view>
        <div class="nav-list">
            <div>3月26日</div>
            <div class="finish" @click="worksDetail">
                <div class="flex-x-sb">
                    <div class="flex-xf-yc head">
                        <img src="/static/images/homework.png" >
                        <span class="title">3月26日作业</span>
                    </div>
                    <span style="width:100rpx;color:#d75959;">删除</span>
                </div>
                <div class="desc">
                    将三角函数预习一下，明天检查
                </div>
            </div>
        </div>
        <div class="getMore" @click="getMoreData">加载更多</div>
        
        </view>
    </div>
</template>
<script>
export default {
    data(){
        return{
            status:'0',
            navbarTitle:['已结束','进行中'],
            navbarActiveIndex:0,
        }
    },
    onLoad(options){
        console.log(options.status)
        if(options.status == '0'){
            this.status = '0';
            this.navbarActiveIndex = 0
        }else{
            this.status = '1'
            this.navbarActiveIndex = 1
        }
        this.getData()
    },
    methods:{
        getData(){

        },
        getMoreData(){

        },
        worksDetail(){
            wx.navigateTo({
            url: '/pages/teacherBody/worksDetail/main'
            })
        },
        onNavBarTap(e){
            this.navbarActiveIndex = e.currentTarget.dataset.navbarIndex
        },
        
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
    background #f8f8f8
    .navbar
        width 100%
        height 100rpx
        text-align center
        color #A8A8A8
        font-size 28rpx
        box-sizing border-box
        background-color #FFF
        border-bottom 1rpx solid #DFDFDF
        .navbar-item
            flex 1
            padding: 26rpx 0rpx
        .navbar-item-active
            transition all 0.3s
            border-bottom 10rpx solid #494949
            color #494949
    .nav-list
        padding 20rpx
        .getMore
            color #505250
            font-size 32rpx
            text-align center
        .finish
            padding 20rpx
            margin 10rpx 10rpx 20rpx 10rpx
            background #ffffff
            border-radius 10rpx
            box-shadow #ccc 0rpx 0rpx 10rpx 
            .head
                width 80%
                border-bottom 1rpx solid #e6e6e6
                padding-bottom 20rpx
                font-size 34rpx
                img 
                    width 48rpx
                    height 48rpx
            .desc
                width 68%
                margin-top 20rpx
                font-size 32rpx
                color #2c2c2c
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
            
                
            
    
</style>
