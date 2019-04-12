import Vue from 'vue'
import App from './worksDetail'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarTitleText: '作业详情',
        navigationBarBackgroundColor: '#32333F',
        navigationBarTextStyle:"white",
        usingComponents: {
            "i-cell-group": "/static/iView/cell-group/index",
            "i-cell": "/static/iView/cell/index",
            "i-collapse": "/static/iView/collapse/index",
            "i-collapse-item": "/static/iView/collapse-item/index",
            "i-avatar":"/static/iView/avatar/index",
        }
    }
    
}