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
    
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['初一一班','初一二班','初一三班','初一四班','初一五班']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'初一一班',
            type:'line',
            data:[90, 92, 82, 70, 90, 73, 100]
        },
        {
            name:'初一二班',
            type:'line',
            data:[99, 100, 82, 98, 110, 95, 110]
        },
        {
            name:'初一三班',
            type:'line',
            data:[40, 50, 60, 70, 60, 80, 75]
        },
        {
            name:'初一四班',
            type:'line',
            data:[100, 100, 111, 115, 110, 99, 120]
        },
        {
            name:'初一五班',
            type:'line',
            data:[75, 82, 92, 78, 86, 99, 150]
        }
    ]
};

 
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
    position: absolute;
    top: 50%;
    transform: translate(0%,-50%);
    height: 750rpx;
}
ec-canvas{
    width: 100%;
    height: 750rpx;
}
</style>
