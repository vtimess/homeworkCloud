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
        <div class="nav-list" v-for="item in worksData" :key="item.id">
            <div>{{item.startDate}}</div>
            <div class="finish" @click="worksDetail(item.id)">
                <div class="flex-x-sb">
                    <div class="flex-xf-yc head">
                        <img src="/static/images/homework.png" >
                        <span class="title">{{item.startDate}}作业</span>
                    </div>
                    <span style="width:140rpx;color:#d75959;font-size:26rpx;">0/23已提交</span>
                </div>
                <div class="desc">
                    将三角函数预习一下，明天检查{{item.desc}}
                </div>
            </div>
        </div>
        <div v-if="!show&&!end" class="getMore" @click="getMoreData">加载更多</div>
        <i-load-more v-if="show" tip="正在加载" :loading="show" />
        <i-load-more v-if="end" tip="已经到底啦" :loading="show" />
        
        </view>
    </div>
</template>
<script>
export default {
    data(){
        return{
            status:'0',
            navbarTitle:['进行中','已结束'],
            navbarActiveIndex:0,
            page:0,
            classId:'',
            worksData:[],
            end:false,
            show:false,
            nothing:false,
        }
    },
    onLoad(options){
        console.log(options)
        this.classId = options.classId
        if(options.status == '0'){
            this.status = '0';
            this.navbarActiveIndex =0
        }else{
            this.status = '1'
            this.navbarActiveIndex = 1
        }
        this.page = 0;
        this.getData()
    },
    methods:{
        getData(){
            var vm = this;
            if(vm.page == 0){
                vm.worksData = [];
            }
            vm.$api.getWorksT({
                page:vm.page,
                size:10,
                classId:vm.classId,
                end:vm.status
            }).then((data)=>{
                if(data.data.length<10){
                    vm.nothing = true;
                    this.end = true;
                }
                data.data.map((item)=>{
                    let date = item.startDate.slice(5,10)
                    item.startDate = date.replace('-','月')+'日'
                })
                vm.worksData = [...vm.worksData,...data.data];
                console.log(data.data,vm.worksData)
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
