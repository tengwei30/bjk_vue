<template>
	<div class="detail">
		<div class="news-contnet" id="abc" v-html>{{ linkUrl }}</div>
	</div>
</template>
<script>
	import Vue from 'vue';
	import Home from './home';
	export default {
		components: {
			Home
		},
		data() {
			return {
				msg: '欢迎来到八角客',
				newsID: '',
				linkUrl: ''
			}
		},
		created() {
			this.$http.post('/api/article/detail',{
				// newsID: this.$route.params.id
				newsID: '2335913',
				channelid:24,
				devicenum:'7BB3C249-BC10-4D80-84B5-0721B2833CBC'
			}).then(function(res){
				this.linkUrl = res.body.result.detail.linkUrl;
				console.log(this.linkUrl)
			},function(msg){
				console.log(msg)
			})
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	
</style>

