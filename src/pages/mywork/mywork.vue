<template>
    <div class="body">
        <div class="nav-list" v-for="item in homeworkData" :key="item.id">
            <div class="finish" @click="worksDetail(item)">
                <div class="flex-x-sb">
                    <div class="flex-xf-yc head">
                        <img src="/static/images/homework.png" >
                        <span class="title">{{item.beginTime}}作业</span>
                    </div>
                    <span style="width:140rpx;color:#d75959;font-size:26rpx;">{{item.status == 0?"未提交":item.status ==1?"未批改":"已批改"}}</span>
                </div>
                <div class="desc">
                    详细:{{item.desc}}
                </div>
            </div>
        </div>
        <div v-if="!show&&!end" class="getMore" @click="getMoreData">加载更多</div>
        <i-load-more v-if="show" tip="正在加载" :loading="show" />
        <i-load-more v-if="end" tip="已经到底啦" :loading="show" />
    </div>
</template>
<script>
import {formatNumber,formatTime} from '@/utils/index.js'
import host  from '../../http/config'

export default {
    data(){
        return{
            homeworkData:[],
            end:false,
            show:false,
            page:0,

        }
    },
    onLoad(){
        this.page = 0;
        this.getData()
    },
    methods:{
        getData(val){
            var vm = this;
            if(vm.page == 0){
                vm.worksData = [];
            }
            this.$api.gethomework({
                page:0,
                size:8
            }).then((data)=>{
                console.log(data)
                if(data.data.length<10){
                    vm.nothing = true;
                    this.end = true;
                }
                let nowtime = new Date();
                data.data.map((item,index)=>{
                    if(item.endTime){
                    item.end = nowtime > item.endTime ? '(已截止)':'';
                    item.endTime = formatTime(item.endTime);
                    item.beginTime = formatTime(item.beginTime).slice(5,10).replace('/','月')+'日'
                    }
                    item.images = host+item.images
                })
                console.log(data.data)
                this.homeworkData = data.data
            }).catch(code =>{
                console.log(code)

            })
        },
        worksDetail(row){
            wx.navigateTo({
            url: '/pages/homeworkInfo/main?homeworkData='+row
            })
        },
        getMoreData(){
            var vm = this;
            vm.page = vm.page + 1;
            vm.show = true,
            setTimeout(function(){
                vm.getData();
                vm.show = false;
                if(vm.nothing){
                    vm.end = true
                }
            },2000)
        }
    },
}
</script>
<style lang="stylus" scoped>
.body
    position absolute
    top 0rpx
    left 0rpx
    right 0rpx
    bottom 0rpx
    background #f8f8f8
    .nav-list
        padding 20rpx
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
    .getMore
        width 100%
        color #505250
        font-size 32rpx
        text-align center
</style>
