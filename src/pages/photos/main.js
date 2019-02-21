import Vue from 'vue'
import App from './photos'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarTitleText: '上传照片',
        "disableScroll": true,
        navigationBarBackgroundColor: '#64dcdb'
    }

}