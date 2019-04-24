import Vue from 'vue'
import App from './modify'

const app = new Vue(App)
app.$mount()

export default{
    config: {
        navigationBarBackgroundColor: '#32333F',
        navigationBarTextStyle:"white",
        backgroundTextStyle:'dark',
        navigationBarTitleText: '修改资料',
        
    }
    
}