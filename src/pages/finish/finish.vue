<template>
    <div class="body">
        <div class="finish">
            <span>36同学已经完成</span>
            <img src="/static/images/finish.png"/>
        </div>
        <StudentList v-for="finishList in finishList" :key="finishList.Id" :finishList="finishList"></StudentList>
    </div>
</template>
<script>
import StudentList from '@/components/StudentList.vue'
export default {
    data() {
        return {
        }
    },
    components:{
        StudentList
    },
    onLoad(){
        this.finish()
    },
    methods:{
        finish:async function(){ 
            let result = await this.$http.get('/student/finish',{})
            if(result){
                this.finishList = result
            }
        },
    }
    
}
</script>
<style lang="stylus" scoped>
.body
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    .finish
        position relative
        margin-top 40rpx
        margin-bottom 40rpx
        img 
            width 100%
            height 40rpx
            position absolute
            top 5rpx
            left 0
        span
            height 20rpx
            display block
            text-align center
</style>
