<template>
    <div class="body">
        <i-panel title="只可同步到我创建的群" >
            <i-checkbox-group :current="current" @change="groupChange">
                <i-checkbox v-for="item in classGroup" position="left" :key="item" :value="item.name">
                </i-checkbox>
            </i-checkbox-group>
        </i-panel>
        
    <button class="btn" @click="syncClass">同步到班群</button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            classGroup:[],
            current: [],
            classId:[],
        }
    },
    onLoad(options){
        this.classGroup = JSON.parse(options.data);
        this.current.push(this.classGroup[0].name)
        console.log(this.classGroup )
    },
    onHide() {
        console.log('onHide', this)
    },
    methods:{
        groupChange({ mp }){
            console.log(mp)
            const index = this.current.indexOf(mp.detail.value);
            index === -1 ? this.current.push(mp.detail.value) : this.current.splice(index, 1);
        },
        syncClass(){
            var vm = this
            if(vm.current.length){
                console.log(vm.current)
                vm.current.map((item)=>{
                    vm.classGroup.map(val =>{
                        if(item == val.name){
                            vm.classId.push(val.classId)
                        }
                    })
                })
                console.log(vm.classId)
                // wx.setStorageSync('classId',vm.classId)
                // //获取页面栈
                var pages = getCurrentPages();
                var prePage = pages[pages.length - 2];
                setTimeout(()=>{
                    wx.navigateBack({
                        success:function(){
                            prePage.onLoad(vm.classId)
                        }
                    })
                },1000)
                // prePage.changData(this.classId)
                // wx.navigateBack({
                //     delta: 1,
                // })
                
            }else{
                wx.showToast({
                    title:'请勾选将要发布到的班群'
                })
            }
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
    background #f1f1f1
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
