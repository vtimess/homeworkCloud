<template>
    <i-avatar :src="avatarComputed" :show="true" :size="size" @error="handleError" @click="click"></i-avatar>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {SET_ERROR_IMAGE} from '@/store/mutation-types'
const defaultImage = "/static/images/header.png"
export default {
    props:{
        size:{
            required:false,
            type:String,
            default:"large"
        },
        src:{
            required:false,
            type:String,
            default:"/static/image/avatar.jpg"
        }
    },
    computed: {
        ...mapState(['errorImage']),
        avatarComputed(){
            if(!this.src){
                return defaultImage
            }
            if(this.errorImage.indexOf(this.src) > -1){
                return defaultImage
            }
            if(/^https?:/.test(this.src) || /^\/static\//.test(this.src)){
                console.log(this.src)
                return this.src
            }
        }   
    },
    methods: {
         ...mapMutations({
            setErrorImage:SET_ERROR_IMAGE,
        }),
        handleError(e){
            /** 记录出错图片 */
            const errorIamge = [...this.errorImage,this.src]
            this.setErrorImage(errorIamge)
           
            this.src = defaultImage
            this.$emit("error",e)
        },
        click(e){
            this.$emit("click",e)
        }
    }
}
</script>
