<template>
    <div class="body">
    <div v-for="(item, index) in classData" :key="index">
        <div style="margin-top:20rpx"></div>
        <div class="card" @click="toClassDetail(item)">
            <div class="flex-x-sb card-title">
                <div class="flex-xc-yc">
                    <img class="image" :src="item.classAvatarUrl">
                    <div class="flex-yf className">
                        <span>{{item.name}}</span>
                        <span style="color:#707070;font-size:26rpx;margin-top:10rpx">班群号:{{item.classId}}</span>
                    </div>
                </div>
                <div class="flex-xf-yc detail">
                    <span >查看详情</span>
                    <img src="/static/images/back.png" >
                </div>
            </div>
            <div class="card-footer">
                <span>创建时间：{{item.createTime}}</span>
                <span>班群人数: {{item.studentNum||0}} 人</span>
            </div>
        </div>   
    </div>
    <div v-show="show" class="flex-yc error">
        <img src="/static/images/load-error.png" @click="getData">
        <span>加载失败,点击重试</span>
    </div>     
    </div>
</template>
<script>
import {formatNumber,formatTime} from '@/utils/index.js'
import host  from '../http/config'
import store from '../store/'

export default {
    data(){
        return{
            classData:[],
            show:false,
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.getData();
        });
    },
    onPullDownRefresh(){
        if(store.state.tabIndex == '1'){
            this.getData()
            setTimeout(function(){
                wx.stopPullDownRefresh()
            },2000)
        }
    },
    methods:{
        //请求 获取班群列表
        getData(){
            this.$api.getClassList({})
            .then( data =>{
                this.show = false
                data.map((item)=>{
                    if(item.createTime){
                        item.createTime = formatTime(item.createTime);

                    }
                    if(item.classAvatarUrl){
                        item.classAvatarUrl = host + item.classAvatarUrl ;
                    }
                })
                console.log(data)
                this.classData = data
            })
            .catch(code =>{
                this.show = true
                // console.log(this.classData.length)
            })
        },
        toClassDetail(val){
            let data = JSON.stringify(val)
            wx.navigateTo({
                url: `/pages/teacherBody/classDetail/main?data=${data}`
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
@import '../../static/css/app.css'

.body
    width 100%
    height 100%
    background #fff
    .error
        width 100%
        height 100%
        background #fff
        img
            margin-top 50%
            width 192rpx
            height 192rpx
        span
            font-size 32rpx
            color #707070
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
            .detail
                color #707070
                font-size 26rpx
                img 
                    width 24rpx
                    height 24rpx
        .card-footer
            padding-top 20rpx
            color #8a8a8a
            font-size 24rpx
            span 
                padding-right 20rpx

</style>
