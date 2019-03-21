require.config({
	paths: {
		"mui": "libs/mui.min",
		"jsonp":"libs/mui.jsonp"
	},
	shim: {
		"jsonp": { //jsonp在mui执行完成之后再执行
			deps: ['mui'], //deps数组，表明该模块的依赖性
		}
	}
})

require(["mui","jsonp"], function(mui,jsonp) {

	function init() {
		// getMove();
		getJuno();
	}

	//业务逻辑
	function getJuno(){
		console.log("aa");
		mui.ajax('/juno/weapp/v2/search/prefix_keyword_suggester.json',{
// 			data:{
// 				q:"红烧"
// 			},
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(res){
				console.log(res);
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}

	//获取热映电影
	function getMove() {
		mui.getJSONP('https://api.douban.com/v2/movie/in_theaters', {
			start: 1, //数据的开始项
			count: 10, // 单页条数
			city: "北京" // 城市
		}, function(res) {
			console.log(res)

			var str = '';
			res.subjects.forEach(function(item) {
				str +=
					`<div class="listBox">
					<div class="img"><img src="${item.images.large}" /></div>
					<div class="title">
						<ul>
							<li>名称：<span>${item.title}</span></li>
							<li>类型：<span>${item.genres}</span></li>
							<li>导演：<span>${item.directors[0].name}</span></li>
							<li>演员：<span></span></li>
							<li>年份：<span></span> 的作品</li>
						</ul>
						<div class="tils">9.1</div>
					</div>
				</div>`
			})
			console.log(str)
			document.querySelector(".mainConter").innerHTML = str;

		});
	}



	init();
})
