<template>
	<div class="detail">
		<p>详情页</p>
	</div>
</template>
<script>
	import Vue from 'vue';
	export default {
		data(){
			return{
				id: '',
				linkUrl:''
			}
		},
		created() {
			const _this = this;
			this.$http.get('/api/article',{
				params:{
					id: this.$route.params.id
				}
			}).then((response) => {
				// this.linkUrl = response.body.data; 
				console.log(response.body)
			})
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	
</style>

