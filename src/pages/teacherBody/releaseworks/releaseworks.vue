<template>
    <div class="body">
    <div style="padding: 20rpx;">
        <div class="content">
            <input class="input"  v-model="title" placeholder="加个标题哟~" type="text" auto-focus @input="totast" :maxlength="maxlength">
            <textarea class="textarea" v-model="content" placeholder="来吧,尽情地布置作业吧..." auto-focus show-confirm-bar></textarea>    
        </div>
        <div class="flex-xf-yc image">
            <div class="flex-xf-yc imageFile" v-for="(item, index) in imageList" :key="index">
                <img class="images" mode="aspectFill" :src="item" >
                <img @click="del(index)" class="del" src="/static/images/image_del.png">
            </div>
            <img @click="addImage" src="/static/images/release_add.png">
        </div>
    </div>
    <div style="height:20rpx;background:#f1f1f1"></div>
    <div class="flex-x-sb footer">
        <ul>
            <li>
                <span>最多允许补交作业次数</span>
                <input type="text">
            </li>
            <li>
                <span>科目</span>
                <view class="section">
                    <picker @change="pickerChange" :value="index" :range="array">
                        <view class="picker">
                        {{array[index]}}
                        </view>
                    </picker>
                </view>
            </li>
            <li>
                <span>同步到我的其他班群</span>
            </li>
            <li>
                <span>设置截止时间</span>
                <!-- <view class="body-view">
                    <switch checked @change="switchChange" />
                </view> -->
                <view class="section">
                    <picker
                        mode="date"
                        :value="timeData"
                        start="2015-09-01"
                        end="2017-09-01"
                        @change="dateChange"
                    >
                        <view class="picker">
                        {{timeData}}
                        </view>
                    </picker>
                </view>
            </li>
        </ul>
    </div>
    <button class="btn" @click="sub">发布作业</button>
    </div>
</template>
<script>
import { formatTime } from '@/utils/index.js'
export default {
    data(){
        return{
            array:['数学','英语','语文','其他'],
            index:3,
            timeData:'asdsad',
        }
    },
    methods:{
        pickerChange({ mp }){
            this.index = mp.detail.value
        },
        switchChange({ mp }){

        },
        dateChange({ mp }){
            var datatime = new Date()
            console.log(formatTime(datatime))
        }
    }
}
</script>
<style lang="stylus" scoped>
.body
    position absolute
    top 0rpx
    left 0rpx
    right 0rpx
    bottom 0rpx
    background #fff
    .content
        padding-left 10rpx
        padding-right 10rpx
        .input
            font-size 32rpx
            font-weight bold
            margin-bottom 20rpx
            border-bottom 1rpx solid #f1f1f1
        .textarea
            padding-left 5rpx
            font-size 30rpx
    .image
        padding-bottom 80rpx
        padding-left 10rpx
        .imageFile
            position relative
            margin-right 20rpx
            .images
                width 154rpx
                height 160rpx
                border-radius 10rpx
            .del
                width 32rpx
                height 32rpx
                position absolute
                top -5rpx
                right -5rpx
        img 
            width 154rpx
            height 160rpx
    .footer
        margin-top 10rpx
        span
            padding 10rpx 20rpx 10rpx 20rpx
            color #2c2c2c
            font-size 28rpx
    .btn
        position fixed
        left 20rpx
        right 20rpx
        bottom 10rpx
        color #B22222
        font-weight 580
    .btn::after
        border none
</style>
