import Vue from 'vue'
import App from './homeworkInfo'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarTitleText: '作业概览',
        navigationBarBackgroundColor: '#64dcdb'
    }
}