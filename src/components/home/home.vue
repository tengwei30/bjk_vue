<template>
	<div id="card">
		<div class="card">
		    <!-- <div valign="bottom" class="card-header color-white no-border no-padding">
		      <img class='card-cover' :src="item.text_image0" alt="">
		    </div>
		    <div class="card-content">
		      <div class="card-content-inner">
		        <p class="color-gray">发表于 {{item.edit_time}}</p>
		        <p>{{item.digest}}</p>
		      </div>
		    </div>
		    <div class="card-footer">
		      <a href="#" class="link">赞</a> 
		      <router-link :to="{ path:'/content/'+item.news_id}" class="link">更多</router-link>
		    </div> -->

		    <ul class="card_list">
		    	<li class="card_li" v-for="(item,index) in news">
		    		<div class="card_item" v-if="item.images.length == 3 || item.images.length == 0">
		    			<router-link :to="{ path:'/content/'+item.news_id}" class="link">
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
		
	</div>
</template>

<script type="text/javascript">

	export default{
		name:'card',
		data(){
			return{
				news:[
					{
							
					}
				],
				pages:1
			}
		},
		mounted:function(){
		  	this.getData();
		},
		created:function(){
			
			
		},
		methods:{
			getData:function(){
				this.$http.post("/api/article",{
					channelID: 1,
					pageSize: 10,
					type: 0
				}).then(function(res){
					console.log(res.body)
					this.news = res.body.result.news.items;
				},function(msg){
					console.log(msg);
				})
			},
			more:function(){
				var that=this;
				this.$http.post("/api/article",{
					params:{
						channelID: 1,
						pageSize: 10,
						type: 0
					}
				}).then(function(res){
					this.news=(this.news).concat(res.body.result.news.items);
				},function(msg){
					console.log(msg)
				})
			}
		}
		
	}


	
	
	
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.card
		margin-bottom:50px
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