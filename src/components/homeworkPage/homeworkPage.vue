<template>
    <div class="body">
      <div class="head">
        <swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" interval="4000" duration="600" 
        indicator-color="rgba(255, 255, 255, .3)" indicator-active-color="rgba(255, 255, 255, .8)">
          <block v-for="item in imgUrls" :key="item.index">
            <swiper-item>
              <img :src="item.src" class="slide-image" />
            </swiper-item>
          </block>
        </swiper>
      </div>
      <HomeworksList  v-for="homework in homeworkData" :key="homework.id" :homework="homework" ></HomeworksList>
      <div class="flex-xc nothing">
        <div class="flex-y">
          <img v-if="!homeworkData" src="/static/images/nothing.png"  @click="join" >
          <span class="tip">阿欧,还没有班群,快去加入吧！</span>
          <span class="tip">阿欧,尚未发布作业哦!</span>
        </div>
      </div>
      <div class="add">
        <img src="/static/images/add.png" @click="join">
      </div>
          <!-- <span class="classid" @click="classgroup">什么是班群号？</span> -->
      <!-- <div class="goTop" >
        <img src="/static/images/backtotop.png"  @click="goTop" >
      </div> -->
    </div>
</template>

<script>
import HomeworksList from '@/components/HomeworksList'
import MyButton from '@/components/MyButton'
export default {
  components:{
      HomeworksList,
      MyButton,
  },
  data () {
    return {
      imgUrls: [
      {src:'/static/images/first.jpg'},
      {src:'/static/images/second.jpg'},
      {src:'/static/images/third.jpg'}
    ],
    scrollTop: {
      scroll_top: 0,
      goTop_show: true
    },
      homeworkData:null,
      show:false
    }
  },
  onLoad(){
    // this.getData()
  },
  created () {
    this.getData()
  },
  methods: {
    getData:async function(){
       
      let result = await this.$http.get('/s/homework',{page:0,size:2})
      if(result){
        this.homeworkData = result
        if(result.length < 1){
            this.show = false
        }else{
          this.show = true
        }
      }
    },
    
    join:function(){
      wx.navigateTo({
        url:'/pages/search/main'
      })
    },
    classgroup:function(){
      wx.navigateTo({
        url:'/pages/classgroup/main'
      })
    },
    goTop:function(){
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 200
      })
    },
    
  },

  

}
</script>

<style lang="stylus" scoped>
@import '../../../static/css/app.css'
.body
  width 100%
  height auto
  .mainView
    margin-bottom 160rpx
  .head
    padding-bottom 30rpx
    .swiper
      .slide-image
        width 100%
        height 500rpx
  .nothing
    width 100%
    position absolute
    bottom 30%
    img
      width 256rpx
      height 256rpx
    .tip
      font-size 24rpx
      color #bfbfbf
    .classid
      text-decoration underline
      color #64dcdb
      font-size 30rpx
      margin-top 24rpx
  .add
    position fixed
    right 80rpx
    bottom 100rpx
    img
      width 64rpx
      height 64rpx
  .goTop
    position fixed
    bottom 120rpx
    right 80rpx
    width 64rpx
    height 64rpx
    img
      width 64rpx
      height 64rpx
</style>

