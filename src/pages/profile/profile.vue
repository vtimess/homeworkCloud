<template>
    <div class="self">
        <div class="main">
            <img class="header" :src="userData.avatarUrl" mode="scaleToFill">
        </div>
        <div class="flex-y user">
            <img class="useravatar" :src="userData.avatarUrl"/>
            <span class="username">{{userData.name}}</span>
        </div>
        <div class="flex-xc-yc praise" @click="praise(userData.id)">
            <img :src="praiseUrl" >
            <span>{{userData.likedNum}}</span>
        </div>
        <!-- <div class="flex-xc-yc praiseOver">
            <img :src="praiseOverUrl">
            <span>+1</span>
        </div> -->
        <div style="width:100%;height:16rpx;background:#f1f1f1"></div>
        <div class="flex-xf nav">
            <span>资料</span>
        </div>
        <div class="flex-xf container">
            <ul class="left">
                <li>姓名</li>
                <li>身份</li>
                <li v-if="userData.type == 2">学号</li>
                <li>性别</li>
                <li>手机号码</li>
                <li>座右铭</li>
            </ul>
            <ul class="right">
                <li>{{userData.name}}</li>
                <li>{{userData.type == 1?'教师':'学生'}}</li>
                <li v-if="userData.type == 2">{{userData.nid}}</li>
                <li>{{userData.sex}}</li>
                <li>{{userData.phone}}</li>
                <li>{{userData.motto}}</li>
            </ul>
            <span></span>
        </div>
        <div class="flex-xc heo">
            <span>— HEO技术支持 —</span>
        </div>
        <i-message id="message" />
        <MyButton styleType="defult" @click="call()">拨打电话</MyButton>
    </div>
</template>

<script>
const { $Message } = require('../../../static/iView/base/index');
import { mapState } from 'vuex'

import Mylist from '@/components/Mylist.vue'
import MyButton from '@/components/MyButton.vue'

    export default {
        components:{
            Mylist,
            MyButton
        },
        computed: {
            ...mapState([   //分发store中的数据到当前组件
                'status',
            ])
        },
        data() {
            return {
                number:0,
                avatarUrl:"",
                praiseUrl:"/static/images/praise_no.png",
                praiseOverUrl:"/static/images/praise_ok.png",
                userData:{},
            }
        },
        onLoad({id}) {
            Object.assign(this.$data, this.$options.data())
            console.log(id)
            this.getData(id);
        },
        methods:{
            getData(val){
                this.$api.getUser(
                    val
                ).then((data)=>{
                    this.userData = data
                    this.userData.phone = this.userData.phone?this.userData.phone:'无';
                    this.number = this.userData.likedNum
                    this.userData.sex = this.userData.sex == '男'?'男神':'女神';
                    this.userData.motto = this.userData.motto?this.userData.motto:'还没有励志名言呢...';
                    if(this.userData.like){
                        this.praiseUrl="/static/images/praise_ok.png";
                    }
                    console.log(data)
                })
            },
            praise(val){
                this.praiseUrl="/static/images/praise_ok.png";
                    this.$api.userZan({
                        userId: val
                    }).then((data)=>{
                        this.times = data
                        this.userData.likedNum = this.userData.likedNum + data
                    }).catch(code=>{
                        console.log(code)
                        if(code == 802 ){
                            $Message({
                                content: '改天再来吧，一天只能赞十次！',
                                type: 'warning'
                            });
                        }else{
                            wx.showToast({
                                icon:'none',
                                title:'点赞失败'
                            },500)
                        }
                    })
            },
            call(){
                wx.makePhoneCall({
                    phoneNumber: '17721570251' // 管理员的电话号码
                })
            }
        }
    }
</script>
<style lang="stylus"  scoped>
.self
    width 100%
    height 100%
    position absolute
    top 0px
    left 0px
    background-color #fff
    .main
        height 400rpx
        margin-bottom 50rpx
        overflow hidden
        .header
            width 100%
            height 650rpx
            filter blur(10rpx) 
            background no-repeat
            background-size 100% 100%
    .user
        position absolute
        top 140rpx
        left 50%
        transform translate(-50%,0)
        align-items center
        .useravatar 
            width 140rpx
            height 140rpx
            border-radius 50%
            overflow hidden
            border: 2px solid #fff
            box-shadow: 0rpx 6rpx 5rpx rgba(0, 0, 0, 0.2)
        .username
            margin-top 30rpx
            color #fff
            font-size 30rpx
        .motto
            width 360rpx
            margin-top 10rpx
            color rgba(255, 255, 255, 0.7)
            font-size 24rpx
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
    
    .praise
        position absolute
        right 20rpx
        top 140px
        width fit-content    
        padding 10rpx
        padding-left 16rpx
        padding-right 16rpx
        background rgba(0,0,0,0.1)
        border-radius 25rpx
        img
            width 38rpx
            height 38rpx
        span 
            padding-left 5rpx
            font-size 26rpx
            color #ffffff
    .nav
        padding-top 10rpx
        padding-left 80rpx
        border-bottom 1rpx solid #f1f1f1
        span 
            padding 10rpx 20rpx
            text-align center
            font-size 30rpx
            border-bottom 6rpx solid #64dcdb
            border-radius 4rpx
            color #64dcdb
    .praiseOver
        position absolute
        right 40rpx
        top 130px
        color #E9503C
        img
            width 38rpx
            height 38rpx
        span 
            padding-left 5rpx
            font-size 30rpx
    .container
        background-color #fff
        border-radius 5rpx
        padding-top 40rpx
        padding-bottom 100rpx
        font-size 26rpx
        li
            padding-top 26rpx
        .left
            padding-left 80rpx
            color #bfbfbf
        .right
            padding-left 60rpx
            color #2c2c2c
    .heo
        span 
            font-size 24rpx
            color #e4e4e4
</style>
