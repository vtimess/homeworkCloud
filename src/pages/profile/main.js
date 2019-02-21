import Vue from 'vue'
import App from './profile'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarTitleText: 'ta的个人资料',
        navigationBarBackgroundColor: '#64dcdb'

    }
}
