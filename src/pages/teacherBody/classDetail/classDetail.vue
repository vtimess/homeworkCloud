<template>
    <div class="body">
        <div class="flex-yf head">
            <span>{{form.name}}</span>
            <div class="flex-xf-yc" style="font-size:30rpx;margin-top:20rpx">
                <div class="flex-xf-yc">
                    <img style="width:36rpx;height:36rpx"  src="/static/images/people.png" >
                    <span> {{form.studentNum}}</span>
                </div>
                <div class="flex-xf-yc" style="margin-left:60rpx">
                    <img  src="/static/images/flag.png" >
                    <span>{{form.classId}}</span>
                </div>
            </div>
            <div class="flex-x-y navbar" >
                <div class="flex-yc" @click="end">
                    <span>已结束</span>
                    <span style="color:#E95848">0</span>
                </div>
                <span>|</span>
                <div class="flex-yc" @click="ongoing">
                    <span>进行中</span>
                    <span style="color:#E95848">0</span>
                </div>
            </div>
            <div class="edit" @click="edit">
                <img src="/static/images/modifyInfo.png" >
            </div>
        </div>
        <div class="student">
            <i-panel title="学生">
                    <div class="userInfo"  >
                        <i-swipeout operateWidth="120" :unclosable="true" :toggle="true">
                            <div slot="content" class="flex-xf-yc content">
                                <div class="avatar" ><avatar :src="avatar" size="default" @click="lookup(1)"></avatar></div>
                                <div class="name_desc">
                                    <div class="name">张申然</div>
                                </div>
                            </div>
                            <div class="button" slot="button">
                                <div class="item info" @click="lookup(1)">
                                    <span>查看</span>
                                </div>
                                <div v-if="creator" class="item bye" @click="del(1)">
                                    <span>踢出</span>
                                </div>
                            </div>
                        </i-swipeout>
                    </div>
                </i-panel>
        </div>
    </div>
</template>
<script>
import MyButton  from '@/components/MyButton.vue'
import { devHost as host } from '../../../http/config'
import StudentList from '@/components/StudentList'
import avatar from '@/components/lk-avatar'



export default {
    components:{
      MyButton,
      StudentList,
      avatar,
    },
    // onLoad(options){
    //     this.form = JSON.parse(options.data);
    // },
    data(){
        return{
            creator:true,
            avatar:'/static/images/header.png',
            form:{
                classId:null,
                name:null,
                password:null,
                subject:null,
                studentNum:0,
                classAvatarUrl:null,
                classDesc:null,
            },
            
        }
    },
    methods:{
        //跳转到学生个人资料
        lookup(val){
            console.log("lookup")
        },
        //将学生从本群删除
        del(val){
            console.log("del")

        },
        //跳转修改班群信息页面
        edit(){
            wx.navigateTo({
                url:'/pages/teacherBody/editClass/main'
            })
        },
        //跳转已结束作业详情页面
        end(){
            wx.navigateTo({
                url:'/pages/teacherBody/worksManage/main?status='+'0'
            })
        },
        ongoing(){
            wx.navigateTo({
                url:'/pages/teacherBody/worksManage/main?status='+'1'
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
    background #f1f1f1
    .head
        position relative
        color #fff
        background-color #E95848
        height 160rpx
        padding 30rpx
        margin-bottom 60rpx
        img 
            width 48rpx
            height 48rpx
        .navbar
            position absolute
            bottom 0
            left 50%
            transform translate(-50%, 50%)
            height 122rpx
            width 91.4%
            background-color #fff
            border-radius 4rpx
            box-shadow rgba(153, 153, 153, 0.24) 0 2px 7px
            span 
                font-size 32rpx
                color #2c2c2c
        .edit
            position absolute
            right 60rpx
            top 50%
            transform translate(50%, -50%)
    .student
        .userInfo
            .avatar 
                margin-right 20rpx
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

    


</style>
