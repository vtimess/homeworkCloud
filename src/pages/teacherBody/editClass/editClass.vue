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
                    <img class="images" mode="aspectFill" :src="image" >
                    <img @click="del" class="del" src="/static/images/image_del.png">
                </div>
                <img @click="addImage" src="/static/images/releaseWorks_add.png">
            </div>
        </i-panel>
        <i-panel title="班群成员:" hide-border >
            <i-cell :title="form.studentNum?form.studentNum+'位同学已加入':'尚无同学加入'" value="查看详情" @click="toStudent" ></i-cell>
        </i-panel>
        <MyButton styleType="teacher" @click="update">修改班群信息</MyButton>
    </div>
</template>
<script>
import MyButton  from '@/components/MyButton.vue'
import host  from '../../../http/config'


export default {
    components:{
      MyButton,
    },
    onLoad(options){
        this.form = JSON.parse(options.data);
        this.image = this.form.classAvatarUrl;
    },
    data(){
        return{
            form:{
                classId:null,
                name:null,
                password:null,
                subject:null,
                studentNum:0,
                classAvatarUrl:null,
                classDesc:null,
            },
            image:'',
            subject:"物理",
            password:"664532",
            array:['语文','数学','外语','物理','化学','JAVA','其他'],
            index:3,
        }
    },
    methods:{
        del(){
            this.form.classAvatarUrl = '';
        },
        pickerChange({ mp }){
            this.form.subject = array[mp.detail.value];
        },
        toStudent(){
            // wx.navigateTo({
            //     url:'/pages/teacherBody/sdtDetail/main'
            // })
        },
        addImage(){
            var vm = this
            let counts = vm.form.classAvatarUrl?1:0;
            console.log(counts)
            if(counts<1){
                wx.chooseImage({
                    count: 1,
                    sizeType: ['original', 'compressed'],
                    sourceType: ['album', 'camera'],
                    success(res) {
                        wx.uploadFile({
                            url: 'http://localhost:8080/upload/image', 
                            filePath: res.tempFilePaths[0],
                            name: 'file',
                            header:{
                                'Authorization':store.state.token,
                            },
                            formData:{
                                'type': 'avatar'
                            },
                            success: (res) => {
                                console.log(res)
                                var result = JSON.parse(res.data)
                                if(result.code == 0){
                                    wx.showToast({
                                        title: '图片上传成功',
                                        icon: 'success',
                                        duration: 2000
                                    })
                                    vm.image = host+result.data;
                                    vm.form.classAvatarUrl = result.data;
                                }else{
                                    wx.showToast({
                                        title: '上传图片失败',
                                        icon: 'none',
                                        duration: 2000
                                    }) 
                                }
                                
                            },
                                
                        })
                    }
                 })
            }else{
                wx.showToast({
                    title: '限制只能上传1张图片!',
                    icon: 'none',
                    duration: 2000
                })
            }
        },
        update(){
            var vm = this
            vm.$api.updateClass(
                vm.form
                ).then(data =>{
                    wx.navigateBack({
                        delta: 1
                    })
                })
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
    


</style>
