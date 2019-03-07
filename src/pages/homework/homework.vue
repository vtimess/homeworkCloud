<template>
    <div class="body">
      <!-- <div>
      <div class="mainView" v-if="tabIndex == 0" key="0">
        <quorapage ></quorapage>
      </div>
      <div class="mainView" v-if="tabIndex == 1" key="1">
        <homeworkpage></homeworkpage>
      </div>
      <div class="mainView" v-if="tabIndex == 2" key="2">
        <mypage></mypage>
      </div>
      </div> -->
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
        <li>微视频</li>
      </div>
      <div style="height:20rpx;background:#f1f1f1;"></div>
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
        <div class="flex-xc nothing">
          <div class="flex-y">
            <img v-if="!homeworkData" src="/static/images/nothing.png"  @click="join" >
            <span class="tip">阿欧,还没有班群,快去加入吧！</span>
            <span class="tip">阿欧,尚未发布作业哦!</span>
          </div>
        </div>
      </div>
      
      <div class="add">
        <img src="/static/images/add.png" @click="join">
      </div>
          <!-- <span class="classid" @click="classgroup">什么是班群号？</span> -->
      <!-- <div class="goTop" >
        <img src="/static/images/backtotop.png"  @click="goTop" >
      </div> -->
    <!-- <bottom :tabIndex="tabIndex" @toggleTab="toggleTab"></bottom> -->
    </div>
</template>

<script>
import HomeworksList from '@/components/HomeworksList'
import bottom from '@/components/bottom.vue'
import quorapage from '@/components/quorapage.vue'
import homeworkpage from '@/components/homeworkpage/homeworkpage.vue'
import mypage from '@/components/mypage.vue'
import MyButton from '@/components/MyButton'
export default {
  components:{
      HomeworksList,
      bottom,
      MyButton,
      quorapage,
      homeworkpage,
      mypage
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
      title:"#RNG超话#2020年LOL世界赛决赛RNG 3:0 GRF 完虐!",
      status:true,
      show:false
    }
  },
  onLoad(){
    this.getData()
  },
  created () {
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
    toggleTab(e){
      this.tabIndex = e;
      console.log(this.tabIndex)
    },
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
</style>

