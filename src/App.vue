<template>
  <div id="app">
    <router-view></router-view>
    <div class="footer_tab">
      <div class="tab-item">
        <router-link to="/home/home">首页</router-link>
      </div>
      <div class="tab-item">
      <router-link to="/movie/movie">视频</router-link>
      </div>
      <div class="tab-item">
      <router-link to="/personal/personal">我的</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import home from '@/components/home/home';
export default {
  components: {
    home
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  .footer_tab
    display:flex
    // width:100%
    height:40px
    line-height:40px
    position:fixed
    bottom:0
    left:0
    right:0
    border-top:1px solid #ccc
    background:#fff
    z-index:10
    &.after
      position: absolute;display: block;left: 0;bottom: 0;width: 100%;border-top: 1px solid rgba(7,17,27,0.1);content: ' ';
    .tab-item
      flex:1
      text-align:center
    .tab-item a
      display: block
      font-size: 14px
      color: rgb(77,85,93)
      text-decoration:none
      &.active
        color: rgb(220,20,20)
</style>
