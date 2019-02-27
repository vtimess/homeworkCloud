<template>
    <div id="">
    <div class='tab-wrap'>
        <!--循环渲染出tab列表-->
        <div class='tab' v-for="(item,index) in tarList" :key="index" @click="toggleTab(index)">
            <div v-if="item.iconPath">
                <image :src="tabIndex==index?item.selectedIconPath:item.iconPath" :class='index==1?"round-btn":""'></image>
                <div>{{index == 1 ? '' :item.name}}</div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    props: {
        tabIndex: String
    },
    data(){
        return{
            // tarList: TABBAR,
            tarList:[{
                id: 0,
                name: '话题',
                iconPath:  '../../static/images/tab-home.png',
                selectedIconPath: '../../static/images/tab-home-on.png',
                url: ''
            },
            {
                id: 1,
                name: '作业',
                iconPath:  '../../static/images/work.png',
                selectedIconPath:  '../../static/images/work.png',
                url: ''
            },
            {
                id: 2,
                name: '我的',
                iconPath:  '../../static/images/tab-user.png',
                selectedIconPath:  '../../static/images/tab-user-on.png',
                url: ''
            },
            ]
        }
    },
    methods:{
        /**
         * 点击tab切换选中值
         */
        toggleTab(e) {
            let index  = e;
            this.tabIndex = index;
            console.log(index,666)
            // 子组件调起父组件
            this.$emit('toggleTab', index)
        }
    },
}
</script>
<style lang="stylus" scoped>
.tab-wrap 
    display flex
    flex-direction row
    justify-content space-around
    align-items center
    text-align center
    position fixed
    bottom 0
    left 0
    z-index 999
    width 100%
    background #fff
    color #999
    font-size 25rpx
    height 120rpx
    .tab 
        image 
            width 50rpx
            height 50rpx
        .round-btn 
            width 120rpx
            height 120rpx
            background transparent
            border-radius 50%
            margin-top -60rpx
            border 15rpx solid #fff

</style>
