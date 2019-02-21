import Vue from 'vue'
import App from './App'
import store from './store' 
import http from '@/utils/http'

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
      '^pages/quora/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarTitleText: 'HomeWork',
      navigationBarTextStyle: 'black',
    },
    tabBar: {
      color:"#707070",
      selectedColor:"#2c2c2c",//#64dcdb
      backgroundColor:"#fff",
    list:[
      {
        pagePath:"pages/quora/main",
        text:"话题广场",
        iconPath:"/static/images/homework.png",
        selectedIconPath:"/static/images/selectHomework.png"
      },
      {
        text:"云作业",
        pagePath:"pages/homework/main",
        iconPath:"/static/images/work.png",
        selectedIconPath:"/static/images/work.png"
      },
      {
        pagePath:"pages/my/main",
        text:"个人中心",
        iconPath:"/static/images/my.png",
        selectedIconPath:"/static/images/selectMy.png"

      }
    ]

    }

  }
}
