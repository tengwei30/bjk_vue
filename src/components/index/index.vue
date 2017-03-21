<template>
  <div class="index">
    <div class="header">
      <div class="tab">
          <ul class="menu_ul" :style="{width:TheWidth}">
            <li class="menu_li" v-for="(channel,$index) in channels">
              <a href="">{{ channel.title }}</a>
            </li>
          </ul>
      </div>
      <div class="tab_search">
        <span @click="nav_search()">搜索</span>
      </div>
    </div><br /><br />
    <div class="comment">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore">
        <ul class="comment_ul">
          <li class="comment_li" v-for="item in items" style="list-style: none"> 
            <router-link :to="{ path:'/index/detail/'+item.id}"> 
              <h4 class="comment_title">{{ item.title }}</h4>
              <div class="comment_img" v-if="item.images.length == 3 || item.images.length == 0">
                  <span class="img-1" v-for="imgurl in item.images">
                      <img :src="imgurl"/>
                  </span>
              </div>
              <div class="comment_state" v-if="item.images.length == 3 || item.images.length == 0">
                <span>{{ item.source }}</span><span>{{ item.scanCount }}浏览</span><span>{{ item.publishTime }}</span>
              </div>
            </router-link>
          </li>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import { Loadmore } from 'mint-ui';
  import detail from './detail.vue';
  export default {
    data() {
      return {
        channels:[],
        TheWidth:'300px',
        items:[]
      }
    },
    computed() {

    },
    methods: {
      loadTop() {
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom(){
        this.$refs.loadmore.onBottomLoaded();
      },
      openDetail(){
        
      }
    },
    created() {
      this.$http.get('/api/article').then((response) => {
        this.channels = response.body.result.channels;
        this.TheWidth = ((response.body.result.channels.length)*30)+'px';
        this.items = response.body.items
        this.$set(this,'items',response.body.result.news.items)
      })
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .header
    width:100%
    line-height:24px
    border-bottom:1px solid #ccc
    overflow-x:scroll
    position:fixed
    background:#fff
    top:0
    left:0
    z-index:5
    .tab
      .menu_ul
        list-style:none
        margin:0
        padding :0
        padding-right:35px
        overflow:hidden
        .menu_li
          display:inline-block
          padding:0 3px
          a
            text-decoration:none
            font-size:12px
            color:#666
        &.active
          color:red
        &.unactive
          color:#666
    .tab_search
      position:fixed
      right:0
      top:0
      background:#fff
      height:24px
      width:38px
      z-index:9
      border-left:1px solid #ccc
      font-size:12px
  .comment
    width:100%
    .comment_ul
      .comment_li
        border-bottom:1px solid #ccc
        margin:5px 0
        padding:0 5px
        .comment_title
          text-align:left
          font-size:16px
          margin:5px 0
          font-family:"微软雅黑"
        .comment_img
          display:flex
          width:100%
          .img-1
            flex:1
            img
              display:inline-block
              width:90%
        .comment_state
          font-size:12px
          text-align:left
          margin: 8px 0 10px 5px
          color:#ddd
          span
            margin-right:15px 
</style>