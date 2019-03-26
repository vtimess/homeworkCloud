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
        <view class="movie-content-wrapper">
            <swiper class="swiper" :current="navbarActiveIndex" 
            @animationfinish="animationFinish">
            <swiper-item >
                <scroll-view scroll-y="true">
                    <div>3月26日</div>
                    <div class="finish">
                        <div class="flex-xf-yc head">
                            <img src="/static/images/homework.png" >
                            <span class="title">3月26日作业</span>
                        </div>
                        <div class="desc">
                            四年防务服务费威锋网服务范围无法无法
                        </div>
                    </div>
                </scroll-view>
            </swiper-item>
            <swiper-item >
                <scroll-view scroll-y="true">
                    2
                </scroll-view>
            </swiper-item>
            
            </swiper>
        </view>
        </view>
    </div>
</template>
<script>
export default {
    data(){
        return{
            navbarTitle:['已结束','进行中'],
            navbarActiveIndex:0,
        }
    },
    onLoad(){
        this.getData()
    },
    methods:{
        getData(){

        },
        onNavBarTap(e){
            this.navbarActiveIndex = e.currentTarget.dataset.navbarIndex
        },
        animationFinish({ mp }){
            this.navbarActiveIndex = mp.detail.current
        }
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
    background #fff
    .navbar
        position absolute
        left 0
        top 0
        z-index 500
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
    .movie-content-wrapper
        position absolute
        left 0
        right 0
        bottom 0
        top 100rpx
        .swiper
            background #f8f8f8
            padding 20rpx
            height 100%
            .finish
                padding 20rpx
                margin-top 10rpx
                background #ffffff
                border-radius 10rpx
                box-shadow #ccc 0rpx 0rpx 10rpx 
                .head
                    border-bottom 1rpx solid #e6e6e6
                    padding-bottom 20rpx
                    img 
                        width 48rpx
                        height 48rpx
                .desc
                    width 50%
                    margin-top 20rpx
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
    
</style>
