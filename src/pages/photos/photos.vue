<template>
    <div class="body">
        <img src="/static/images/photos.png" class="bgimg">
        <div class="photos">
            <img v-for="item in tempFilePaths " :key="item.index" :src="item" mode="aspectFill" @click="preview" class="tempFilePaths">
        </div>
        <button class="btn" @click="upload">{{button}}</button>
        <span class="status">批改中</span>
    </div>
</template>
<script>
import { devHost as host } from '../../http/config'
export default {
    data() {
        return{
            tempFilePaths:[],
            button:'拍照/相册',
            btnState:'false'
        }
        
    },
    methods:{
        preview(){
            wx.previewImage({
                current: tempFilePaths[item.index],
                urls: tempFilePaths
            })
        },
        upload(){
            if(this.btnState == 'false'){
                wx.chooseImage({
                    count: 9, 
                    sizeType: ['original', 'compressed'], 
                    sourceType: ['album', 'camera'], 
                    success: (res) => {
                        console.log(res.tempFilePaths)
                        this.tempFilePaths = res.tempFilePaths
                        this.button = '上传'
                        this.btnState = true
                    }
                })
            }else{
                wx.showToast({  
                    title: '正在上传...',  
                    icon: 'loading',  
                    mask: true,  
                    duration: 10000  
                })
                var uploadImgCount = 0;
                for (var i = 0,h = this.tempFilePaths.length; i < h; i++) {
                    wx.uploadFile({
                        url: `${host}/upload/image`, 
                        filePath: this.tempFilePaths[i],
                        name: 'file',
                        formData:{
                            'type': 'homework'
                        },
                        success: (res) => {
                            uploadImgCount++;
                            console.log(res.data)
                            var data = res.data
                            if(data.code == 0){
                                if (uploadImgCount == this.tempFilePaths.length) {  
                                wx.showToast({
                                    title: '成功',
                                    icon: 'success',
                                    duration: 2000
                                    })
                                this.button = '完成'
                                this.btnState = 'finish' 
                            }
                            }else{
                                this.button = '重新上传'
                                this.btnState = true
                                wx.showToast({
                                    title: '上传图片失败',
                                    icon: 'none',
                                    duration: 2000
                                    }) 
                            }
                            
                        },
                        fail: (res) => {
                            this.button = '重新上传'
                            this.btnState = true
                        wx.hideToast();  
                        wx.showModal({  
                            title: '错误提示',  
                            content: '上传图片失败',  
                            showCancel: false,  
                            })
                          
                        }
                    })
                }
                 
            }
            
        }
    }
}
</script>
<style lang="stylus" scoped>
.body
    position absolute
    top 0px
    left 0
    right 0
    bottom 0
    height 1200rpx
    .bgimg
        width 750rpx
        height 1200rpx
    .photos
        position absolute
        top 100rpx
        width 80%
        margin-left 10%
        margin-right 10%
        height 400rpx
        .tempFilePaths
            width 150rpx
            height 150rpx
            margin 10rpx 20rpx
            border 1rpx solid #fff
            float left
    .btn
        position absolute
        bottom 128rpx
        left 255rpx
        width 240rpx
        height 240rpx
        border-radius 50%
        line-height 240rpx
    .btn::after
        border none
    .status
        position absolute
        left 0
        bottom 160rpx
        width 100rpx
        height 40rpx
        line-height 40rpx
        font-size 26rpx
        color #fff
        border-top-right-radius 20rpx
        border-bottom-right-radius 20rpx
        background-color #64dcdb
</style>
