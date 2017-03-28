<template>
	<div class="detail">
		<div class="news-contnet" id="abc"></div>
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
				id: '',
			}
		},
		created() {
			this.$http.post('/api/article/detail',{
				id: this.$route.params.id
			}).then(function(res){
				document.getElementById('abc').innerHTML = res.body.result.news.items.linkUrl;
			},function(msg){
				console.log(msg)
			})
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	
</style>

