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
      <div class="flex-x-y navbar">
        <li>签到</li>
        <li>我的帖子</li>
        <li @click="join">加入班群</li>
      </div>
      <i-notice-bar icon="systemprompt" loop="true" speed="2000">
        请尽快完善个人信息，以便老师一眼识别到你！
      </i-notice-bar>
      <div v-if="false" style="height:60rpx;background:#f1f1f1;">
      </div>
      <div class="homewrok">
        <div class="flex-xf-yc title">
          <span class="img"></span><span>全部功课</span>
        </div>
        <div class="list" v-for="(item, index) in homeworkData" :key="index" @click="hwShow(index)">
          <div class="header">
              <img src="/static/images/physics.png" />
              <span >{{item.teacherName}}</span>
          </div>
          <div class="hr"></div>
          <div class="mid">
              <p>{{item.desc}}</p>
              <span>{{item.status=='-1'?'未提交':'已提交'}}</span>
          </div>
          <div class="footer">
              <img src="/static/images/clock.png"/>
              <time>{{item.endTime}} 截止 {{item.end}}</time>
          </div>
        </div>
        
        <div v-if="!homeworkData" class="flex-xc nothing">
          <div class="flex-y">
            <img  src="/static/images/nothing.png"  @click="join" >
            <span class="tip">阿欧,还没有班群,快去加入吧！</span>
            <span class="tip">阿欧,尚未发布作业哦!</span>
          </div>
        </div>
      </div>
      <!-- <view class="loading_box">
        <view class="loading_fade_circle"></view>
      </view> -->
      <div class="goTop" >
        <img src="/static/images/backtotop.png"  @click="goTop" >
      </div>
    </div>
</template>

<script>
import MyButton from '@/components/MyButton'
import {formatNumber,formatTime} from '@/utils/index.js'

export default {
  components:{
      MyButton,
  },
  data () {
    return {
      tabIndex:1,
      imgUrls: [
        {src:'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640'},
        {src:'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640'},
        {src:'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'}
      ],
      imgs:[
            {subject:'化学',img:'/static/images/chemistry.png'},
            {subject:'物理',img:'/static/images/physics.png'},
            {subject:'生物',img:'/static/images/biology.png'},
            {subject:'地理',img:'/static/images/geography.png'},
            {subject:'其他',img:'/static/images/subject.png'}
        ],
      scrollTop: {
        scroll_top: 0,
        goTop_show: true
      },
      homeworkData:null,
      title:"#RNG超话#2019年LOL世界赛决赛RNG 3:0 GRF 完虐!",
      status:true,
      show:false
    }
  },
  onLoad(){
    this.$nextTick(() => {
        this.getData();
    });
  },
  computed: {
       
  },
  methods: {
    // toggleTab(e){
    //   this.tabIndex = e;
    //   console.log(this.tabIndex)
    // },
    hwShow(val){
      console.log(this.homeworkData[val])
      let data = JSON.stringify(this.homeworkData[val])
      wx.navigateTo({
        url:'/pages/homeworkInfo/main?homeworkData='+data
      })
    },
    getData(){
      this.$api.gethomework({
        page:0,
        size:4
      }).then((data)=>{
        console.log(data)
        if(data.data.length){
          console.log(data,666)
          let nowtime = new Date();

          data.data.map((item)=>{
            if(item.endTime){
              item.end = nowtime > item.endTime ? '(已截止)':'';
              item.endTime = formatTime(item.endTime);
              item.beginTime = formatTime(item.beginTime);
            }
          })
          this.homeworkData = data.data
          console.log(this.homeworkData )

          this.show = false
        }else{
          this.show = true
        }
      })
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
@import '../../static/css/app.css'
.body
  width 100%
  height 100%
  background #fff
  .mainView
    margin-bottom 160rpx
  .head
    .swiper
      .slide-image
        width 100%
        height 500rpx
  .navbar
    height 100rpx
    background #fff
    font-size 32rpx
  .homewrok
    padding-bottom 300rpx
    .title
      color #2c2c2c
      font-size 28rpx
      padding 20rpx 
      .img
        margin-right 20rpx
        width 6rpx
        height 36rpx
        border-radius 3rpx
        background #64dcdb
    .list
      height auto
      margin 25rpx 30rpx
      background-color #fff
      border-radius 16rpx
      padding-bottom 20rpx
      box-shadow: 4rpx 4rpx 5rpx rgba(100, 255, 255, 0.3);
      .header
          height 76rpx
          img
              width 64rpx
              height 64rpx
              margin 6rpx
              float left
          span
              height 76rpx
              line-height 76rpx
              font-size 28rpx
      .hr
          border-bottom 1rpx solid #f3f4f5
          margin 0rpx 20rpx
      .mid
          height auto
          p
              width 345rpx
              font-size 30rpx
              margin-left 30rpx
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              line-height 124rpx
              float left
          span
              width 100rpx
              height 60rpx
              margin 0rpx 107rpx
              font-size 30rpx
              line-height 184rpx
              color #ff0000
              display inline
      .footer
          img
              width 30rpx
              height 30rpx
              float left
              margin-left 15rpx
              margin-right 10rpx
          time
              font-size 24rpx
              color #cdcdcd
    .nothing
      width 100%
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
  .loading_box
    width 100%
    text-align center
    padding 100rpx 0
    .loading_fade_circle
      width 30rpx
      height 30rpx
      background #1ab394
      border-radius 50%
      animation fading_circle 1s ease-out infinite alternate
        // @keyframes fading_circle
        //   0%
        //     transform: scale(1.5)
        //     opacity: 0.2
        //   100%  
        //     transform scale(0.1)
        //     opacity 1
      

</style>

