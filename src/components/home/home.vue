<template>
	<div id="card">
		<mt-navbar v-model="selected" fixed class="nav">
			<mt-tab-item class="tab_nav" v-for="(channel,index) in channels" :id="index+'1'" @click.native = "TabNews(index,$event)">{{ channel.title }}</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected" style="padding-top: 40px">
			<mt-tab-container-item v-for="(channel,index) in channels" :id="index+'1'">
				<div class="card">
				    <ul class="card_list">
				    	<li class="card_li" v-for="(item,index) in news">
				    		<div class="card_item" v-if="item.images.length == 3 || item.images.length == 0">
				    			<router-link :to="{ path:'/home/detail/'+item.id+'/'+item.channelid}" class="link">
					    			<h4>{{ item.title }}</h4>
					    			<div class="card_img">
					    				<span class="img_1" v-for="imgUrl in item.images">
						    				<img :src="imgUrl" />
						    			</span>
					    			</div>
					    			<div class="card_footer">
					    				<span>{{ item.source }}</span><span>{{ item.scanCount }}浏览</span><span>{{ item.publishTime }}</span>
					    			</div>
					    		</router-link>
				    		</div>
				    	</li>
				    </ul>
				    <div class="btn_more" @click="more">
						点击加载更多
					</div>
				</div>
			</mt-tab-container-item>

		</mt-tab-container>		
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue';
	import { Navbar, TabItem, TabContainer } from 'mint-ui';
	Vue.component(Navbar.name, Navbar);
	Vue.component(TabItem.name, TabItem);
	Vue.component(TabContainer.name, TabContainer)
	export default{
		name:'card',
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
		beforeCreate() {
			this.getInit();
		},
		mounted:function(){
		  	this.getData(1);
		  	this.getChannel(1);
		},
		methods:{
			getData:function(id){
				this.$http.post("/api/article",{
					channelID: id,
					pageSize: 10,
					type: 0
				}).then(function(res){
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
						type: 0
					}
				}).then(function(res){
					this.news=(this.news).concat(res.body.result.news.items);
				},function(msg){
					console.log(msg)
				})
			},
			getChannel() {
				this.$http.post("/api/article",{
					type: 0
				}).then(function(res){
					this.channels = res.body.result.channels;
				},function(msg){
					console.log(msg);
				})
			},
			TabNews:function(index) {
				index =index + 1;
				this.getData(index)
				if (!event._constructed) { // 避免网页点击触发两遍  给它传一个事件
					return;
				}
			},
			getInit() {
				document.getElementsByClassName('tab_nav')[0].className="mint-tab-item tab_nav is-selected"
			}

		}
		
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.nav
		width:100%
		overflow-x:scroll
		border-bottom:1px solid #ddd
		&::-webkit-scrollbar
			width:0
			height:0
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