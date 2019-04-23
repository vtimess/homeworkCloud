<template>
    <div class="body">
        <div class="flex-xc head">
            <div class="flex-y user">
                <img class="useravatar" :src="userData.classAvatarUrl"/>
                <span class="username">{{userData.name}}</span>
            </div>
        </div>
        <div class="flex-xf-yc class">
            <div class="flex-xf-yc">
                <img style="width:36rpx;height:36rpx"  src="/static/images/people.png" >
                <span> {{userData.studentNum}}</span>
            </div>
            <div class="flex-xf-yc" style="margin-left:60rpx">
                <img  style="width:36rpx;height:36rpx" src="/static/images/flag.png" >
                <span>{{userData.classId}}</span>
            </div>
        </div>
        <i-panel title="教师">
            <i-swipeout operateWidth="120" :unclosable="true" :toggle="true" v-if="classData.teacher">
                <div slot="content" class="flex-xf-yc content">
                    <div class="avatar" ><avatar :src="classData.teacher.avatar" size="default" @click="lookup(classData.teacher.id)"></avatar></div>
                    <div class="name_desc">
                        <div class="name">{{classData.teacher.name}}</div>
                    </div>
                </div>
                <div class="button" slot="button">
                    <div  class="item like" @click="like(classData.teacher.id)">
                        <span>点赞</span>
                    </div>
                    <div class="item info" @click="lookup(classData.teacher.id)">
                        <span>查看</span>
                    </div>
                </div>
            </i-swipeout>
        </i-panel>
        <div class="mid">
            <i-panel title="学生">
                <div class="userInfo" v-for="item in classData.students" :key="item.id" >
                    <i-swipeout operateWidth="120" :unclosable="true" :toggle="true">
                        <div slot="content" class="flex-xf-yc content">
                            <div class="avatar" ><avatar :src="item.avatar" size="default" @click="lookup(item.id)"></avatar></div>
                            <div class="name_desc">
                                <div class="name">{{item.name}}</div>
                            </div>
                        </div>
                        <div class="button" slot="button">
                            <div  class="item like" @click="like(item.id)">
                                <span>点赞</span>
                            </div>
                            <div class="item info" @click="lookup(item.id)">
                                <span>查看</span>
                            </div>
                        </div>
                    </i-swipeout>
                </div>
            </i-panel>
        </div>
    </div>
</template>
<script>
import utils from '@/utils/'
import host  from '../../http/config'
import avatar from '@/components/lk-avatar'

export default {
    components:{
      avatar,
    },
    data() {
        return{
            userData:[],
            classData:{},
        }
    },
    onLoad(options){
        Object.assign(this.$data, this.$options.data())
        
        this.userData =JSON.parse(options.classBean)
        this.userData.classAvatarUrl = host + this.userData.classAvatarUrl
        this.userData.createTime = utils.formatTime(this.userData.createTime)
        this.getData(this.userData.classId)
        console.log(this.userData)
    },
    
    methods: {
        getData(val){
            this.$api.getCDS({
                classId:val
            }).then(data=>{
                this.classData = data
                console.log(data)
            })
        },
        like(val){

        },
        lookup(val){
            wx.navigateTo({
                url:'/pages/profile/main?id='+val
            })
        },
        exit(){
            this.$api.exitClass(
                this.userData.classId
            ).then(()=>{
                var pages = getCurrentPages();
                var prePage = pages[pages.length - 2];
                setTimeout(()=>{
                    wx.navigateBack({
                        success:function(){
                            prePage.onLoad()
                        }
                    })
                },1000)
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
.body
    position absolute
    top 0 
    left 0
    bottom 0
    right 0
    background-color #f1f1f1
    .head
        padding 100rpx 0rpx
        background-image: linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);
        .user
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
    .class
        height 92rpx
        width 91.4%
        margin-top -46rpx
        margin-left 4.3%
        background-color #fff
        border-radius 4rpx
        box-shadow rgba(153, 153, 153, 0.24) 0 2px 7px
    .button
        background-color #888
        height 100%
        display flex
        .item
            height 100%
            width 80px
            color #fff
            text-align center
            display flex
            align-items center
            span
                flex-grow 1
                text-align center
                font-size 30rpx
        .like
            background-color #e74c3c
        .info
            background-color #3498db
        .bye
            background-color #7f8c8d
    .mid
        padding 20rpx 0rpx
        margin-top 20rpx
        .userInfo
            .avatar 
                margin-right 20rpx
            
   
</style>
