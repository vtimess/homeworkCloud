import Vue from 'vue'
import App from './worksDetail'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '作业详情',
    }
    
}