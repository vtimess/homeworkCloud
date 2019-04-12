<template>
<div class="body">
    <div class="image">
        <swiper class="swiper"  circular="true" interval="4000" duration="600" @change="handChange">
          <block v-for="(item, index) in imgUrls" :key="index">
            <swiper-item>
              <img :src="item" class="slide-image" @click="preview(index)"/>
            </swiper-item>
          </block>
        </swiper>
        <span class="page">{{current}}/{{total}}</span>
    </div>
    <div class="flex-x-y footer">
        <input type="text" v-model="score" placeholder="请输入分数..." maxlength="3">
        <span @click="submit">评分</span>
        <span @click="edit">批改</span>
    </div>
    <div v-if="next" class="next" @click="next">
        <span>已批改</span>
    </div>
    <!--画布区域-->
    <view v-if="status" class="canvas_area">
        <canvas canvas-id="myCanvas" class="myCanvas"
            disable-scroll="false"
            @touchstart="touchStart"
            @touchmove="touchMove"
            @touchend="touchEnd">
        </canvas>
    </view>
    <!--画布工具区域-->
    <view v-if="status" class="canvas_tools">
        <view class="box box3" @click="colorSelect"></view>
        <view class="box " @click="cancal">取消</view>
        <view class="box " @click="save">保存</view>
    </view>
</div>
</template>
<script>
export default {
    startX: 0, //保存X坐标轴变量
    startY: 0, //保存Y坐标轴变量
    data(){
        return{
            imgUrls: [
                'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
                'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
                'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
            ],
            current:1,
            total:null,
            imgUrl:'/static/images/header.png',
            classId:'',
            score:'',
            next:false,
            title:'某某同学',

            status:false,

            pen: 3, //画笔粗细默认值
            color: '#cc0033', //画笔颜色默认值
            canvasw:0,
            canvash:0,
            image:'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        }
    },
    onLoad(options){
        if(options){

        }
        wx.setNavigationBarTitle({
            title: this.title+'同学'
        })
        this.total = this.imgUrls.length;
        var vm = this;
        wx.getSystemInfo({
        success: function (res) {
            console.log(res)
            vm.canvasw = res.windowWidth;
            vm.canvash = res.windowHeight;
            },
        })
        
    },
    methods: {
        handChange({mp:{detail}}){
            this.current = detail.current+1
        },
        edit(){
            var vm = this;
            vm.status = true;
            const contexts = wx.createCanvasContext('myCanvas');
            wx.getImageInfo({
            src: vm.image,
            success(res) {
                let height = 0;
                let width = 0;
                let maxHeight = res.height;
                let maxWidth = res.width;
                if(res.height < vm.canvash){
                    height = (vm.canvash - res.height)/2
                }else{
                    maxHeight = vm.canvash
                }
                if(res.width < vm.canvasw){
                    width = (vm.canvasw - res.width)/2
                }else{
                    maxWidth = vm.canvasw
                }
                contexts.setFillStyle('#fff')
                contexts.fillRect(0, 0, vm.canvasw, vm.canvash)
                contexts.drawImage(res.path, width, height, maxWidth, maxHeight);
                contexts.draw();
                console.log(contexts)
            }
        });
        },
        preview(val){
            wx.previewImage({
                current: this.imgUrls[val], // 当前显示图片的http链接
                urls: this.imgUrls // 需要预览的图片http链接列表
            })
        },
        submit(){
            this.$api.updateClass({
                classId:this.classId,
                score:this.score,
                img:this.imgUrls,
            }).then(()=>{
                this.next = true;
            })
        },
        next(){
            this.$api.updateClass({
                classId:this.classId,
            }).then((data)=>{
                this.imgUrls = data.imgUrls;
                this.score = '';
                this.next = false;
                wx.setNavigationBarTitle({
                    title: this.title+'同学'
                })
            })
        },
        //手指触摸动作开始
        touchStart: function (e) {
            //得到触摸点的坐标
            this.startX = e.mp.changedTouches[0].x
            this.startY = e.mp.changedTouches[0].y
            this.context = wx.createContext()
            console.log(this.context)
        
            this.context.setStrokeStyle(this.color)
            this.context.setLineWidth(this.pen)
            this.context.setLineCap('round') // 让线条圆润 
            this.context.beginPath()
        },
        //手指触摸后移动
        touchMove: function (e) {
            var startX1 = e.mp.changedTouches[0].x
            var startY1 = e.mp.changedTouches[0].y
            this.context.moveTo(this.startX, this.startY)
            this.context.lineTo(startX1, startY1)
            this.context.stroke()

            this.startX = startX1;
            this.startY = startY1;
                
            //只是一个记录方法调用的容器，用于生成记录绘制行为的actions数组。context跟<canvas/>不存在对应关系，一个context生成画布的绘制动作数组可以应用于多个<canvas/>
            wx.drawCanvas({
                canvasId: 'myCanvas',
                reserve: true,
                actions: this.context.getActions() // 获取绘图动作数组
            })
        },
        //手指触摸动作结束
        touchEnd() {
            
        },
        save(){
            var vm = this
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: this.canvasw,
                height: this.canvash,
                destWidth:  this.canvasw,
                destHeight: this.canvash,
                canvasId: 'myCanvas',
                success(res) {
                    console.log(res.tempFilePath)
                    vm.status = false
                }
            })
            console.log(this.context,"666")
        },
        cancal(){
            this.status = false
        }
    },
    
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
    background #f1f1f1
    .image
        width 100%
        height 100%
        display flex
        align-items center
        .swiper
            width 100%
            max-height 100%
            .slide-image
                width 100%
                max-height 100%
    .page
        position absolute
        top 50rpx
        left 50%
        margin-left -20rpx
        width 40rpx
        text-align center
    .footer
        position fixed
        bottom 0rpx
        width 100%
        height 110rpx
        color #fff
        background #32333F
    .next
        position fixed
        bottom 0rpx
        width 100%
        height 110rpx
        color #fff
        text-align center
        line-height 110rpx
        background #32333F
    .stuImage
        position relative
        padding 20rpx 0rpx
        width 200rpx
        margin-left 27.5rpx
        margin-bottom 27.5rpx
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
    .canvas_area
        position absolute
        left 0rpx
        top 0rpx
        bottom 0rpx
        right 0rpx
        background-color #FFF
        z-index 1
        .myCanvas
            width 100%
            height 100%
    .canvas_tools
        position absolute
        right 0
        top 50%
        transform translate(0,-50%)
        z-index 2
        .box
            width 100rpx
            height 100rpx
            border-radius 50%
            background-color rebeccapurple
            margin-top 30rpx
            .box3
                background-color #cc0033
            .box5
                background-color #cccccc
        
</style>
