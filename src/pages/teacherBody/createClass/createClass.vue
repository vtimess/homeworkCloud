<template>
    <div class="body">
        <i-panel title="班群名称:">
            <i-input name="className" type="text" @blur="getclassName"  v-model="name" maxlength="20" placeholder="给班群起个名字" />
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
            <i-input type="number" @blur="getpassword" v-model="password" maxlength="6" placeholder="请输入班群加入密码(6位数字)" />
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
        <MyButton styleType="teacher" @click="create">立即创建</MyButton>
    </div>
</template>
<script>
import MyButton  from '@/components/MyButton.vue'
import host  from '../../../http/config'

import store from '../../../store/'

export default {
    components:{
      MyButton,
    },
    data(){
        return{
            name:'',
            password:'',
            subject:'',
            avatarUrl:'',
            desc:null,
            array:['语文','数学','外语','物理','化学','JAVA','其他'],
            index:6,
            image:'',
            tempFile:[],
            desc:null,
            
        }
    },
    onLoad(){
        Object.assign(this.$data, this.$options.data())
    },
    methods:{
        del(){
            this.image = ""
        },
        getclassName({ mp }){
            this.name = mp.detail.detail.value
        },
        getpassword({ mp }){
            this.password = mp.detail.detail.value
        },
        addImage(){
            var vm = this
            let counts = vm.tempFile.length;
            console.log(counts)
            if(counts<1){
                wx.chooseImage({
                    count: 1,
                    sizeType: ['original', 'compressed'],
                    sourceType: ['album', 'camera'],
                    success(res) {
                        wx.uploadFile({
                            url: `${host}/upload/image`, 
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
                                    vm.tempFile.push(result.data);
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
        create(e){
            let reg = /^\d{6}$/;
            if(!reg.test(this.password)){
                wx.showToast({
                    icon:'none',
                    title:'请输入六位数字'
                });
                return 0
            }
            if(this.name&&this.image){
                var vm = this
                this.$api.createClass(
                    {
                        name:vm.name,
                        subject:vm.array[vm.index],
                        avatarUrl:vm.tempFile,
                        password:vm.password,
                        desc:vm.desc
                    }
                ).then(msg =>{
                    wx.showToast({
                        icon:'success',
                        title:'创建'+msg
                    })
                    wx.navigateBack({
                        url:'/pages/teacherBody/worksManage/main'
                    })
                })
                
            }else{
                let message = this.name?'请上传班群图片':'班群名称未填写';
                wx.showToast({
                    icon:'none',
                    title: message
                })
            }
        },
        pickerChange({ mp }){
            console.log(mp)
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
