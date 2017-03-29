<template>
  <div id="movie">
    <mt-navbar v-model="selected" fixed class="nav" style="overflow: hidden;border-bottom:1px solid #ccc  ">
      <mt-tab-item class="tab_nav" v-for="(channel,index) in channels" :id="index+'27'" @click.native = "TabNews(index,$event)">{{ channel.title }}</mt-tab-item>
    </mt-navbar>
    
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <mt-tab-container v-model="selected" style="padding-top: 40px">
        <mt-tab-container-item v-for="(channel,index) in channels" :id="index+'27'">
          <div class="card">
              <ul class="card_list">
                <li class="card_li" v-for="(item,index) in news">
                    <div>
                      <h4>{{ item.title }}</h4>
                      <div class="card_movie">
                        <video :src="item.playUrl" controls="controls" width="100%">您的浏览器不支持 video 标签。</video>
                      </div>
                      <div class="card_footer">
                        <span>{{ item.source }}</span><span>{{ item.scanCount }}浏览</span><span>{{ item.publishTime }}</span>
                      </div>
                    </div>
                </li>
              </ul>
          </div>
        </mt-tab-container-item>

      </mt-tab-container>  
    </mt-loadmore>
 
  </div>
</template>

<script type="text/javascript">
  import Vue from 'vue';
  import { Navbar, TabItem, TabContainer, Loadmore  } from 'mint-ui';
  Vue.component(Navbar.name, Navbar);
  Vue.component(TabItem.name, TabItem);
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(Loadmore.name, Loadmore);
  export default{
    name:'movie',
    data(){ 
      return{
        selected: '',
        news:[
          {
            id: ''
          }
        ],
        channels:[]
      }
    },
    mounted:function(){
        this.getData(27);
        this.getChannel(27);
    },
    methods:{
      getData:function(id){
        this.$http.post("/api/article",{
          channelID: id,
          pageSize: 10,
          type: 1
        }).then(function(res){
          console.log(res.body)
          this.news = res.body.result.news.items;
        },function(msg){
          console.log(msg);
        })
      },
      more:function(id){
        var that=this;
        this.$http.post("/api/article",{
          params:{
            channelID: id,
            pageSize: 10,
            type: 1
          }
        }).then(function(res){
          this.news=(this.news).concat(res.body.result.news.items);
        },function(msg){
          console.log(msg)
        })
      },
      getChannel() {
        this.$http.post("/api/article",{
          type: 1
        }).then(function(res){
          this.channels = res.body.result.channels;
        },function(msg){
          console.log(msg);
        })
      },
      TabNews:function(index) {
        index =index + 27;
        this.getData(index)
        if (!event._constructed) { // 避免网页点击触发两遍  给它传一个事件
          return;
        }
      },
      loadTop(id) {
        this.more(27)
        this.$refs.loadmore.onTopLoaded(id);
      },
      loadBottom(id) {
        console.log(id)
        this.more(27)
        this.allLoaded = true;// 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded(id);
        
      }
    }
    
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .nav
    width:100%
    overflow-x:scroll
    .mint-tab-item
      padding:0 !important
      height:29px
      line-height:29px
  .nav .mint-tab-item.tab_nav .mint-tab-item-label
    width:32px
    display:inline-block
    padding:0
  .card
    margin:0px 0 50px 0
    .btn_more
      height:40px
      line-height:40px
      font-family:"微软雅黑"
  .card .card_list .card_li
    border-bottom: 1px solid #ccc
  .card .card_list .card_li h4
    margin:15px 0
    font-family:"微软雅黑"
    font-size:16px
    color:#333
  .card .card_list .card_li .card_img
    display:flex
    width:100%
    .img_1
      flex:1
      img
        display:inline-block
        width:90%
  .card_footer
    font-size:12px
    text-align:left
    margin: 8px 0 10px 5px
    color:#999
    span
      margin-right:15px 
</style>