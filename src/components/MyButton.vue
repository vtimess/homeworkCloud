<template>
    <form @submit="formSubmit" report-submit="true">
            <button formType="submit" @click="click">{{btn}}</button>
    </form>
</template>
<script>
import { mapState,mapMutations} from 'vuex'
import { PUSH_FORM_ID } from '@/store/mutation-types'

export default {
    props:{
        btn:String
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
        },
        click(e){
            this.$emit("myClick",e)
        }
    },
    computed:{
        ...mapState([
            'formId',
        ])
    }
}
</script>
<style lang="stylus" scoped>
button
    margin 100rpx auto
    border-radius 10rpx
    background-color #fff
    color #ff0000
</style>
