import Vue from 'vue'
import App from './quora'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    enablePullDownRefresh: true,
    navigationBarTitleText: '话题广场',
    navigationBarBackgroundColor: '#64dcdb',
    backgroundTextStyle: "dark",
  }
}

