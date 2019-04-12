<template>
    <div class="body">
        <div class="flex-yf head">
            <i-cell-group>
                <i-cell title="作业名称" :value="Detail.startDate+' 作业'"></i-cell>
                <i-cell title="截止时间" :value="Detail.endDate"></i-cell>
            </i-cell-group>
            <i-collapse-item v-if="1" title="作业详情" name="name1">
                <view slot="content" class="flex-yf">
                    <span>{{Detail.desc}}</span>
                    <img style="width:200rpx;height:200rpx;" :src="Detail.img">
                </view>
            </i-collapse-item>
        </div>
        <div class="flex-yf mid">
            <i-cell-group>
                <i-cell title="正确率" :value="Detail.rightBl+'%'"></i-cell>
                <i-cell title="提交情况" :value="Detail.submitBl+'已提交'"></i-cell>
                <i-cell title="批改情况" :value="Detail.correctBl+'已批改'"></i-cell>
            </i-cell-group>
        </div>
        <view class="student"  slot="content">
            <i-collapse name="name1" accordion>
            <i-collapse-item :title="unCorrect" name="name1">
                <view slot="content">
                     <div class="flex-x-m" v-for="(item, index) in Detail.unCorrectStudent" :key="index">
                        <li  class="flex-y stuImage" @click="toStudent(item.id,item.name,index)">
                            <avatar :src="item.avatar" size="default" ></avatar>
                            <span>{{item.name}}</span>
                        </li>
                    </div>
                </view>
            </i-collapse-item>
            <i-collapse-item  :title="correct" name="name2">
                <view slot="content">
                     <div class="flex-x-m" v-for="(item, index) in Detail.correctStudent" :key="index">
                        <li  class="flex-y stuImage" >
                            <avatar :src="item.avatar" size="default" ></avatar>
                            <span>{{item.name}}</span>
                        </li>
                    </div>
                </view>
            </i-collapse-item>
            </i-collapse>
            
        </view>
        
    </div>
</template>
<script>
import host  from '../../../http/config'
import avatar from '@/components/lk-avatar'

export default {
    components:{
      avatar
    },
    data(){
        return{
            correct:'已批改',
            unCorrect:'未批改',
            Detail:[],
            unCorrectStudent:[],
            correctStudent:[],
        }
    },
    onLoad(options){
        if(options){
            this.getdata(options.id)
        }
    },
    methods:{
        getdata(val){
            this.$api.getWkDetailT(
                val
            ).then(data =>{
                this.Detail = data
                this.Detail.img = `${host}${data.img}`
                console.log(this.Detail)
            }).catch(code=>{

            })
        },
        toStudent(id,name,index){
            let param = {};
            param.homeworkId = this.Detail.id;
            param.userIdList = this.Detail.unCorrectStudent;
            param.name = name;
            param.id = id;
            param.index = index;

            wx.navigateTo({
                url: '/pages/teacherBody/sdtDetail/main?param='+JSON.stringify(param)
            })
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
