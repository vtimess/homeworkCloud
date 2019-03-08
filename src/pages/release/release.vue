<template>
    <div class="body">
        <div class="content">
            <input class="input" v-if="titleStatus" v-model="title" placeholder="加个标题哟~" type="text" auto-focus @input="totast" :maxlength="maxlength">
            <textarea class="textarea" v-model="content" placeholder="来吧,尽情发挥吧..." auto-focus show-confirm-bar></textarea>    
        </div>
        <div class="flex-xf-yc image">
            <div class="flex-xf-yc imageFile" v-for="(item, index) in tempFile" :key="index">
                <img class="images" mode="aspectFill" :src="item" >
                <img @click="del(index)" class="del" src="/static/images/image_del.png">
            </div>
            <img @click="addImage" src="/static/images/release_add.png">
        </div>
        <div class="flex-x-sb footer">
            <span @click="addOrhidden">{{titleTip}}</span>
            <span @click="hiddenOrshow">{{allHidden}}</span>
        </div>
        <button class="btn" @click="sub">发  布</button>
    </div>
</template>
<script>
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
    methods:{
        sub(){
            if(this.content){
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
            console.log(counts)
            if(counts<3){
                wx.chooseImage({
                    count: 3-counts,
                    sizeType: ['original', 'compressed'],
                    sourceType: ['album', 'camera'],
                    success(res) {
                        console.log(res)
                        // tempFilePath可以作为img标签的src属性显示图片
                        vm.tempFile = [...vm.tempFile,...res.tempFilePaths]
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
@import '../../../static/css/app.css'
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
    .btn
        position fixed
        left 20rpx
        right 20rpx
        bottom 10rpx
        color #B22222
        font-weight 580
    .btn::after
        border none
</style>
