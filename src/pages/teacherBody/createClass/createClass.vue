<template>
    <div class="body">
        <i-panel title="班群名称:">
            <i-input :value="className" placeholder="给班群起个名字" />
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
        <i-cell title="加入方式">
            <i-radio color="#ed3f14" value="密码验证"  checked="true">
            </i-radio>
        </i-cell>
        <i-panel title="班群密码:">
            <i-input :value="password" placeholder="请输入班群加入密码(6位数字)" />
        </i-panel>
        <i-panel title="班群LOGO:" hide-border>
            <div class="flex-xf-yc image">
                <div v-if="image" class="flex-xf-yc imageFile" >
                    <img class="images" mode="aspectFill" :src="image" >
                    <img @click="del" class="del" src="/static/images/image_del.png">
                </div>
                <img @click="addImage" src="/static/images/releaseWorks_add.png">
            </div>
        </i-panel>
        
        <MyButton styleType="defult" @click="create">立即创建</MyButton>
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
            array:['语文','数学','外语','物理','化学','JAVA','其他'],
            index:6,
            className:'',
            password:'',
            image:'',
            
        }
    },
    methods:{
        del(){
            console.log("333")
        },
        addImage(){

        },
        create(e){
            console.log(e)
        },
        pickerChange({ mp }){
            this.index = mp.detail.value
        }
        
    }
}
</script>
<style lang="stylus" scoped>
@import '../../../../static/css/app.css'
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
    .image
        padding-left 30rpx
        padding-top 10rpx
        .imageFile
            position relative
            margin-right 20rpx
            .images
                width 154rpx
                height 160rpx
                border-radius 10rpx
            .del
                width 32rpx
                height 32rpx
                position absolute
                top -5rpx
                right -5rpx
        img 
            width 154rpx
            height 160rpx
</style>
