<template>
    <div class="quora">
        <WaterFallView></WaterFallView>
        <!-- <WaterFallView v-for="item in listData" :key="item" :listData="item"></WaterFallView> -->
    </div>
</template>
<script>
import WaterFallView from "@/components/WaterFallView"
export default {
    components:{
        WaterFallView,

    },
onPullDownRefresh(){
    this.$refs.callchild.callchild(true,this.listData)
    //wx.stopPullDownRefresh()
},
// onReachBottom() {   
//     console.log("123456")
//     this.$refs.callchild.callchild(true,this.listData)  
//  },
onShow: function () {
    this.list2 = JSON.parse(JSON.stringify(this.list));
    console.log(this.list2,2)
},

onReachBottom: function () {
    var vm = this;
    vm.pageStatus = true
    setTimeout(function () {
        vm.pageNo = vm.pageNo + 1;
        var list =  JSON.parse(JSON.stringify(vm.list2));
        vm.list = vm.list.concat(list);
        vm.pageStatus = false;
    }, 2000);
},
data(){
    return{
        list:[
            {
                title: '/static/images/example0.png',
                name: '《虫师》',
                time:'2019/4/25 09:17'
            },
            {
                url: '/static/images/example1.png',
                name: '《loading》',
                time:'2019/4/25 09:17'
            },
            {
                url: '/static/images/example2.png',
                name: '《冰与火之歌》',
                time:'2019/4/25 09:17'
            },
            {
                url: '/static/images/example3.png',
                name: '《鹿丸》',
                time:'2019/4/25 09:17'
            },
            {
                url: '/static/images/example4.png',
                name: '《星空》',
                time:'2019/4/25 09:17'
            },
            {
                url: '/static/images/example0.png',
                name: '《虫师》',
                time:'2019/4/25 09:17'
            },
            {
                url: '/static/images/example1.png',
                name: '《loading》',
                time:'2019/4/25 09:17'
            },
            {
                url: '/static/images/example2.png',
                name: '《冰与火之歌》',
                time:'2019/4/25 09:17'
            },
            {
                url: '/static/images/example3.png',
                name: '《鹿丸》',
                time:'2019/4/25 09:17'
            },
            {
                url: '/static/images/example4.png',
                name: '《星空》',
                time:'2019/4/25 09:17'
            }
        ],
       
    
    }
},
methods:{
    
},
 

}
</script>
<style <style lang="stylus" scoped>
.quora
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    background #e6e6e6
    .add
        position fixed
        right 80rpx
        bottom 100rpx
        img
            width 64rpx
            height 64rpx



</style>