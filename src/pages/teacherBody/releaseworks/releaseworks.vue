<template>
    <div class="body">
    <div style="padding: 20rpx;">
        <div class="content">
            <input  class="input"  v-model="myform.title"  type="text" disabled="disabled">
            <textarea class="textarea" maxlength="200" v-model="myform.desc" placeholder="来吧,尽情地布置作业吧..." auto-focus show-confirm-bar></textarea>    
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
                <span>同步到我的其他班群</span>
                <div @click="toClassGroup" style="display:flex;align-items:center;">
                    <span style="font-size:24rpx;color:#707070">{{classLength?classLength+'个群':'同步班群'}}</span>
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
    <MyButton styleType="teacher" @click="sub">发布作业</MyButton>
    </div>
</template>
<script>
import MyButton  from '@/components/MyButton.vue'
import {formatNumber,formatTime} from '@/utils/index.js'
import host  from '../../../http/config'

import store from '../../../store/'


export default {
    components:{
      MyButton,
    },
    data(){
        return{
            times:['0','1','2'],
            timesIndex:0,
            time:'22:30',
            timeData:'',
            myform:{
                title:'',
                classId:'439382',
                content:'',
                subject:'其他',
                desc:'',
                endDate:'',
                classId:[],
            },
            tempFile:[],
            image:'',
            classLength:'0'

        }
    },
    onLoad(option){
        if(option.length){
            this.myform.classId = option;
            this.classLength = option.length;
            console.log(this.myform.classId )
        }else{
            //获取所有班群classId
            this.$api.getClassList({})
            .then((data)=>{
                this.classGroup = data
            })

            var dateTime = new Date();
            const year = dateTime.getFullYear();
            const month = dateTime.getMonth()+1;
            const date = dateTime.getDate();
            this.timeData = [year,month,date].map(formatNumber).join('-');
            this.myform.title = `${month}月${date}日 作业`
        }

    },
    changData:function(val){
        console.log(val)
        this.myform.classId = val
    },
    methods:{
        del(){
            this.tempFile.splice(0,1)
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
                                'type': 'homework'
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
            if(this.myform.classId.length==0){
                wx.showToast({
                    icon:"none",
                    title:'请选择同步的班级!'
                },1000)
                return 0;
            }
            // for(var val of this.myform){
            //     if(!val||val.length == 0){
            //         wx.showToast({
            //             icon:"none",
            //             title:'尚有信息未填!'
            //         },1000)
            //         return 0;
            //     }
            // }
            this.myform.image = this.tempFile;
            this.myform.endDate = this.timeData+' '+this.time+':00';
            console.log(this.myform)
            this.$api.releaseWorks(
                this.myform
            ).then((code) => {
                wx.navigateBack({
                    delta: 1
                })
            })
        },
        timesrChange({ mp }){
            this.timesIndex = mp.detail.value;
        },
       
        switchChange({ mp }){

        },
        timeChange({ mp }){
            this.time = mp.detail.value;
            console.log(this.time)
        },
        dateChange({ mp }){
            this.timeData = mp.detail.value.replace(/-/g,'-');
        },
        toClassGroup(){
            let data = JSON.stringify(this.classGroup)
            wx.navigateTo({
                url: '/pages/teacherBody/syncClass/main?data='+data
            })
        },
        
    },
    
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
