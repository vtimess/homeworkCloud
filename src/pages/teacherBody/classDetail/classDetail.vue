<template>
    <div class="body">
        <i-panel title="班群名称:">
            <i-input  v-model="className" placeholder="给班群起个名字" />
        </i-panel>
        <i-panel title="选择科目:" hide-border>
            <view class="section">
                <picker @change="pickerChange" :value="index" :range="array">
                    <view class="picker">
                    {{array[index]}}
                    </view>
                </picker>
            </view>
        </i-panel>
        <i-panel title="班群密码:">
            <i-input v-model="password" maxlength="6" placeholder="请输入班群加入密码(6位数字)" />
        </i-panel>

        <MyButton styleType="defult" @click="update">修改班群信息</MyButton>
    </div>
</template>
<script>
import MyButton  from '@/components/MyButton.vue'
export default {
    components:{
      MyButton,
    },
    data(){
        return{
            className:"刘jj的日常",
            subject:"物理",
            password:"664532",
            array:['语文','数学','外语','物理','化学','JAVA','其他'],
            index:6,
        }
    },
    methods:{
        update(){

        }
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
    padding 20rpx 20rpx 20rpx 10rpx
    background #fff
    .section
        padding-left 40rpx
        font-size 28rpx
        color #707070
</style>
