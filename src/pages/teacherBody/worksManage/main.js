import Vue from 'vue'
import App from './worksManage'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '作业管理',
       
    }
    
}