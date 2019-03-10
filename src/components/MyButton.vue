<template>
    <form @submit="formSubmit" report-submit="true">
        <button class="button" formType="submit" type="primary" :open-type="openType" @getuserinfo="getUserInfo"><slot></slot></button>
    </form>
</template>

<script>
import { mapMutations} from 'vuex'
import { PUSH_FORM_ID } from '@/store/mutation-types'
export default {
    props:{
        openType:String
    },
    methods:{
         ...mapMutations({
             pushFormId: PUSH_FORM_ID,
        }),
        formSubmit:function(e){
            // let formId = e.mp.detail.formId
            // var reg = /[0-9a-zA-Z]*/
            // if(reg.test(formId)){
            //     console.log("formId:"+formId)
            //     this.pushFormId(formId)
            // }
        },
        getUserInfo(e){
            console.log(e)
            this.$emit('getuserinfo',e)
        },
        click(e){
            this.$emit("click",e)
        }
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

</style>
