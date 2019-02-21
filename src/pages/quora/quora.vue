<template>

<div class="quora">
    <WaterFallView ref="callchild" :listData="listData" id='waterFallView' @click="click"></WaterFallView>
    <!-- <div class="flex-x nav" > -->
    <!-- <navbar v-for="item in tabData" :url="tabData.url" @change='getVal' :key="item.index" :Item="item" :sel='selected'></navbar> -->
    <!-- </div> -->
    <div class="add" @click="click">
        <img src="/static/images/edit.png" >
    </div>
   
    
</div>
</template>
<script>
import navbar from "@/components/navbar"
import WaterFallView from "@/components/WaterFallView"
export default {
onPullDownRefresh(){
    this.$refs.callchild.callchild(true,this.listData)
    // wx.stopPullDownRefresh()
},
onReachBottom() {   
    console.log("123456")
    this.$refs.callchild.callchild(true,this.listData)
    // let nextPage = this.page +1; //定义每一页page，下来刷新新的一页+1         
    // this.page = nextPage  //更新page         
    // this.$http.get('sell#!method=get').then((res)=>{         
    //     this.restaurant =[...res.data.data.restaurant,...this.restaurant]//请求的新数据，解构出来渲染页面         
    // }).catch((e)=>{ 
    //     console.log(e)         
    // })   
 },
components: {
    navbar,
    WaterFallView,
},
data(){
    return{
        selected:'../quora/main',
        tabData:[
                {
                    index:0,
                    name:'知乎',
                    url:'../quora/main',
                    imgUrl:'/static/images/home.png',
                    selectImgUrl:'/static/images/selectHome.png'
                },
                {
                    index:1,
                    name:'作业',
                    url:'../homework/main',
                    imgUrl:'/static/images/work.png',
                },
                {   
                    index:2,
                    name:'个人中心',
                    url:'../my/main',
                    imgUrl:'/static/images/own.png',
                    selectImgUrl:'/static/images/selectOwn.png'
                }
            ],
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
    getVal(res){
        this.selected = res
    }
},
 

}
</script>
<style lang="stylus" scoped>
@import '../../../static/css/app.css'
.quora
    width 100%
    height 100%
    background #f1f1f1
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