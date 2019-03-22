<template>
    <img src="/static/images/welcome.png" >
</template>
<script>
import store from '../../store/'

export default {
    data(){
        return{

        }
    },
    onShow(){
        console.log(store.state.status)
        setTimeout(function(){
            if(store.state.status == 1){
                wx.reLaunch({
                url:'/pages/homework/main'
                })
            }
            else if(store.state.status == 2){
                wx.reLaunch({
                    url:'/pages/teacher/main'
                })
            }else{
                wx.reLaunch({
                    url:'/pages/welcome/main'
                })
            }
        },2000)
    },
    methods:{
        
    }
}
</script>
<style lang="stylus" scoped>
img 
    position absolute
    right 0
    top 0
    left 0
    bottom 0
    width 100%
    height 100%
</style>
