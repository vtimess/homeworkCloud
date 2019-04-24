<template>
    <div class="info">
        <div class="head">
            <span class="img">头像</span>
            <div class="size" @click="upload">
                <img class="useravatar" :src="myData.avatarUrl"/>
            </div>
        </div>
        <div class="selfinfo">
            <ul>
                <li class="before"><span>昵称</span>
                <input type="text" v-model="myData.name"/></li>
                <li class="before"><span>教师编号</span>
                <input type="number" v-model="myData.nid"/></li>
                <li class="before"><span>性别</span>
                <picker style="float:right;font-size:30rpx;color:#8a8a8a" @change="pickerChange" :value="index" :range="array">
                    <view class="picker">
                    {{array[index]}}
                    </view>
                </picker></li>
                <li class="before"><span>手机号码</span>
                <input type="number" maxlength="11" v-model="myData.phone"/></li>
                <li class="after"><span>座右铭</span></li>
                <textarea class="motto" v-model="myData.motto" maxlength="36" adjust-position="true"  />
            </ul>
        </div>
        <MyButton styleType="defult" @click="myClick">确认修改</MyButton>
    </div>
</template>

<script>
import MyButton from '@/components/MyButton.vue'
export default {
    components:{
        MyButton
    },
    data() {
        return {
            myData:{
                avatarUrl:'',
                nickname:'未填写',
                nid:'未填写',
                sex:'男神',
                phone:'未填写',
                motto:''
            },
            btn:'保 存',
            index:'0',
            array:['男神','女神'],
            tempFile:'',
        }
    },
    onLoad(){
         this.getData()
    },
    methods: {
        pickerChange({ mp }){
            this.index = mp.detail.value
        },
        getData(){ 
            this.$api.getInfo({})
            .then( data =>{
                this.myData = data;
                console.log(this.myData)
                if(this.myData.sex == '女神'){
                    this.index = 1
                }
            })
        },
        upload(){
            var vm = this
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
                                vm.myData.avatarUrl = host+result.data;
                                vm.tempFile = result.data ;
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
        },
        myClick(){
            var vm = this
            vm.myData.sex = vm.array[vm.index];
            vm.$api.modifyInfo(
                vm.myData
            ).then(code=>{
                var pages = getCurrentPages();
                var prePage = pages[pages.length - 2];
                setTimeout(()=>{
                    wx.navigateBack({
                        success:function(){
                            prePage.onLoad()
                        }
                    })
                },1000)
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
.info
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    background-color #f3f4f5
    .head
        height 100rpx
        background-color #fff
        margin-top 30rpx
        padding 10rpx 50rpx
        .img
            height 80rpx
            line-height 100rpx
        .size
            height 80rpx
            float right 
            .useravatar 
                display block
                width 80rpx
                height 80rpx
                border-radius 50%
                overflow hidden
                border: 2px solid #fff;
                box-shadow: 0rpx 6rpx 5rpx rgba(0, 0, 0, 0.2);
    span
        float left
        font-size 30rpx
        color #2c2c2c
    .selfinfo
        height auto
        background-color #fff
        margin-top 20rpx
        padding  10rpx 50rpx
        .before
            height 100rpx
            line-height 100rpx
            border-bottom 1rpx solid #f5f5f5
        .after
            height 80rpx
            line-height 80rpx
        .motto
            max-height 80rpx
            background #f3fbfb
            font-size 26rpx
            color #2c2c2c
            padding 20rpx 30rpx
            margin-bottom 20rpx
            border-radius 14rpx
    input 
        height 80rpx
        line-height 80rpx
        margin-top 10rpx
        vertical-align middle
        float right
        font-size 30rpx
        color #8a8a8a
        text-align right 
            

        
            
   
    
</style>
