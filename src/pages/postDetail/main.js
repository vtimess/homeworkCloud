import Vue from 'vue'
import App from './postDetail'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarTextStyle:"white",
        navigationBarTitleText: '帖子详情',
        navigationBarBackgroundColor: '#64dcdb'

    }
}
