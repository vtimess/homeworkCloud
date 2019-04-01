<template>
    <div class="body">
      <div v-show="tabIndex == 0" key="0">00
      </div>
      <div v-show="tabIndex == 1" key="1">
        <homeworkCenter></homeworkCenter>
      </div>
      <div v-show="tabIndex == 2" key="2">
        <studentCenter ></studentCenter>
      </div>
      <i-tab-bar class="tabbar" :current="current" color="#64dcdb" @change="handleChange">
        <i-tab-bar-item key="0" icon="homepage" current-icon="homepage_fill" title="广场"></i-tab-bar-item>
        <i-tab-bar-item key="1" icon="computer" current-icon="computer_fill" title="作业"></i-tab-bar-item>
        <i-tab-bar-item key="2" icon="mine" current-icon="mine_fill" title="我的"></i-tab-bar-item>
      </i-tab-bar>
    </div>
</template>

<script>
import MyButton from '@/components/MyButton'
import studentCenter from '@/components/studentCenter'
import homeworkCenter from '@/components/homeworkCenter'

import { mapState, mapMutations } from 'vuex'
import { SET_STATUS,SET_TABINDEX,SET_TOKEN} from '@/store/mutation-types'


export default {
  components:{
      MyButton,
      studentCenter,
      homeworkCenter,
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
  computed: {
        ...mapState([   //分发store中的数据到当前组件
            'tabIndex',
        ])
    },
  
  //onReachBottom: function () {
    //var vm = this;
    //   pageStatus: true
    // setTimeout(function () {
    //   vm.setData({
    //     pageNo: vm.data.pageNo + 1,
    //     list: vm.data.list.concat(vm.data.list2),
    //     pageStatus: false
    //   });
    // }, 2000);
  //},
  methods:{
    ...mapMutations({
          setTabIndex : SET_TABINDEX,
    }),
    handleChange ({ mp }) {
        this.tabIndex = mp.detail.key;
        this.current = mp.detail.key;
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

