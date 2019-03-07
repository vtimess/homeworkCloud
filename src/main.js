import Vue from 'vue'
import App from './App'
import store from './store' 
import http from '@/utils/http'
import http from '@/http/api'

Vue.prototype.$api = api
Vue.prototype.$http=http

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$store=store;

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/homework/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarTitleText: 'HomeWork',
      navigationBarTextStyle: 'black',
    },
    // tabBar:{
    //   list:[
    //     {
    //       pagePath:"pages/quora/main",
    //       text:"话题"
    //     },
    //     {
    //       pagePath:"pages/homework/main",
    //       text:"作业"
    //     },
    //     {
    //       pagePath:"pages/my/main",
    //       text:"话题"
    //     }
    //   ]
    // }

  }
}
