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
      <div style="height:60rpx;background:#f1f1f1;">
        <i-notice-bar icon="systemprompt" loop speed="1000">
            2018年世界杯,将于6月14日至7月15日举行;2018年世界杯,将于6月14日至7月15日举行;
        </i-notice-bar>
      </div>
      <div class="homewrok">
        <div class="flex-xf-yc title">
          <span class="img"></span><span>全部功课</span>
        </div>
        <div class="list" @click="hwShow">
          <div class="header">
              <img src="/static/images/physics.png" />
              <span >欧阳老师</span>
              <!-- <span >{{homeworkData.teacherName || '欧阳老师'}}</span> -->
          </div>
          <div class="hr"></div>
          <div class="mid">
              <p>{{title}}</p>
              <!-- <p>{{homeworkData.description || '大家都是一家人'}}</p> -->
              <span>可提交</span>
          </div>
          <div class="footer">
              <img src="/static/images/clock.png"/>
              <time>2020/03/9 15:36{{date}} 截止 {{end}}</time>
          </div>
        </div>
        
        <!-- <HomeworksList  v-for="homework in homeworkData" :key="homework.id" :homework="homework" ></HomeworksList> -->
        <div v-if="homeworkData" class="flex-xc nothing">
          <div class="flex-y">
            <img  src="/static/images/nothing.png"  @click="join" >
            <span class="tip">阿欧,还没有班群,快去加入吧！</span>
            <span class="tip">阿欧,尚未发布作业哦!</span>
          </div>
        </div>
      </div>
      <view class="loading_box">
        <view class="loading_fade_circle"></view>
      </view>
      <div class="goTop" >
        <img src="/static/images/backtotop.png"  @click="goTop" >
      </div>
    </div>
</template>

<script>
import MyButton from '@/components/MyButton'
export default {
  components:{
      MyButton,
  },
  data () {
    return {
      tabIndex:1,
      imgUrls: [
        {src:'/static/images/first.jpg'},
        {src:'/static/images/second.jpg'},
        {src:'/static/images/third.jpg'}
      ],
      imgs:[
            {subject:'语文',img:'/static/images/chinese.png'},
            {subject:'数学',img:'/static/images/math.png'},
            {subject:'英语',img:'/static/images/english.png'},
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
        // end(){
        //     let nowtime = new Date()
        //     return nowtime > this.homeworkData.endTime ? '(已截止)':''
        // },
        // date(){
        //     return utils.formatTime(this.homework.endTime)
        // }
  },
  methods: {
    // toggleTab(e){
    //   this.tabIndex = e;
    //   console.log(this.tabIndex)
    // },
    hwShow:function(e){
      console.log(e)
      // wx.navigateTo({
      //   url:'/pages/homeworkInfo/main?listData='+this.listData
      // })
    },
    getData(){
      this.$api.gethomework({
        page:0,
        size:4
      }).then((data)=>{
        if(data){
          this.homeworkData = data
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

