<template>
    <div class="body">
      <div>
      <div class="mainView" v-show="tabIndex == 0" key="0">
            <div>1</div>
      </div>
      <div class="mainView" v-show="tabIndex == 1" key="1">
            <MyCenter></MyCenter>
      </div>
      
      </div>
      <i-tab-bar class="tabbar" :current="current" color="#32333F" @change="handleChange">
        <i-tab-bar-item key="0" icon="homepage" current-icon="homepage_fill" title="广场"></i-tab-bar-item>
        <i-tab-bar-item key="1" icon="mine" current-icon="mine_fill" title="我的"></i-tab-bar-item>
      </i-tab-bar>
    </div>
</template>

<script>
import MyCenter from '@/components/teacherCenter'

export default {
  components:{
      MyCenter,
  },
  data () {
    return {
        current:'0',
        tabIndex:'0',
        text:"1",
        scrollTop: {
            scroll_top: 0,
            goTop_show: true
        },
        homeworkData:null,
        status:true,
        show:false
    }
  },
  onLoad(){
    wx.setNavigationBarTitle({
      title: '话题广场'
    })
  },
  created () {
  },
  computed: {
  },
  methods:{
    handleChange ({ mp }) {
        let key = mp.detail.key
        if(key == 0){
          wx.setNavigationBarTitle({
            title: '话题广场'
          })
        }else{
          wx.setNavigationBarTitle({
            title: '个人中心'
          })
        }
        this.tabIndex = key;
        this.current = key;
    }
    
  },

  

}
</script>

<style lang="stylus" scoped>
@import '../../../static/css/app.css'
.body
  width 100%
  height 100%
  background #fff
  .tabbar
    position fixed
    right 0
    left 0
    bottom 0

</style>
