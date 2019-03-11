import Vue from 'vue'
import App from './releaseworks'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '布置作业',
    }
    
}