<template>
    <div class="body">
        <div class="content">
            <input class="input" v-if="titleStatus" v-model="title" placeholder="加个标题哟~" type="text" auto-focus @input="totast" :maxlength="maxlength">
            <textarea class="textarea" v-model="content" placeholder="来吧,尽情发挥吧..." auto-focus show-confirm-bar></textarea>    
        </div>
        <div class="flex-xf-yc image">
            <div class="flex-xf-yc imageFile" v-for="(item, index) in imageList" :key="index">
                <img class="images" mode="aspectFill" :src="item" >
                <img @click="del(index)" class="del" src="/static/images/image_del.png">
            </div>
            <img @click="addImage" src="/static/images/release_add.png">
        </div>
        <div class="flex-x-sb footer">
            <span @click="addOrhidden">{{titleTip}}</span>
            <span @click="hiddenOrshow">{{allHidden}}</span>
        </div>
        <button styleType="defult" @click="sub">发  布</button>
    </div>
</template>
<script>
import store from '../../store/'
import host  from '../../http/config'

export default {
    
    data(){
        return{
            title:"",
            content:"",
            maxlength:"31",                //标题最长字符
            titleTip:"添加标题",
            allHidden:"所有人可见",
            titleStatus:false,             // 标题：  true 有标题  false 无标题
            hiddenStatus:true,             //可见状态：true 可见 false 仅自己可见
            tempFile:[],              //图片列表
        }
    },
    created(){
        this.hostImg = host
    },
    computed: {
        imageList:function(){
            let newTempFile = []
            this.tempFile.map((item) => {
                newTempFile.push(this.hostImg+item)
            })
            return newTempFile;
        }
    },
    methods:{
        sub(e){
            if(this.content){
                this.$api.release({
                    title:this.title || null,
                    content:this.content,
                    image:this.tempFile
                })
                //请求
            }else{
                wx.showToast({
                    title:'请发挥一下吧！内容不为空',
                    icon:'none',
                    duration: 1000
                })
            }
        },
        totast(e){
            if(e.mp.detail.value.length > this.maxlength){
                wx.showToast({
                    title: '标题超过31个字的限制',
                    icon: 'none',
                    duration: 1000
                })
            }
                
        },
        del(val){
            this.tempFile.splice(val,1)
        },
        addImage(){
            var vm = this
            let counts = vm.tempFile.length;
            var imageFile = [];
            console.log(counts)
            if(counts<3){
                wx.chooseImage({
                    count: 3-counts,
                    sizeType: ['original', 'compressed'],
                    sourceType: ['album', 'camera'],
                    success(res) {
                        var uploadImgCount = 0;
                        console.log(res.tempFilePaths)
                        console.log(res.tempFilePaths.length)
                        for (var i = 0,length = res.tempFilePaths.length; i < length; i++) {
                            wx.uploadFile({
                                url: 'http://bd.liukang666.cn:57358/upload/image', 
                                filePath: res.tempFilePaths[i],
                                name: 'file',
                                header:{
                                    'Authorization':store.state.token,
                                },
                                formData:{
                                    'type': 'post'
                                },
                                success: (res) => {
                                    uploadImgCount++;
                                    var result = JSON.parse(res.data)
                                    console.log(JSON.parse(res.data))
                                    if(result.code == 0){
                                        if (uploadImgCount == length) {  
                                            wx.showToast({
                                                title: '图片上传成功',
                                                icon: 'success',
                                                duration: 2000
                                                })
                                        }
                                        vm.tempFile.push(result.data)
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
                    }
                 })
            }else{
                wx.showToast({
                    title: '限制只能上传三张图片!',
                    icon: 'none',
                    duration: 2000
                })
            }
            
        },
        addOrhidden(){
            if(!this.titleStatus){
                this.titleStatus = true
                this.title = ""
                this.titleTip = "隐藏标题"
            }else{
                this.titleStatus = false
                this.titleTip = "添加标题"
            }
        },
        hiddenOrshow(){
            if(this.hiddenStatus){
                this.allHidden = "仅自己可见"
            }else{
                this.allHidden = "所有人可见"
            }
            this.hiddenStatus = this.hiddenStatus ? false : true
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
    padding 20rpx
    background #fff
    .content
        padding-left 10rpx
        padding-right 10rpx
        .input
            font-size 32rpx
            font-weight bold
            margin-bottom 20rpx
        .textarea
            padding-left 5rpx
            font-size 30rpx
    .image
        padding-bottom 140rpx
        padding-left 10rpx
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
    .footer
        span
            padding 10rpx 20rpx 10rpx 20rpx
            background #f1f1f1
            border-radius 20rpx
            color #2c2c2c
            font-size 24rpx
</style>
