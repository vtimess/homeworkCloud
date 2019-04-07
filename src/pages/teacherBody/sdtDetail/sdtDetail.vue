<template>
<div class="body">
    <div class="image">
        <swiper class="swiper"  circular="true" interval="4000" duration="600" @change="handChange">
          <block v-for="(item, index) in imgUrls" :key="index">
            <swiper-item>
              <img :src="item" class="slide-image" @click="preview(index)"/>
            </swiper-item>
          </block>
        </swiper>
        <span class="page">{{current}}/{{total}}</span>
    </div>
    <div class="flex-x-y footer">
        <input type="text" v-model="score" placeholder="请输入分数..." maxlength="3">
        <span @click="submit">评分</span>
    </div>
    <div v-if="next" class="next" @click="next">
        <span>已批改</span>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            imgUrls: [
                'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
                'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
                'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
            ],
            current:1,
            total:null,
            imgUrl:'/static/images/header.png',
            classId:'',
            score:'',
            next:false,
            title:'某某同学'
        }
    },
    onLoad(options){
        if(options){

        }
        wx.setNavigationBarTitle({
            title: this.title+'同学'
        })
        this.total = this.imgUrls.length;
    },
    methods: {
        handChange({mp:{detail}}){
            this.current = detail.current+1
        },
        preview(val){
            wx.previewImage({
                current: this.imgUrls[val], // 当前显示图片的http链接
                urls: this.imgUrls // 需要预览的图片http链接列表
            })
        },
        submit(){
            this.$api.updateClass({
                classId:this.classId,
                score:this.score,
                img:this.imgUrls,
            }).then(()=>{
                this.next = true;
            })
        },
        next(){
            this.$api.updateClass({
                classId:this.classId,
            }).then((data)=>{
                this.imgUrls = data.imgUrls;
                this.score = '';
                this.next = false;
                wx.setNavigationBarTitle({
                    title: this.title+'同学'
                })
            })
        }
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
    background #f1f1f1
    .image
        width 100%
        height 100%
        display flex
        align-items center
        .swiper
            width 100%
            max-height 100%
            .slide-image
                width 100%
                max-height 100%
    .page
        position absolute
        top 50rpx
        left 50%
        margin-left -20rpx
        width 40rpx
        text-align center
    .footer
        position fixed
        bottom 0rpx
        width 100%
        height 110rpx
        color #fff
        background #32333F
    .next
        position fixed
        bottom 0rpx
        width 100%
        height 110rpx
        color #fff
        text-align center
        line-height 110rpx
        background #32333F
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
            width 32rpx
            height 32rpx
            position absolute
            top 0rpx
            right 0rpx
</style>
