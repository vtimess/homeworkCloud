<template>
    <div class="body">
        <div class="time">
            <time>{{homeworkData.createTime}} 布置</time>
            <time>{{homeworkData.endTime}} 截止{{homeworkData.end?"(已截至)":""}}</time>
            <span class="object">{{homeworkData.subject}}训练</span>
        </div>
        <div class="works">
            <p>作业详情: </p>
            <li>{{homeworkData.desc}}</li>
            <li v-for="(item, index) in homeworkData.images" :key="index">
                <img v-show="item" style="width:300rpx;height:300rpx;" :src="host+item" ></li>
        </div>
        <!-- <div class="finish">
            <span v-if="!status" >还未有同学完成</span>
            <span v-if="status" @click="finished">36同学已经完成</span>
            <img src="/static/images/finish.png"/>
        </div> -->
        <view class="student" v-show="true" slot="content">
            <i-collapse name="name1" >
            <i-collapse-item :title="unCorrect" name="name1">
                <view slot="content">
                     <div class="flex-x-m" v-for="(item, index) in homeworkData.submitImages" :key="index">
                        <img style="width:200rpx;height:200rpx;" :src="item" @click="preview(index)" >
                    </div>
                </view>
            </i-collapse-item>
            <i-collapse-item  :title="correct" name="name2">
                <view slot="content">
                     <div class="flex-x-m" v-for="(item, index) in homeworkData.correctionImages" :key="index">
                        <img style="width:200rpx;height:200rpx;" :src="item" @click="previewNO(index)">
                    </div>
                </view>
            </i-collapse-item>
            </i-collapse>
        </view>
        <div class="footer">
            <button class="sub" @click="submit">{{homeworkData.state == 0?"未提交":homeworkData.state ==2?"已批改":homeworkData.end?"已截至":"未批改"}}</button>
        </div>
    </div>
</template>
<script>
import utils from '@/utils/'
import host  from '../../http/config'

export default {
    
    data() {
        return {
            status:false,
            homeworkData:{},
            correct:"已批改作业",
            unCorrect:"已提交作业",
            host:host,
            button:[
                // 提交作业
                // 重新提交
                // 已截止
                // 老师视频讲解
            ]
        }
    },
    
    onLoad(options){
        Object.assign(this.$data, this.$options.data())

        if(options){
            this.id =  JSON.parse(options.homeworkData).id
            this.getData(this.id)
        }else{
            this.getData(this.id)
        }
    },
    methods:{
        getData(val){
            this.$api.getWkDetailS({
                homeworkId:val
            }).then((data)=>{

                var list = data.submitImages&&data.submitImages.map( item =>{
                    return host+ item;
                })
                var list2 = data.correctionImages&&data.correctionImages.map( item =>{
                    return host+ item;
                })
                data.submitImages = list
                data.correctionImages = list2
                this.homeworkData = data

                console.log(this.homeworkData)
            }).catch(code=>{

            })
        },
        preview(val){
            wx.previewImage({
                current: this.homeworkData.submitImages[val], // 当前显示图片的http链接
                urls: this.homeworkData.submitImages // 需要预览的图片http链接列表
            })
        },
        previewNO(val){
            wx.previewImage({
                current: this.homeworkData.correctionImages[val], // 当前显示图片的http链接
                urls: this.homeworkData.correctionImages // 需要预览的图片http链接列表
            })
        },
        finished(){
            wx.navigateTo({
                url: '../finish/main'
            })
        },
        submit(){
            if(this.homeworkData.state==0&&!this.homeworkData.end){
                wx.navigateTo({
                    url: '../photos/main?id='+this.id
                })
            }
            
        }
    }    
}
</script>
<style lang="stylus" scoped>
.body
    width 100%
    height auto
    .time
        position relative
        height 100rpx
        font-size 30rpx
        padding 20rpx
        color #515151 
        background-color #f3f4f5
        .object
            position absolute
            width 150rpx
            height 60rpx
            text-align center
            line-height 60rpx
            right 50rpx
            top 50%
            margin-top -30rpx
            color #fff
            border-radius 10rpx
            background-color #64dcdb
    .works
        p
            font-size 30rpx
            letter-spacing 0.1em
            color #707070
            margin 20rpx
        li
            font-size 28rpx
            color #515151
            margin 5rpx 140rpx
    .finish
        position relative
        margin-top 40rpx
        margin-bottom 40rpx
        img 
            width 100%
            height 40rpx
            position absolute
            top 5rpx
            left 0
        span
            display block
            text-align center
    .footer
        height 110rpx
        position fixed
        bottom 20rpx
        left 0
        right 0
        background-color #fff
        padding-top 10rpx
        button
            height 100rpx
            margin 20rpx 
            background-color #ff0000
            color #fff
            border-radius 10rpx
    .student
        padding-top 20rpx
        padding-bottom 50rpx
        background #fff
</style>
