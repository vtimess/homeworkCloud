<template>
    <div class="list">
        <ul>
            <li class="list-li" @click="click(Item.url)">
                <span>{{Item.name}}</span>
                <img class="img-li-img" src="/static/images/back.png"/>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props:{
        Item:Object,

    },
    data() {
        return {
        }
     },
    methods:{
        click(url){
            wx.navigateTo({
                url: url
            })
        }    
    },
    created() {
    },
}
</script>

<style lang="stylus" scoped>
.list
    width 100%
    height 90rpx
    margin-bottom 5rpx
    ul
        width 100%
        .list-li
            display flex
            align-items center
            padding 0 5%
            justify-content space-between
            height 80rpx
            color #707070
            span 
                line-height 80rpx
                font-size 28rpx
            .img-li-img
                width 24rpx
                height 24rpx

</style>
