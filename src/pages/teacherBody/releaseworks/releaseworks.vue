<template>
    <div class="body">
    <div style="padding: 20rpx;">
        <div class="content">
            <input  class="input"  v-model="myform.title" placeholder="加个标题哟~" type="text" auto-focus @input="totast" :maxlength="maxlength">
            <textarea class="textarea" maxlength="200" v-model="myform.content" placeholder="来吧,尽情地布置作业吧..." auto-focus show-confirm-bar></textarea>    
        </div>
        <div class="flex-xf-yc image">
            <div v-if="image" class="flex-xf-yc imageFile" >
                <img class="images" mode="aspectFill" :src="image" >
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
                        {{myform.subject}}
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
import { devHost as host } from '../../../http/config'
import store from '../../../store/'


export default {
    data(){
        return{
            times:['0','1','2'],
            array:['数学','英语','语文','其他'],
            index:3,
            timesIndex:0,
            time:'22:30',
            timeData:'',
            myform:{
                title:'',
                classId:'439382',
                content:'',
                subject:'',
                endDate:''
            },
            maxlength:20,
            tempFile:[],
            image:'',

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
        del(){
            this.tempFile.splice(0,1)
            console.log("333")
        },
        totast({ mp }){
            if(mp.detail.value.length > this.maxlength){
                wx.showToast({
                    title: '标题超过20个字的限制',
                    icon: 'none',
                    duration: 1000
                })
            }
        },
        addImage(){
            var vm = this
            let counts = vm.tempFile.length;
            console.log(counts)
            if(counts<1){
                wx.chooseImage({
                    count: 1,
                    sizeType: ['original', 'compressed'],
                    sourceType: ['album', 'camera'],
                    success(res) {
                        wx.uploadFile({
                            url: `${host}/upload/image`, 
                            filePath: res.tempFilePaths[0],
                            name: 'file',
                            header:{
                                'Authorization':store.state.token,
                            },
                            formData:{
                                'type': 'post'
                            },
                            success: (res) => {
                                console.log(res)
                                var result = JSON.parse(res.data)
                                if(result.code == 0){
                                    wx.showToast({
                                        title: '图片上传成功',
                                        icon: 'success',
                                        duration: 2000
                                    })
                                    vm.image = host+result.data;
                                    vm.tempFile.push(result.data);
                                }else{
                                    wx.showToast({
                                        title: '上传图片失败',
                                        icon: 'none',
                                        duration: 2000
                                    }) 
                                }
                                
                            },
                                
                        })
                    }
                 })
            }else{
                wx.showToast({
                    title: '限制只能上传1张图片!',
                    icon: 'none',
                    duration: 2000
                })
            }
        },
        sub(){
            this.myform.map((item)=>{
                if(!item||item == undefined){
                    wx.showToast({
                        icon:"none",
                        title:'尚有信息未填!'
                    },1000)
                    return 0;
                }
            })
            this.myform.endDate = this.timeData+this.time
            this.$api.releaseWorks(
                this.myform
            ).then((code)=>{
                if(code == 0){
                    wx.redirectTo({
                        url:'/pages/teacherBody/worksManage/main'
                    })
                }
            })
            console.log(this.title,this.content)
        },
        timesrChange({ mp }){
            this.timesIndex = mp.detail.value;
        },
        pickerChange({ mp }){
            this.myform.subject = array[mp.detail.value];
        },
        switchChange({ mp }){

        },
        timeChange({ mp }){
            this.time = mp.detail.value;
            console.log(this.time)
        },
        dateChange({ mp }){
            this.timeData = mp.detail.value.replace(/-/g,'/');
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
