import Vue from 'vue'
import App from './learnChart'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarBackgroundColor: '#32333F',
        navigationBarTextStyle:"white",
        backgroundTextStyle:'dark',
        navigationBarTitleText: '成绩图表',
        usingComponents: {
            'ec-canvas': '/static/ec-canvas/ec-canvas'
        }
    }
    
}