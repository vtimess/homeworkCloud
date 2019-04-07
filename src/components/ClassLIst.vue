<template>
    <div  class="grouplist" @click="classinfo">
        <div class="img">
            <img @error="error" :src="imgUrl">
        </div>
        <div class="info">
            <span>{{classData.className}}({{classData.teacherName}})</span>
            <li>班群号:{{classData.classId}} | {{classData.studentNum}}人</li>
        </div>
    </div>
</template>
<script>
import  host from '../http/config'

export default {
    props:{
        classData:Object
    },
    data() {
        return{
            defaulteImage:'/static/images/header.png',
            imgError:false
        }
    },
    computed: {
        imgUrl(){
            console.log(this.classData)
            if(!this.classData.classAvatarUrl || this.imgError){
                console.log('ddd')
                return this.defaulteImage
            }
            return `${host}${this.classData.classAvatarUrl}`
        },
    },
    methods: {
        classinfo: function(e){
            let that = this
            let index = e.currentTarget.dataset.index
            let classBean = JSON.stringify(that.data.classData[index])
            wx.navigateTo({
                url: '../classinfo/main?classBean=' + classBean,
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
.grouplist
    position relative
    height 160rpx
    background-color #fff
    margin-top 10rpx
    .img
        width 100rpx
        height 100rpx
        overflow hidden
        border-radius 50%
        margin 30rpx 20rpx 30rpx 60rpx
        float left
        img 
            width 100rpx
            height 100rpx
    .info
        width 500rpx
        height 100rpx
        padding-top 30rpx
        span
            color #707070
            font-size 34rpx
        li
            color #bfbfbf
            font-size 12px
            margin-top 14rpx

</style>
