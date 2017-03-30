<template>
	<div class="detail">
		<div class="news-contnet">
			<iframe :src="linkUrl" frameborder="0" id="external-frame" style="width:100%;"></iframe>
			<!-- <iframe id="frame_content" :src="linkUrl" scrolling="no" frameborder="0" onload="this.height=this.contentWindow.document.documentElement.scrollHeight"></iframe>  -->
			<div class="recommend">
				<p>精彩推荐</p>
			</div>
		</div>
		
		<div class="space" style="width:100%;height:40px">
			
		</div>
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
				linkUrl: '',
				channelid: ''
			}
		},
		mounted() {
			this.setIframeHeight();
		},
		created() {
			this.$http.post('/api/article/detail',{
				newsID: this.$route.params.id,
				channelid:this.$route.params.channelid,
				devicenum:'7BB3C249-BC10-4D80-84B5-0721B2833CBC' 
			}).then(function(res){
				this.linkUrl = res.body.result.detail.linkUrl;
				console.log(res.body)
			},function(msg){
				console.log(msg)
			})
		},
		methods: {
			setIframeHeight() {
				let ifm= document.getElementById("external-frame");
				ifm.height=document.documentElement.clientHeight;
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.detail .news-contnet
		margin:10px 0 20px 0
		.recommend
			p
				text-align:left
				padding:0 15px
				width:100%
				background:#eee
				height:24px
				line-height:24px
				font-size:12px
				font-family:"微软雅黑"
</style>