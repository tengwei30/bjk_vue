<template>
  <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange">
    <ul>
      <li v-for="item in movieList">{{ item }}</li>
    </ul>
    <div slot="top" class="mint-loadmore-top">
      <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
      <span v-show="topStatus === 'loading'">Loading...</span>
    </div>
  </mt-loadmore>
</template>
<script>
import Vue from 'vue';
import { Loadmore } from 'mint-ui';
  export default {
    data() {
      return {
        topStatus: '',
        movieList: []
      };
    },
    methods: {
      handleTopChange(status) {
        this.topStatus = status;
      },
      getData() {
      	this.$http.post('/api/article',{
      		channelID: 1,
			pageSize: 10,
			type: 1
      	}).then(function(res){
      		console.log(res.body)
      	},function(err){
      		console.log(err)
      	})
      },
      loadTop() {
		  this.$refs.loadmore.onTopLoaded();
	  }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
	
</style>


