<template>
    <div class="body">
        <div class="model" v-for="item in postList" :key="item" @click="details(item.id)">
            <div class="flex-x-sb header">
                <div class="flex-x-yc">
                    <div class="avatar" @click.stop="look(item.userId)"><avatar :src="item.avatar" size="default" ></avatar></div>
                    <div class="flex-yf header-title">
                        <span class="name">{{item.username}}</span>
                        <span class="time">{{item.beforeTime}}</span>
                    </div>
                </div>
                <img src="/static/images/more.png" @click.stop="share(item.id)">
            </div>
            <div style="padding-left:100rpx;">
                <span class="title">{{item.content}}</span>
                <div v-if="item.image" class="images">
                    <img @click.stop="preview(item.imageList,item.imageList[0])"  mode="aspectFill" :src="item.imageList[0]">
                </div>
            </div>
            <div class="footer">
                <ul class="flex-x-r">
                    <li class="flex-xf-yc" style="padding-right:80rpx;">
                        <img  src="/static/images/eyes.png" >
                        <span>{{item.lookNum?item.lookNum:'浏览'}}</span>
                    </li>
                    <li class="flex-xf-yc" style="padding-right:80rpx;">
                        <img src="/static/images/message.png">
                        <span>{{item.commentNum?item.commentNum:'评论'}}</span>
                    </li>
                    <li class="flex-xf-yc" style="padding-right:40rpx;">
                        <img src="/static/images/like.png" >
                        <span>{{item.supportNum?item.supportNum:'赞'}}</span>
                    </li>
                </ul>
            </div>
            <div class="bottom"></div>
        </div>
        <div v-show="loadStatus">
          <i-load-more  tip="加载中" :loading="true" />
        </div>
        <loadError v-if="show" @click="getData"></loadError>
        <div v-if="relShow" class="release">
            <img src="/static/images/edit.png" @click="release">
        </div>
        <i-action-sheet :visible="visible" :actions="actions" show-cancel @cancel="handleCancel" @itemClick="handleClickItem" />
    </div>
</template>
<script>
import host  from '@/http/config'
import avatar from '@/components/lk-avatar'
import loadError from '@/components/loadError'
import {formatBfTime as format} from '@/utils/index.js'
import { mapState, mapMutations } from 'vuex'
import { SET_STATUS,SET_TABINDEX,SET_TOKEN} from '@/store/mutation-types'

export default {
    components:{
      avatar,
      loadError,
    },
data(){
    return{
        visible: false,
        actions:[{
            name:'分享',
            openType:'share'
        },{
            name:'举报'
        }],
        title:"#RNG超话#2019年LOL世界赛决赛RNG 3:0 GRF 完虐!",
        page:0,
        size:5,
        totalPage:1,
        postList:[],
        show:false,
        relShow:false,
    
    }
},
computed: {
    ...mapState([   //分发store中的数据到当前组件
        'tabIndex',
        'status'
    ])
},
onLoad(){
    if(this.status  == 1){
        this.relShow = true
    }
    this.getData()
},
onPullDownRefresh(){
    if(this.tabIndex == '0'){
      this.page = 0;
      this.totalPage = 1;
      this.getData()
      setTimeout(function(){
        wx.stopPullDownRefresh()
      },2000)
    }
  },
//   onReachBottom(){
//     var vm = this;
//     if(this.tabIndex == '0'){
//       vm.loadStatus = true
//       setTimeout(function(){
//           vm.getData()
//         vm.loadStatus = false
//       },2000)
//     }
//   },
methods:{
    getData(){
        var dateTime = new Date();
        this.$api.getPost({
            page:this.page,
            size:this.size
        }).then(({data})=>{
            console.log(data)
            let listData = data
            listData.map((item,index)=>{
                if(item.image){
                    item.imageList = item.image.split(',').map(items=>{
                        return  host + items
                    });
                }
                item.beforeTime = format((dateTime - item.createTime)/1000);
            })
            if(this.page == 0){
                this.postList = listData
            }else{
                this.postList = [...this.postList,...listData]
            }
            this.page = this.page + 1
            console.log(listData)
        }).catch(code=>{
            this.show = true 
        })
    },
    //跳转详情页面
    details(val){
        wx.navigateTo({
            url:'/pages/postDetail/main?id='+val
        })
    },
    //预览图片
    preview(row,item){
        wx.previewImage({
            current: item, // 当前显示图片的http链接
            urls: row// 需要预览的图片http链接列表
        })
    },
    //跳转发布帖子页面
    release(){
      wx.navigateTo({
        url:'/pages/release/main'
      })
    },
    //查看个人资料
    look(val){
        wx.navigateTo({
            url:'/pages/profile/main?id='+val
        })
    },
    share(val){
        this.visible = true
    },
    handleCancel(){
        this.visible = false
    },
    handleClickItem({mp}){
        console.log(mp.detail)
        if(mp.detail){
            wx.showToast({
                title:'举报成功',
                icon:'none'
            })
            this.visible = false
        }
    }
},
 

}
</script>
<style <style lang="stylus" scoped>
.body
    width 100%
    height 100%
    position absolute
    top 0px
    left 0px
    padding-bottom 100rpx
    background-color #fff
    .model
        padding 0rpx 20rpx
        .header
            width 100%
            height 100rpx
            color #2c2c2c
            padding 0rpx 20rpx 0rpx 20rpx
            .header-title
                margin-left 20rpx
                .name
                    color #64dcdb
                    font-size 28rpx
                .time
                    color #cdcdcd
                    font-size 24rpx
            img 
                margin-right 60rpx
                width 64rpx
                height 64rpx
        .images
            height auto
            padding 0rpx 20rpx 20rpx 20rpx
            img
                width 320rpx
                height 300rpx
        .title
            font-size 30rpx
            color #707070
            padding 20rpx 40rpx 10rpx 30rpx
            overflow hidden
            text-overflow ellipsis
            display -webkit-box
            -webkit-line-clamp 2
            -webkit-box-orient vertical
        .footer
            font-size 22rpx
            padding 0rpx 0rpx 10rpx 0rpx
            img
                width 40rpx
                height 40rpx
            span
                color #bfbfbf
        .bottom
            margin-left 30rpx
            margin-right 30rpx
            border-bottom 0.5rpx solid #e6e6e6
    .release
        position fixed
        right 80rpx
        bottom 100rpx
        img
            width 64rpx
            height 64rpx
</style>