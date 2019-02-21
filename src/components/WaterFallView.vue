<template>
    <div class='fall-container'>
        <div class="fall-left">
            <block v-for="item in leftData" :key="item.index">
                <image 
                    class='card-img' 
                    mode='aspectFill' 
                    :style="{width:'20px',height:'20px'}"
                    :src='item.imgUrl' 
                    lazy-load>
                </image>
            </block>
        </div>
        <div class="fall-right">
            <span>{{this.gg}}</span>
            <block v-for="item in rightData" :key="item.index">
                <image 
                    class='card-img' 
                    mode='aspectFill' 
                    :style="{width:'20px',height:'20px'}"
                    :src='item.imgUrl' 
                    lazy-load>
                </image>
            </block>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        listData:Array,
    },
    
    data(){

        return{
            leftHight: 0,
            rightHight:0,
            itemWidth: 0,
            maxHeight: 0,
            leftList:[],  //左侧集合
            rightList:[],  //右侧集合
            leftData:[],
            rightData:[],
            gg:"13245"
        }
    },
    created(){
        console.log("456")
        this.callchild(false, this.listData);
        this.attached()
    },
    
    methods:{
        attached(){
            wx.getSystemInfo({
                success: (res) => {
                    let percentage = 750 / res.windowWidth;     //750rpx/屏幕宽度
                    let margin = 20 / percentage;               //计算瀑布流间距    
                    this.itemWidth = (res.windowWidth - margin) / 2; //计算 瀑布流展示的宽度
                    this.maxHeight = this.itemWidth / 0.8                 //计算瀑布流的最大高度，防止长图霸屏
                    console.log(this.itemWidth,this.maxHeight,"666")
                }
            });
        },
        callchild(isPull, listData) {
            // if (isPull) { //是否下拉刷新，是的话清除之前的数据
            //     this.leftList.length = 0;
            //     this.rightList.length = 0;
            //     this.leftHight = 0;
            //     this.rightHight = 0;
            // }
            for (let i = 0, len = listData.length; i < len; i++) {
                console.log(listData.length)
                let tmp = listData[i];
                    tmp.width = parseInt(tmp.width);
                    tmp.height = parseInt(tmp.height);
                    tmp.itemWidth = this.itemWidth
                let per = tmp.width / tmp.itemWidth;
                    tmp.itemHeight = tmp.height / per;
                if (tmp.itemHeight > this.maxHeight) {
                    tmp.itemHeight = this.maxHeight;
                }
                if (this.leftHight == this.rightHight) {
                    this.leftList.push(tmp);
                    this.leftHight = this.leftHight + tmp.itemHeight;
                } else if (this.leftHight < this.rightHight) {
                    this.leftList.push(tmp);
                    this.leftHight = this.leftHight + tmp.itemHeight;
                } else {
                    this.rightList.push(tmp);
                    this.rightHight = this.rightHight + tmp.itemHeight;
                }
            }
            console.log("777")
            this.leftData = this.leftList;
            this.rightData = this.rightList;
            console.log(this.leftData,this.rightData,"123")
        }
    }
}
</script>
<style lang="stylus" scoped>
.fall-container 
    width 100%
    height auto
    background #fff
    display flex
    .fall-left
        display flex
        flex-direction column
    .fall-right
        display flex
        flex-direction column
        margin-left 20rpx
    
</style>
