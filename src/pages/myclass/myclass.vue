<template>
    <div>
        <ClassList v-for="classData in ClassData" :key="classData.classId" :classData="classData"></ClassList>
    </div>
    
</template>

<script>
import ClassList from '@/components/ClassList.vue'
export default {
    onPullDownRefresh:function(){
        this.page = 0;
        this.totalPages = 1;
        this.ClassData = [];
        this.getData();
    },
    onReachBottom:function(){
        if(this.totalPages <= this.page){
            wx.showToast({
                title:'已加载全部',
            })
            return 
        }else{
            this.page = this.page+1
            this.getData()
        }
    },
    components: {
        ClassList
    },
    data(){
        return{
            page:0,
            size:4,
            totalPages:1,
            ClassData:[],
        }
    },
    onLoad(){
        this.page = 0;
        this.getData();
    },
    methods: {
        getData:function(calback){
            this.$api.getClass({
                page:this.page,
                size:this.size
            }).then((data)=>{
                let totalData = data.totalData;
                this.totalPages = data.totalPages;
                if(totalData === 0){
                    wx.showToast({
                    title:'尚未加入班级',
                    })
                }else{
                    if(this.page ==0){
                        this.ClassData = data.data
                    }else{
                        this.ClassData = [...this.ClassData,...data.data];
                    }
                }
                calback&&calback()
            });
        },
    }
            
}
</script>
<style lang="stylus" scoped>
div
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    background-color #eee
</style>