import Vue from 'vue'
import App from './homeworkPage/homeworkPage'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarTitleText: '作业',
        navigationBarBackgroundColor: '#ff0000',
    }
}