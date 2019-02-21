<template>
  <div class="flex-y warp_1" @click="click" >
    <img v-show="status" :src="Item.imgUrl">
    <img v-show="!status" :src="Item.selectImgUrl">
    <span v-if="Item.index != 1">{{Item.name}}</span>
		</div>
</template>

<script>
export default {
  props: {
    Item:{
      type:Object,
      default: function () {
        return { message: 'hello' }
      }
    }
  },
  data(){
    return {
      status:true
    }
  },
  computed:{
    status(){
      if(this.url == this.sel){
        return true
      }
      return false
    }
  },
  methods:{
    click(){
      this.$router.push('/'+this.page);
			this.$emit('change',this.page)
    },
  }
}
</script>
<style lang="stylus" scoped>
@import '../../static/css/app.css'
.warp_1
  align-items center
  img
    width 40rpx
    height 40rpx
    margin-bottom 10rpx
</style>
