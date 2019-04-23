import Vue from 'vue'
import App from './postDetail'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarTextStyle:"white",
        navigationBarTitleText: '帖子详情',
        navigationBarBackgroundColor: '#64dcdb',
        usingComponents: {
            "i-load-more": "/static/iView/load-more/index",
            "i-avatar":"/static/iView/avatar/index",
            "i-action-sheet": "/static/iView/action-sheet/index",
        }

    }
}
