<template>
    <div class="body">
      <div>
      <div class="mainView" v-if="tabIndex == 0" key="0">
            <div>0</div>
      </div>
      <div class="mainView" v-if="tabIndex == 1" key="1">
            <div>1</div>
      </div>
      <div class="mainView" v-if="tabIndex == 2" key="2">
            <div>2</div>
      </div>
      </div>
      <i-tab-bar class="tabbar" :current="current" color="#64dcdb" @change="handleChange">
        <i-tab-bar-item key="0" icon="homepage" current-icon="homepage_fill" title="广场"></i-tab-bar-item>
        <i-tab-bar-item key="1" icon="group" current-icon="group_fill" title="作业"></i-tab-bar-item>
        <i-tab-bar-item key="2" icon="mine" current-icon="remind_fill" title="我的"></i-tab-bar-item>
      </i-tab-bar>
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
  },
  created () {
  },
  computed: {
  },
  methods:{
    handleChange ({ mp }) {
        this.tabIndex = mp.detail.key;
        this.current = mp.detail.key;
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
    position absolute
    right 0
    left 0
    bottom 0

</style>

