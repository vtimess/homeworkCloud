import Vue from 'vue'
import App from './studyCondition'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarTitleText: '学习状况',
        navigationBarBackgroundColor: '#64dcdb'
    }
}