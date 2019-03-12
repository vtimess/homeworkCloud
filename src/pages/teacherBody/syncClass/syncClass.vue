<template>
    <div class="body">
        <i-panel title="只可同步到我创建的群" >
            <i-checkbox-group :current="current" @change="groupChange">
                <i-checkbox v-for="item in classGroup" position="left" :key="item" :value="item.name">
                </i-checkbox>
            </i-checkbox-group>
        </i-panel>
        

    </div>
</template>
<script>
export default {
    data(){
        return{
            classGroup: [{
                id: 1,
                name: 'HEO总部',
            }, {
                id: 2,
                name: 'Mighty'
            }, {
                id: 3,
                name: '世界第一帅'
            }, {
                id: 4,
                name: '美少女',
            }],
            current: ['HEO总部', 'Mighty'],
        }
    },
    methods:{
        groupChange({ mp }){
            console.log(mp)
            const index = this.current.indexOf(mp.detail.value);
            index === -1 ? this.current.push(mp.detail.value) : this.current.splice(index, 1);
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
</style>
