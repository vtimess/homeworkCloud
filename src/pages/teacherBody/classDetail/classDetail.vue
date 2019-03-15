<template>
    <div class="body">
        <i-panel title="班群名称:">
            <i-input  v-model="form.name" placeholder="给班群起个名字" />
        </i-panel>
        <i-panel title="选择科目:" hide-border>
            <view class="section">
                <picker @change="pickerChange" :value="index" :range="array">
                    <view class="picker">
                    {{form.subject}}
                    </view>
                </picker>
            </view>
        </i-panel>
        <i-panel title="班群密码:">
            <i-input v-model="form.password" maxlength="6" placeholder="请输入班群密码(6位数字)" />
        </i-panel>
        <i-panel title="班群LOGO:" hide-border>
            <div class="flex-xf-yc image">
                <div v-if="form.classAvatarUrl" class="flex-xf-yc imageFile" >
                    <img class="images" mode="aspectFill" :src="form.classAvatarUrl" >
                    <img @click="del" class="del" src="/static/images/image_del.png">
                </div>
                <img @click="addImage" src="/static/images/releaseWorks_add.png">
            </div>
        </i-panel>
        <div class="stu">
        <i-panel title="班群成员:" hide-border >
            <i-collapse name="name1" class="student" >
                <i-collapse-item :title="form.studentNum?form.studentNum+'名同学':'尚无同学加入'" name="name1">
                    <view class="flex-x-m" slot="content">
                        <li  class="flex-y stuImage" >
                            <img class="images" mode="aspectFill" src="/static/images/headimg.png" >
                            <span>张申然</span>
                            <img @click="del" class="del" src="/static/images/image_del.png">
                        </li>
                        <li  class="flex-y stuImage" >
                            <img class="images" mode="aspectFill" src="/static/images/headimg.png" >
                            <span>张申然</span>
                            <img @click="del" class="del" src="/static/images/image_del.png">
                        </li>
                        <li  class="flex-y stuImage" >
                            <img class="images" mode="aspectFill" src="/static/images/headimg.png" >
                            <span>张申然</span>
                            <img @click="del" class="del" src="/static/images/image_del.png">
                        </li>
                        <li  class="flex-y stuImage" >
                            <img class="images" mode="aspectFill" src="/static/images/headimg.png" >
                            <span>初一三班张申然</span>
                            <img @click="del" class="del" src="/static/images/image_del.png">
                        </li>
                        
                    </view>
                </i-collapse-item>
            </i-collapse>
        </i-panel>
        </div>
        

        <MyButton styleType="defult" @click="update">修改班群信息</MyButton>
    </div>
</template>
<script>
import MyButton  from '@/components/MyButton.vue'
export default {
    components:{
      MyButton,
    },
    // onLoad(options){
    //     this.form = JSON.parse(options.data)
    // },
    data(){
        return{
            form:{
                classAvatarUrl:null,
                classDesc:null,
                classId:null,
                name:null,
                password:null,
                studentNum:0,
                subject:null,
            },
            className:"刘jj的日常",
            subject:"物理",
            password:"664532",
            array:['语文','数学','外语','物理','化学','JAVA','其他'],
            index:3,
        }
    },
    methods:{
        del(){

        },
        pickerChange({ mp }){
            this.form.subject = array[mp.detail.value]
        },
        toStudent(){
            wx.navigateTo({
                url:''
            })
        },
        addImage(){

        },
        update(){

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
    padding 20rpx
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
    .stu
        padding-bottom 200rpx
        .student
            font-size 28rpx
            color #2c2c2c
            .stuImage
                position relative
                padding 20rpx 0rpx
                width 200rpx
                margin-right 15rpx
                margin-bottom 15rpx
                box-shadow #efefef 0rpx 0rpx 10rpx 
                font-size 24rpx
                background #f1f1f1
                span
                    width 190rpx
                    margin-top 5rpx
                    text-align center
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                .images
                    width 80rpx
                    height 80rpx
                    border-radius 50%
                .del
                    width 32rpx
                    height 32rpx
                    position absolute
                    top 0rpx
                    right 0rpx


</style>
