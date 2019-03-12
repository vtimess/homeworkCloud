<template>
    <div class="body">
        <div style="margin-top:20rpx"></div>
        <i-card title="刘jj的小弟"  extra="额外内容"  thumb="/static/images/headimg.png">
            <view slot="footer">
                <span>创建时间：2019-03-18\t</span>
                <span>班群人数: 32 人</span>
            </view>
        </i-card>
        <div style="margin-top:20rpx"></div>
        <i-card title="卡片标题"  extra="额外内容"  thumb="/static/images/headimg.png">
            <view slot="footer">尾部内容</view>
        </i-card>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{

    }
}
</script>
<style lang="stylus" scoped>
.body
    position absolute
    top 0rpx
    left 0rpx
    right 0rpx
    bottom 0rpx
    background #fff
</style>
