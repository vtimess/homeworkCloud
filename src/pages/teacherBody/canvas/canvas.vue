<template>
    <view class="container" >
        <!-- <img src="/static/images/photos.png"  class="img"> -->
    <!--画布区域-->
        <view class="canvas_area">
            <canvas canvas-id="myCanvas" class="myCanvas"
                disable-scroll="false"
                @touchstart="touchStart"
                @touchmove="touchMove"
                @touchend="touchEnd">
            </canvas>
        </view>
        <!--画布工具区域-->
        <view class="canvas_tools">
            <view class="box box3" @click="colorSelect"></view>
            <view class="box box5" @click="clearCanvas"></view>
            <view class="box " @click="save"></view>
        </view>
    </view>
</template>
<script>
export default {
    startX: 0, //保存X坐标轴变量
    startY: 0, //保存Y坐标轴变量
    isClear : false, //是否启用橡皮擦标记
    data(){
        return{
            pen: 3, //画笔粗细默认值
            color: '#cc0033', //画笔颜色默认值
            canvasw:0,
            canvash:0,
            image:'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
            isClear:false,
        }
    },
    onLoad(){
        var vm = this;
        wx.getSystemInfo({
        success: function (res) {
            console.log(res)
            vm.canvasw = res.windowWidth;
            vm.canvash = res.windowHeight;
            },
        })
        const contexts = wx.createCanvasContext('myCanvas');
        wx.getImageInfo({
            src: vm.image,
            success(res) {
                console.log(res)
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
    methods: {

        //手指触摸动作开始
        touchStart: function (e) {
            //得到触摸点的坐标
            this.startX = e.mp.changedTouches[0].x
            this.startY = e.mp.changedTouches[0].y
            this.context = wx.createContext()

            if(this.isClear){ //判断是否启用的橡皮擦功能  ture表示清除  false表示画画
                this.context.setStrokeStyle('#FFFFFF') //设置线条样式 此处设置为画布的背景颜色  橡皮擦原理就是：利用擦过的地方被填充为画布的背景颜色一致 从而达到橡皮擦的效果 
                this.context.setLineCap('round') //设置线条端点的样式
                this.context.setLineJoin('round') //设置两线相交处的样式
                this.context.setLineWidth(20) //设置线条宽度
                this.context.save();  //保存当前坐标轴的缩放、旋转、平移信息
                this.context.beginPath() //开始一个路径 
                this.context.arc(this.startX,this.startY,5,0,2*Math.PI,true);  //添加一个弧形路径到当前路径，顺时针绘制  这里总共画了360度  也就是一个圆形 
                this.context.fill();  //对当前路径进行填充
                this.context.restore();  //恢复之前保存过的坐标轴的缩放、旋转、平移信息
            }else{
                this.context.setStrokeStyle(this.color)
                this.context.setLineWidth(this.pen)
                this.context.setLineCap('round') // 让线条圆润 
                this.context.beginPath()
                
            }
        },
        //手指触摸后移动
        touchMove: function (e) {
            
            var startX1 = e.mp.changedTouches[0].x
            var startY1 = e.mp.changedTouches[0].y

            // if(this.isClear){ //判断是否启用的橡皮擦功能  ture表示清除  false表示画画

            //     this.context.save();  //保存当前坐标轴的缩放、旋转、平移信息
            //     this.context.moveTo(this.startX,this.startY);  //把路径移动到画布中的指定点，但不创建线条
            //     this.context.lineTo(startX1,startY1);  //添加一个新点，然后在画布中创建从该点到最后指定点的线条
            //     this.context.stroke();  //对当前路径进行描边
            //     this.context.restore()  //恢复之前保存过的坐标轴的缩放、旋转、平移信息
                
            //     this.startX = startX1;
            //     this.startY = startY1;
            
            // }else{
                this.context.moveTo(this.startX, this.startY)
                this.context.lineTo(startX1, startY1)
                this.context.stroke()

                this.startX = startX1;
                this.startY = startY1;
                
            // }
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
        // clearCanvas() {
        //     console.log(111)
        //     //清除画布
        //     this.isClear = true;
        //     this.context.clearRect(0,0,this.canvasw,this.canvash)
        //     this.context.draw(true)
        // },
        save(){
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
                }
            })
            console.log(this.context)
        }  
    },
}
</script>
<style >

.container{
    position: absolute;
    top:0rpx;
    left: 0rpx;
    right:0rpx;
    bottom:0rpx;
    background: #f1f1f1;
}
.img{
    position: absolute;
    top: 0rpx;
    left: 0rpx;
    width: 100%;
    height:100%; 
}
.canvas_area{
    width: 100%;
    height: 100%;
    background-color: #FFF;
    z-index: 1;
}
.myCanvas{
    width: 100%;
    height: 100%;
}

.canvas_tools{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0,-50%);
    z-index: 2;
}
.box{
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    background-color: rebeccapurple;
    margin-top: 30rpx;
}
.box3{
    background-color: #cc0033;
}



.box5{
    background-color: #cccccc;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAABuvAAAbrwFeGpEcAAAAB3RJTUUH2wQdDR8AJlzyAwAAB79JREFUWMPtln9sU9cVx7/33fdsPzuOY+eHnSWOA+2qJhoTOBAyGDAkuiB1VK0iARpoLW2jpGs7VIEmoFo6GKOb1IgJKtSIDWmbNLR1+2NCpBSkQlFHsySkhYpAAiEJNiGJ7SR2/OPZ791790deaBgdP8r+mnako/d03z3n8z3nXh8Z+L/9L9j45g3orF0E8dv3IKYmMDo2jiNHjqChoQGNjY33jCWPCh/d2ADJakPshZfgHB5a89fQzecuhUKSzWo9ffDgwfe3bNkiLBYL2travjKePgo83PAsiEUBraiE49IXa5VY5LDX7V4jlZUvzi8ufioYDMYOHDjw2aJFi1BXV4eurq7/noAbz/4ARJGhVFRApFNrhaa9x6amAo5oFB4qiUS+S1Xy81fW1NRM7d+//3wwGMSyZcvQ2dn56AIGn147Ay/zQ2TS9VzT2ngqFeC6Dp5KwS4R5l71PR7nwi7L8qolS5YkWltbz9fW1orly5ejo6Pj6wu49v01IDKFUu6HyGRMeDLAczqElgXxuA11y8uiIFijOPPyxGQ8blUUZeXSpUuTvb2951VV5d3d3V9PQN/qVTPwsnKITLpeZDJtLGnCs1kQT6GR1/SKUBYuUsA58pxOYg+H2EQ0YlPcnpU+r/eiz+frO3HixO2c8oPCL61YDkEAyVcKlpyuF7reJjKZgDAYhKGDFpcYyoaNIhqbUNyRCKyFhWAd55j7N++gWlbE6KYfOSYrK8s9BQV35H0gARfqasEFoJT4wKdn4DyTCYAxCF0HLSkx7C++LGKxmJIZG4O9shLS5V4j9/YvCB8eosWMwfH+UfQtWChc8p3I+86BnpogJJnCWlYO5HL1wjDhZuWy12fYn39BZJ1ORbZaIQhBfmra0Pa8RfjwEBWcgzgcyGracMJgG2XGOhZG47fzS/eCd357ATjnoMVeGMlkvZFOt+nxRMDIaNDTaaDAY9hffIlj/nxl8sIFMMZgj0WMVMubJDdwlRq5LLjDgRShN25NZ5pr5vk6/hRNPlgH/llVBVAJalk5eDZrVq4FBJupXPH6DM+2bXw6l7Nkx8eR99hjsEcjRvZXewkbGqSCcYAzZFTHjdFMrukpt+3E/vEsim0yno9P3VvAp48/DkIpLKWlELp+F1z2+nTXK81CeH0WbhiQLBZYR24a2tt7CRu8TgXnAGNIgYRGBG16xsY/aNFUlCgSfpKK38G66wjOBQIAY1CKisBTqXqeTrexxHSAaxp4OgPqKdSLduwQrKjYMnbmDCBJsI6NGqndb5Fsfz81dANMNxAXJDRIrE3PsNwHbwgPVIt8F/yuDvyjrAwgBNbSUvBcrl4w1sY17cvbXlqqu159VeScTgtVVUgWC+zxKSP+023EGB6mIAQEwDShoSHJ2rw5l2pvdPjgFQb2JaNfedR3dMCaSmFswQKwVKqeZzJtLJEIcE0DS6chFRXp7u3bRZIxS+LKFUh2O5SREWNi2xskOzhMGQi4ACZBQ/2StXlzNtX+w7xvIF+w/wgH5kzClpYWqNksrAMDCy26/geRTs8T+syEk71e3fn664L5fBbF5YLq98MyNmZMvbmT6DdCVFAJAMEUkcP9VG1uzCbbn3OWo5gbeDc5fs+fOQWAffv2gXOOM0DRE5s2/Zomk8vJ1atANgtaUqJ7du/m0pNPWiMffQS1ogLKrRFjctdOoodCVEgzTZyUaLiPqk3N2nT70/kV8HIdh5NjuJ/RgwcPgnOOoaGhwg0NDe/WrFix3rF4Mcb7+mHRNL1ozx5uW7bMKjscsJWWgl+5Ykzt/vmcyoEJIoevyGrTa1qivd4VQKnQ8fvk6H3hgDmKc7lc0fr169+prq7eaLPZoAYCMPbsRqSvX7LU1SkQAiAE4to1Y/KXe4kRClFCZyuXw31Ubd6qxdtXuyrh51n8cfrWA8EBgLa3t+P69euvBYPB7Xa7HZxzcMZgd7sBt1uKRCJwOBzIffKJEd21ixjhMIVEARBMSEr4MrU3b9Xix1e75qGc5/CXh4ADAA0Gg+jp6Ym6XK7qwsLCeZIkQQgBwTlUmw2Mc9w896nItPwMPBSioDP3NibJ4ctUbf6xNnX8u04/ehLD6M1NPxQcAOjRo0cxODgYO3v27Dm3273Q7XYHCCEQQoBzDlVVYQDkZne3ZA2HQAlBVJLDl6i9uUWbOm4HEMklZvMRPOQf3dubW1tbMTAw8MS6desOV1VVrZRlGZxzCCFAJAm3BgZwfecu6J3dYx/L1h2/yybbATEbzwBwAAYAHUDOXLt/B2afp06dUru6urSRkZFev9//rZKSkrLZTgghIGQZ5yYnPzzZcX7Hn/XUWUAIE8hMYNZ03RTzYEcAwAKgAEAxgNKhoSHl4sWLoYqKim+WlZUVEUKQTCZx+vTpv//t1IeNVZA+70kkUkLwNIAMAM0UYNwDTDAzdekclzDnRQXgNIUURaNRS09PT8Tv9/s9Hk/ByZMnTx86dGjrF599PtIdn6BcMMlMOptMAWAFYDNz2cx8+QDyTLeb67IZywHw2TOkZmA+ADcAD4D86urq+bW1td85duzYx7FYLGy2V5/Tem66MPMIc312z+z+3Byf/cYx5xLNNQmAQgixCCEUU7ViHhXFlzddzAEyM6nxb+/GHBibE3Pb/gUC/dxqGfqRGgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNi0wOS0xN1QxNToyNDoyNCswODowMA7t6/sAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTEtMDQtMjlUMTM6MzE6MDArMDg6MDBvcrggAAAAZ3RFWHRMaWNlbnNlAGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LXNhLzMuMC8gb3IgaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvTEdQTC8yLjEvW488YwAAAE10RVh0c29mdHdhcmUASW1hZ2VNYWdpY2sgNy4wLjEtNiBRMTYgeDg2XzY0IDIwMTYtMDktMTcgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmfd2aVOAAAAE3RFWHRTb3VyY2UAT3h5Z2VuIEljb25z7Biu6AAAACd0RVh0U291cmNlX1VSTABodHRwOi8vd3d3Lm94eWdlbi1pY29ucy5vcmcv7zeqywAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABh0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQAMjU26cNEGQAAABd0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAAyNTZ6MhREAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADEzMDQwNTUwNjAVs8b7AAAAEnRFWHRUaHVtYjo6U2l6ZQAyMS4yS0IIXt3YAAAAXXRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vaG9tZS93d3dyb290L3NpdGUvd3d3LmVhc3lpY29uLm5ldC9jZG4taW1nLmVhc3lpY29uLmNuL3NyYy81Mzk2LzUzOTY3MC5wbmfCorxHAAAAAElFTkSuQmCC) ;
    background-repeat:no-repeat;
    background-position: center;
}

</style>

