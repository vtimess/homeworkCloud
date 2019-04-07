<template>
    <div class="body">
      <div>
      <div class="mainView" v-show="tabIndex == 0" key="0">
            <div>1</div>
      </div>
      <div class="mainView" v-show="tabIndex == 1" key="1">
            <classGroup></classGroup>
      </div>
      <div class="mainView" v-show="tabIndex == 2" key="2">
            <MyCenter></MyCenter>
      </div>
      </div>
      <i-tab-bar class="tabbar" :current="current" color="#32333F" @change="handleChange">
        <i-tab-bar-item key="0" icon="homepage" current-icon="homepage_fill" title="广场"></i-tab-bar-item>
        <i-tab-bar-item key="1" icon="computer" current-icon="computer_fill" title="班群"></i-tab-bar-item>
        <i-tab-bar-item key="2" icon="mine" current-icon="mine_fill" title="我的"></i-tab-bar-item>
      </i-tab-bar>
    </div>
</template>

<script>
import MyCenter from '@/components/teacherCenter'
import classGroup from '@/components/classGroup'

import { mapState, mapMutations } from 'vuex'
import { SET_STATUS,SET_TABINDEX,SET_TOKEN} from '@/store/mutation-types'
export default {
  components:{
      MyCenter,
      classGroup,
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
  computed: {
    ...mapState([   //分发store中的数据到当前组件
            'tabIndex',
        ])
  },
  methods:{
    ...mapMutations({
          setTabIndex : SET_TABINDEX,
    }),
    handleChange ({ mp }) {
        let key = mp.detail.key
        if(key == 0){
          wx.setNavigationBarTitle({
            title: '话题广场'
          })
        }else if(key == 1){
          wx.setNavigationBarTitle({
            title: 'HEO'
          })
        }else{
          wx.setNavigationBarTitle({
            title: '个人中心'
          })
        }
        this.tabIndex = key;
        this.current = key;
        this.setTabIndex(mp.detail.key);
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
