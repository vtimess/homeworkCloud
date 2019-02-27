<template>

<div class="quora">
    <WaterFallView ref="callchild" :listData="listData" id='waterFallView' @click="click"></WaterFallView>
    <div class="add" @click="click">
        <img src="/static/images/edit.png" >
    </div>
</div>
</template>
<script>
import WaterFallView from "@/components/WaterFallView"
import bottom from '@/components/bottom.vue'
export default {
    components:{
        bottom,
        WaterFallView,
    },
onPullDownRefresh(){
    this.$refs.callchild.callchild(true,this.listData)
    //wx.stopPullDownRefresh()
},
onReachBottom() {   
    console.log("123456")
    this.$refs.callchild.callchild(true,this.listData)  
 },
data(){
    return{
        listData:[
            {
                imgUrl:'/static/images/home.png',
                name:'知乎',
            },{
                imgUrl:'/static/images/home.png',
                name:'知乎',
            },{
                imgUrl:'/static/images/home.png',
                name:'知乎',
            },{
                imgUrl:'/static/images/home.png',
                name:'知乎',
            },{
                imgUrl:'/static/images/home.png',
                name:'知乎',
            }
        ]
    
    }
},
methods:{
},
 

}
</script>
<style lang="stylus" scoped>
@import '../../static/css/app.css'
.quora
    width 100%
    height 100%
    background #ff0000
    .add
        position fixed
        right 80rpx
        bottom 100rpx
        img
            width 64rpx
            height 64rpx
    .nav img 
        width 40rpx
        height 40rpx
        margin-bottom 10rpx
    .nav
        position fixed
        bottom 0
        left 0
        width 100%
        height 100rpx
        padding-bottom 10rpx
        background #fff
        font-size 20rpx
        color #515151
        align-items flex-end
</style>