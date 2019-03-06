<template>
    <div>
        <ClassList v-for="classData in ClassData" :key="classData.classId" :classData="classData"></ClassList>
    </div>
    
</template>

<script>
import ClassList from '@/components/ClassList.vue'
export default {
    components: {
        ClassList
    },
    data(){
        return{
            page:1,
            totalPages:1,
            ClassData:[],
        }
    },
    onLoad(){
        this.getData()
    },
    methods: {
        getData:async function(calback){
            let result = await this.$http.get('/student/class/joined',{page:this.page,size:7})
            if(result){
                let totalData = result.totalData;
                this.totalPages = result.totalPages;
                let data = result.data;
                if(totalData === 0){
                    wx.showToast({
                    title:'尚未加入班级',
                    })
                }else{
                    this.ClassData = [...this.ClassData,...data];
                }
                
            }
            calback&&calback()
        },
        
    },
    onPullDownRefresh:function(){
        this.page = 1;
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