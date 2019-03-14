import Vue from 'vue'
import App from './classGroup'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '班群列表',
        enablePullDownRefresh:true,
        
    }
    
}