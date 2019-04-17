import Vue from 'vue'
import App from './App'
import store from './store'
import '../static/css/app.wxss' 
// import http from '@/utils/http'
import api from '@/http/api'

Vue.prototype.$api = api
// Vue.prototype.$http=http

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
      '^pages/loading/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarTitleText: 'HEO作业云',
      navigationBarTextStyle: 'black',
    },
    // tabBar:{
    //   selectedColor:'#707070',
    //   list:[
    //     {
    //       pagePath:"pages/quora/main",
    //       text:"话题",
    //       iconPath:  '/static/images/tab-home.png',
    //       selectedIconPath: '/static/images/tab-home-on.png'
    //     },
    //     {
    //       iconPath:  '/static/images/tab-home.png',
    //       selectedIconPath: '/static/images/tab-home-on.png',
    //       pagePath:"pages/homework/main",
    //       text:"作业"
          
    //     },
    //     {
    //       iconPath:  '/static/images/tab-user.png',
    //       selectedIconPath:  '/static/images/tab-user-on.png',
    //       pagePath:"pages/my/main",
    //       text:"个人中心"
    //     }
    //   ]
    // }

  }
}
