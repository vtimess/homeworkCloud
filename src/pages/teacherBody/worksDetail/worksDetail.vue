<template>
    <div class="body">
        <div class="flex-yf head">
            <i-cell-group>
                <i-cell title="作业名称" value="03月34日 作业"></i-cell>
                <i-cell title="截止时间" value="2019/03/45"></i-cell>
            </i-cell-group>
            <i-collapse-item v-if="1" title="作业详情" name="name1">
                <view slot="content">
                    <img style="width:200rpx;height:200rpx;" src="/static/images/header.png">
                </view>
            </i-collapse-item>
        </div>
        <div class="flex-yf mid">
            <i-cell-group>
                <i-cell title="正确率" value="93%"></i-cell>
                <i-cell title="提交情况" value="12/23已提交"></i-cell>
                <i-cell title="批改情况" value="08/23已批改"></i-cell>
            </i-cell-group>
        </div>
        <view class="student"  slot="content">
            <i-collapse name="name1" accordion>
            <i-collapse-item v-if="1" :title="unCorrect" name="name1">
                <view slot="content">
                     <div class="flex-x-m">
                        <li  class="flex-y stuImage" @click="toStudent">
                            <img class="images" mode="aspectFill" src="/static/images/header.png" >
                            <span>张申然</span>
                        </li>
                    </div>
                </view>
            </i-collapse-item>
            <i-collapse-item v-if="1" :title="correct" name="name2">
                <view slot="content">
                    <div class="flex-x-m">
                        <li class="flex-y stuImage" @click="toStudent">
                            <img class="images" mode="aspectFill" src="/static/images/header.png" >
                            <span>张申然</span>
                            <img @click="del" class="del" src="/static/images/trues-active.png">
                        </li>
                    </div>
                </view>
            </i-collapse-item>
            </i-collapse>
        </view>
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            correct:'已批改',
            unCorrect:'未批改',
        }
    },
    methods:{
        toStudent(){
            wx.navigateTo({
                url: '/pages/teacherBody/sdtDetail/main'
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
        background #fff
        padding-bottom 10rpx
        margin-bottom 20rpx
    .mid
        background #fff
        margin-bottom 20rpx
    .student
        padding-top 20rpx
        padding-bottom 20rpx
        background #fff
        .stuImage
            position relative
            padding 20rpx 0rpx
            width 200rpx
            margin-left 27.5rpx
            margin-bottom 27.5rpx
            box-shadow #efefef 0rpx 0rpx 10rpx 
            font-size 24rpx
            background #f1f1f1
            span
                width 190rpx
                margin-top 5rpx
                text-align center
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
            .images
                width 80rpx
                height 80rpx
                border-radius 50%
            .del
                width 48rpx
                height 48rpx
                position absolute
                top -10rpx
                right -10rpx
</style>
