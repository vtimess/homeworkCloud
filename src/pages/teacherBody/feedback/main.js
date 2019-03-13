import Vue from 'vue'
import App from './feedback'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '意见反馈',
        
    }
    
}