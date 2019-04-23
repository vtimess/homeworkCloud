<template>
    <div class="body">
        <div class="canvas">
            <ec-canvas class="canvas"  :echarts="echarts"  id="mychart-dom-bar"  canvas-id="mychart-bar" :ec="ec"></ec-canvas>
        </div>
        <!-- <div class="flex-yc closed">
            <img src="/static/images/mark.png" >
            <span>暂未体验权限</span>
        </div> -->
    </div>
</template>
<script>

  // 指定图表的配置项和数据
    var options = {
        
        legend: {
            data: ['张申然']
        },
        radar: [{
            indicator: [
                { text: '语文', max: 150 },
                { text: '数学', max: 150 },
                { text: '英语', max: 150 },
                { text: '物理', max: 120 },
                { text: '化学', max: 120 },
                { text: 'JAVA', max: 150 }
            ],
            center: ['50%', '50%'],
            radius: 120,
            startAngle: 90,
            splitNumber: 4,
            
        }],
        series: [{
            name: '成绩单',
            type: 'radar',
            radarIndex: 0,
            itemStyle: {
                emphasis: {
                    // color: 各异,
                    lineStyle: {
                        width: 4
                    }
                }
            },
            data: [{
                value: [121, 118, 130, 100, 99, 70],
                name: '张申然',
                label: {
                    normal: {
                        show: true,
                        formatter:function(params) {
                            return params.value;
                        }
                    }
                },
                
            }]
        }]
    }
 
export default {
    data(){
        return{
            // 传 options
            ec:{
                options:options
            } 
        }
    },
    methods:{

    }
}
</script>
<style scoped>
.canvas{
    width: 100%;
    height: 750rpx;
}
ec-canvas{
    width: 100%;
    height: 750rpx;
}
</style>
