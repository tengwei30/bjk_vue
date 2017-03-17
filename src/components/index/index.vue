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
    </div><br />
    <div class="comment">
      <ul class="comment_ul">
        <li class="comment_li" v-for="item in items"> 
           <span>{{item}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { Loadmore } from 'mint-ui';
  export default {
    data() {
      return {
        channels:[],
        TheWidth:'300px',
        items:[]
      }
    },
    methods: {
      
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
    height:24px
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
</style>