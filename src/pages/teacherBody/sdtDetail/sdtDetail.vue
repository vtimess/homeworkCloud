<template>
<div class="body">
    <div class="image">
        <swiper class="swiper" style="height:300px"  circular="true" interval="4000" duration="600" @change="handChange">
          <block v-for="(item, index) in imageList" :key="index">
            <swiper-item class="flex-xc">
              <img :src="host+item" mode="aspectFill" class="slide-image" @click="preview(index)"/>
            </swiper-item>
          </block>
        </swiper>
        <span class="page">{{current}}/{{total}}</span>
    </div>

    <div class="flex-x-y footer">
        <input type="number" v-model="score" placeholder="请输入100以内分数..." maxlength="3">
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
        <view class="box" @click="cancal">取消</view>
        <view class="box" @click="save">保存</view>
    </view>
</div>
</template>
<script>
import host  from '../../../http/config'
import store from '../../../store/'

export default {
    startX: 0, //保存X坐标轴变量
    startY: 0, //保存Y坐标轴变量
    data(){
        return{
            h:9,
            current:1,
            total:null,
            imgUrl:'/static/images/header.png',
            classId:'',
            score:'',
            next:false,
            title:'某某同学',

            status:false,
            imageList:[],

            pen: 3, //画笔粗细默认值
            color: '#cc0033', //画笔颜色默认值
            canvasw:0,
            canvash:0,
            host:host,
        }
    },
    
    onLoad(options){
        Object.assign(this.$data, this.$options.data())
        if(options){
            console.log(JSON.parse(options.param))
            this.param = JSON.parse(options.param)
            this.getData()
        }
        wx.setNavigationBarTitle({
            title: this.title+'同学'
        })
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
        getData(){
            var vm = this;
            vm.$api.getImageT({
                homeworkId: vm.param.homeworkId,
                userId:vm.param.id
            }).then(data=>{
                vm.total = data.length
                vm.imageList = data
                console.log(vm.imageList)
            }).catch(code=>{

            })
        },
        handChange({mp:{detail}}){
            this.current = detail.current+1
        },
        edit(){
            var vm = this;
            vm.status = true;
            const contexts = wx.createCanvasContext('myCanvas');
            wx.getImageInfo({
            src: host+vm.imageList[vm.current-1],
            success(res) {
                console.log(res)
                let width= res.width;
                let height = res.height;
                if(width > vm.canvasw || height > vm.canvash){
                    let bl = 1
                    if(width - vm.canvasw >= height - vm.canvash){
                        bl = vm.canvasw/width
                    }else{
                        bl =  vm.canvash/height
                    }
                    width = width*bl;
                    height = height*bl;
                }
                console.log(res.width,res.height,width,height)
                contexts.setFillStyle('#fff')
                contexts.fillRect(0, 0, vm.canvasw, vm.canvash)
                contexts.drawImage(res.path, (vm.canvasw-width)/2, (vm.canvash-height)/2, width, height);
                contexts.draw();
                console.log(contexts)
            }
        });
        },
        preview(val){
            wx.previewImage({
                current: this.imageList[val], // 当前显示图片的http链接
                urls: this.imageList // 需要预览的图片http链接列表
            })
        },
        submit(){
            if(Number(this.score) > 100){
                wx.showToast({
                    icon:"none",
                    title:"请输入100以内的分数"
                },1000)
                return false
            }
            this.$api.updeteImageT({
                homeworkId:this.param.homeworkId,
                userId:this.param.id||0,
                score:this.score,
                comment:'',
                images:this.imageList
            }).then(()=>{
                var vm = this;
                var pages = getCurrentPages();
                var prePage = pages[pages.length - 2];
                setTimeout(()=>{
                    wx.navigateBack({
                        success:function(){
                            prePage.onLoad({id:vm.param.homeworkId})
                        }
                    })
                },1000)
                // this.next = true;
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
                    wx.uploadFile({
                        url: `${host}/upload/image`, 
                        filePath: res.tempFilePath,
                        name: 'file',
                        header:{
                            'Authorization':store.state.token,
                        },
                        formData:{
                            'type': 'homework'
                        },
                        success(res) {
                            let images = vm.imageList;
                            console.log(vm.imageList,"111")
                            images[vm.current-1] = JSON.parse(res.data).data
                            vm.imageList = images
                            vm.h = 6
                            console.log(res)
                            console.log(vm.imageList)
                            // const data = res.data
                            // do something
                        }
                    })
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
            .slide-image
                height 300px                
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
            font-size 32rpx
            padding 12rpx
            border-radius 10rpx
            color #fff
            background rgba(0,0,0,0.3)
            margin-top 30rpx
            
        
</style>
