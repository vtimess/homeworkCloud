<template>
    <form @submit="formSubmit" report-submit="true">
        <button  :class="styleType?styleType:'button'" formType="submit" type="primary" :open-type="openType" @getuserinfo="getUserInfo"><slot></slot></button>
    </form>
</template>

<script>
import { mapMutations} from 'vuex'
import { PUSH_FORM_ID } from '@/store/mutation-types'
export default {
    props:{
        openType:String,
        styleType:String,
    },
    methods:{
         ...mapMutations({
             pushFormId: PUSH_FORM_ID,
        }),
        formSubmit:function(e){
            let formId = e.mp.detail.formId
            var reg = /[0-9a-zA-Z]*/
            if(reg.test(formId)){
                console.log("formId:"+formId)
                this.pushFormId(formId)
            }
            this.$emit("click",e)
        },
        getUserInfo(e){
            console.log(e)
            this.$emit('getuserinfo',e)
        },
        
    }
}
</script>
<style lang="stylus" scoped>
.button
    background-color #64dcdb
    color #fff
    margin 200rpx 20rpx 0
.button::after
    border none
.defult
    position fixed
    left 20rpx
    right 20rpx
    bottom 10rpx
    color #B22222
    background #f1f1f1
    font-weight 580
.defult::after
    border none

</style>
