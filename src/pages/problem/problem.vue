<template>
    <div class="problem">
        <ProblemList></ProblemList>
    </div>
</template>

<script>
import ProblemList from '@/components/problemList.vue'
export default {
    components:{
        ProblemList
    }
}
</script>
<style lang="stylus" scoped>
.problem
    position absolute
    top 0px
    left 0rpx
    bottom 0rpx
    right 0rpx
    background-color #f3f7f9
</style>