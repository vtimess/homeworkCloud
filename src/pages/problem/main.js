import Vue from 'vue'
import App from './problem'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarTitleText: '常见问题',
        navigationBarBackgroundColor: '#64dcdb'
    }
}
