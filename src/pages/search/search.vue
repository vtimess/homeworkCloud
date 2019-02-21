<template>
    <div class="search">
        <div class="search-input">
            <input 
              class="search-in"
              v-model="classId"
              type="number" 
              placeholder="请输入6位数班群号"
              autofocus="autofocus"
              required="required"
              maxlength="6"/>
              <a  v-if="classId.length > 0" @click="setValue"  class="clear-input">
              <img src="/static/images/del.png"/></a>
             <span></span>
            <button class="search-btn" plain="true" focus="true" @click="search">搜索</button>    
        </div>
        <div v-if="classInfo" class="grouplist">
            <div class="img">
                <img @error="error" :src="imgUrl">
            </div>
            <div class="info">
                <span>{{classInfo.teacherName}}</span>
                <li>班群号:{{classInfo.classId}} | {{classInfo.joinNumber}}人</li>
            </div>
            <button plain="true" @click="joinin">{{joinState}}</button>
        </div>
        <div class="flex-xc nothing">
        <div class="flex-y">
          <img v-if="!classInfo" src="/static/images/searchTip.png"  @click="join" >
          <span class="classid" @click="classgroup">什么是班群号？</span>
        </div>
      </div>
    </div>
</template>

<script>
import config from '@/config/index'
export default {
    data() {
        return {
            classId:"",
            classInfo:null,
            defaulteImage:'/static/images/header.png',
            imgError:false,
            State:''
        }
     },
    computed: {
        imgUrl(){
            if(!this.classInfo || this.imgError){
                return this.defaulteImage
            }
            return config.host+this.classInfo.avatarUrl
        },
        joinState(){
            this.State = this.classInfo&&this.classInfo.status===0?'加入':'已加入'
            return this.State
        }
    },
    methods:{
        error(e){
           this.imgError = true
        },
        setValue(){
            this.classId = ''
            this.classInfo = null
        },
        async search(){
            let result = await this.$http.get('/student/class',{
                classId:this.classId
            })
            console.log(result)
            if(result){
                this.classInfo = result
                console.log(result)
            }
        },
        async joinin(){
            if(this.State === '已加入'){
                wx.showToast({
                    title:'不能重复加入',
                    icon:'none'
                }), setTimeout(function(){
                    wx.hideToast()
                },500)
                return 0
            }
            
            let result = await this.$http.put('/student/class',{
                classId:this.classId
            })
            if(result){
                if(result.code == 0){
                    this.classInfo.status=1
                    wx.showToast({
                        title:'成功'
                    }),
                    setTimeout(function(){
                        wx.hideToast()
                    },500)
                console.log("",result)
                }else{
                    console.log("22",result)
                }
                 
            }
        }
    }

}
</script>
<style lang="stylus" scoped>
@import '../../../static/css/app.css'
.search
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    background-color #f3f7f9
    .search-input
        width 670rpx
        height 80rpx
        background-color #ffffff
        border-radius 8rpx
        margin 40rpx auto
        .search-in
            float left
            font-size 28rpx
            padding-top 10rpx
            margin-left 10rpx
            width 480rpx
            height 60rpx
        .search-in:valid
            .clear-input
                display block
        img
            position absolute
            width 36rpx
            height 36rpx
            margin-top 20rpx
        span
            width 1rpx
            height 60rpx
            border 1rpx solid #eee
            margin-left 44rpx
        .search-btn
            display inline
            line-height 80rpx
            margin-left 10rpx
            font-size 30rpx
            width 60rpx
            height 60rpx
            color #707070
            border none
    .grouplist
        position relative
        height 160rpx
        background-color #fff
        border-radius 8rpx
        .img 
            width 100rox
            height 100rpx
            margin 30rpx 20rpx
            overflow hidden
            float left 
            border-radius 50%
            img 
                width 100rpx
                height 100rpx
        .info
            width 400rpx
            height 100rpx
            padding-top 30rpx
            span
                color #707070
                margin-left 10rpx
            li
                color #bfbfbf
                font-size 12px
                margin-top 10rpx
        button
            position absolute
            top 0
            bottom 0
            right 50rpx
            color #64dcdb
            line-height 160rpx
            font-size 34rpx
            border none
    .nothing
        width 100%
        position absolute
        bottom 40%
        img
            width 256rpx
            height 256rpx
        .tip
            font-size 24rpx
            color #bfbfbf
        .classid
            text-decoration underline
            color #bfbfbf
            font-size 30rpx
            margin-top 10rpx

</style>
