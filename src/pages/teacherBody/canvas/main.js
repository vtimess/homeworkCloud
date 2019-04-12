import Vue from 'vue'
import App from './canvas'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '绘图',
    }
    
}