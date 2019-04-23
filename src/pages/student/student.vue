<template>
    <div class="body">
      <div v-show="tabIndex == 0" >
        <quora></quora>
      </div>
      <div v-show="tabIndex == 1">
        <homeworkCenter></homeworkCenter>
      </div>
      <div v-show="tabIndex == 2" >
        <studentCenter ></studentCenter>
      </div>
      <i-tab-bar class="tabbar" :current="tabIndex" color="#64dcdb" @change="handleChange">
        <i-tab-bar-item key="0" icon="homepage" current-icon="homepage_fill" title="广场"></i-tab-bar-item>
        <i-tab-bar-item key="1" icon="computer" current-icon="computer_fill" title="作业"></i-tab-bar-item>
        <i-tab-bar-item key="2" icon="mine" current-icon="mine_fill" title="我的"></i-tab-bar-item>
      </i-tab-bar>
    </div>
</template>

<script>
import studentCenter from '@/components/studentCenter'
import homeworkCenter from '@/components/homeworkCenter'
import quora from '@/components/quora'

import { mapState, mapMutations } from 'vuex'
import { SET_STATUS,SET_TABINDEX,SET_TOKEN,SET_CURRENTPAGE} from '@/store/mutation-types'


export default {
  components:{
      studentCenter,
      homeworkCenter,
      quora,
  },
  data () {
    return {
        current:'0',
    }
  },
  computed: {
        ...mapState([   //分发store中的数据到当前组件
            'tabIndex',
            'currentPage'
        ])
    },
  methods:{
    ...mapMutations({
          setTabIndex : SET_TABINDEX,
    }),
    handleChange ({ mp }) {
        this.setTabIndex(mp.detail.key);
        console.log(this.currentPage)
    }

    
  },

  

}
</script>

<style lang="stylus" scoped>
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

