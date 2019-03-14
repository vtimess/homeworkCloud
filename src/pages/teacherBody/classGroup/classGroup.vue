<template>
    <div class="body">
        <div v-for="(item, index) in classData" :key="index">
        <div style="margin-top:20rpx"></div>
        <div class="card" @click="toClassDetail">
            <div class="flex-x-sb card-title">
                <div class="flex-xc-yc">
                    <img class="image" :src="item.classAvatarUrl">
                    <div class="flex-yf className">
                        <span>{{item.name}}</span>
                        <span style="color:#707070;font-size:26rpx;margin-top:10rpx">班群号:{{item.classId}}</span>
                    </div>
                </div>
                <span class="manage" @click="delClass">删除</span>
            </div>
            <div class="card-footer">
                <span>创建时间：{{createTime}}</span>
                <span>班群人数: {{studentNum}} 人</span>
            </div>
        </div>   
        </div>     
    </div>
</template>
<script>
import {formatNumber,formatTime} from '@/utils/index.js'
export default {
    data(){
        return{
            classData:[],
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.getData();
        });
    },
    methods:{
        //请求 获取班群列表
        getData(){
            this.$api.getClassList({})
            .then( data =>{
                data.map((item)=>{
                    item.createTime = formatTime(item.createTime)
                })
                this.classData = data
            })
        },
        toClassDetail(){
            wx.navigateTo({
                url: '/pages/teacherBody/classDetail/main'
            })
        },
        //删除班群
        delClass(){
            wx.showModal({
                title: '提示',
                content: '确定要删除该班群吗?',
                success(res) {
                    if (res.confirm) {
                    console.log('用户点击确定')
                    } else if (res.cancel) {
                    console.log('用户点击取消')
                    }
                }
            })
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
    .card
        margin-left 30rpx
        margin-right 30rpx
        padding 20rpx
        border 1rpx solid #e6e6e6
        border-radius 5rpx
        box-shadow #efefef 0rpx 0rpx 10rpx 
        .card-title
            border-bottom 1rpx solid #f1f1f1
            padding-bottom 20rpx
            .image
                width 120rpx
                height 120rpx
                border-radius 50%
            .className
                width 200rpx
                margin-left 20rpx
                color #2c2c2c
                font-size 32rpx
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
            .manage
                margin-right 50rpx
                color #ed3f14
                font-weight 600rpx
                letter-spacing 5rpx
        .card-footer
            padding-top 20rpx
            padding-right 20rpx
            color #8a8a8a
            font-size 24rpx

</style>
