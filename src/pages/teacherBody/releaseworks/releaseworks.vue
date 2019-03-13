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
            <img @click="addImage" src="/static/images/releaseWorks_add.png">
        </div>
    </div>
    <div style="height:20rpx;background:#f1f1f1"></div>
    <div class="footer">
        <ul>
            <li class="flex-x-sb">
                <span>允许补交作业次数
                <span style="font-size:24rpx;color:#707070">(设置为'0'则不允许补交)</span>
                </span>

                <view class="section">
                    <picker @change="timesrChange" :value="timesIndex" :range="times">
                        <view class="picker">
                        {{times[timesIndex]+"次"}}
                        </view>
                    </picker>
                </view>
            </li>
            <li class="flex-x-sb">
                <span>选择科目</span>
                <view class="section">
                    <picker @change="pickerChange" :value="index" :range="array">
                        <view class="picker">
                        {{array[index]}}
                        </view>
                    </picker>
                </view>
            </li>
            <li class="flex-x-sb">
                <span>同步到我的其他班群</span>
                <div @click="toClassGroup" style="display:flex;align-items:center;">
                    <span style="font-size:24rpx;color:#707070">Mighty等两个群</span>
                    <image style="width:32rpx;height:32rpx;margin-right:-20rpx" src="/static/images/back.png"/>
                </div>
            </li>
            <li class="flex-x-sb">
                <span>设置截止时间</span>
                <view class="section">
                    <picker
                        mode="date"
                        :value="timeData"
                        @change="dateChange"
                    >
                        <view class="picker">
                        {{timeData}}
                        </view>
                    </picker>
                </view>
                <view class="section">
                    <picker
                        mode="time"
                        :value="time"
                        @change="timeChange"
                    >
                        <view class="picker">
                        {{time}}
                        </view>
                    </picker>
                </view>
            </li>
        </ul>
    </div>
    <div style="height:20rpx;background:#f1f1f1"></div>
    <button class="btn" @click="sub">发布作业</button>
    </div>
</template>
<script>
import {formatNumber,formatTime} from '@/utils/index.js'
export default {
    data(){
        return{
            times:['0','1','2'],
            array:['数学','英语','语文','其他'],
            index:3,
            timesIndex:0,
            time:'18:30',
            timeData:'',
            title:'',
            content:''
        }
    },
    onLoad(){
        var dateTime = new Date();
        const year = dateTime.getFullYear();
        const month = dateTime.getMonth()+1;
        const date = dateTime.getDate();
        this.timeData = [year,month,date].map(formatNumber).join('/');
        console.log(this.timeData)

    },
    methods:{
        sub(){
            console.log(this.title,this.content)
        },
        timesrChange({ mp }){
            this.timesIndex = mp.detail.value
        },
        pickerChange({ mp }){
            this.index = mp.detail.value
        },
        switchChange({ mp }){

        },
        timeChange({ mp }){
            this.time = mp.detail.value
            console.log(this.time)
        },
        dateChange({ mp }){
            this.timeData = mp.detail.value.replace(/-/g,'/')
        },
        toClassGroup(){
            wx.navigateTo({
                url: '/pages/teacherBody/syncClass/main'
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
        ul
            padding 0rpx 0rpx 0rpx 20rpx
            li
                font-size 34rpx
                color #2c2c2c
                padding 10rpx 40rpx 10rpx 10rpx
                border-bottom 1rpx solid #f1f1f1
            .section
                font-size 30rpx
                color #707070
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
