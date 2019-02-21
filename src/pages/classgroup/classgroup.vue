<template>
    <div>
        <div class="class-desc">
            <img src="/static/images/classgroup.png">
        </div>
        <div class="classgroup">
            <span>什么是班群</span>
            <p>班群是由老师创建，给学生布置作业、上传作业的群。</p>
            <span>什么是班群号</span>
            <p>班群号是该班群的唯一标识，老师创建班群时设置的6位数字作为班群号。</p>
            <span>怎么加入班群</span>
            <p>学生在"homework"搜索班群号页面输入班群号，点击加入并输入密码，
                即可加入班群，上传已完成老师布置作业的照片。</p>
        </div>
    </div>
</template>
 <script>
 export default {
     data() {

     }
     
 }
 </script>
 <style lang="stylus" scoped>
 .class-desc
    width 100%
    img 
        width 100%
        height 289rpx
 .classgroup
    padding-left 40rpx
    padding-right 40rpx
    margin-top 30rpx
    span
        display block
        text-align center
        margin-top 60rpx
        font-size 22px
        color #64dcdb
    p
        margin-top 20rpx
        font-size 14px
        color #515151
 </style>