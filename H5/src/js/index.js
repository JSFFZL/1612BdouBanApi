require.config({
	paths: {
		"mui": "libs/mui.min",
		"jsonp": "libs/mui.jsonp",
		"$": "libs/dom"
	},
	shim: {
		"jsonp": { //jsonp在mui执行完成之后再执行
			deps: ['mui'], //deps数组，表明该模块的依赖性
		}
	}
})

require(["mui", "jsonp", "$"], function(mui, jsonp, $) {

	//全局变量
	var url = 'https://api.douban.com/v2/movie/in_theaters';

	function init() {
		getMove();
		tab();
		search();
	}

	//业务逻辑

	//tab切换

	function tab() {
		mui(".tab").on("tap", "li", function() {
			
			/*
			classList 的 contains属性
			返回布尔值，判断指定的类名是否存在。
			可能值：
			true - 元素包已经包含了该类名
			false - 元素中不存在该类名
			*/
		   
			//如果在当前的选项中，就不能再重复点击
			if (this.classList.contains("active")) {
				return
			}
			
			/*
			tab 切换效果
			*/
			let index = this.getAttribute("data-id"); 
			let li = document.querySelectorAll(".tab li");
			
			//去除所有标签样式
			for (var i = 0; i < li.length; i++) {
				li[i].classList.remove('active');
			}
			//当前tab添加高亮
			this.classList.add("active");
			/*
			对应tab显示的数据
			*/
			if (index == 1) {
				//正在热映接口
				url = 'https://api.douban.com/v2/movie/in_theaters';
				getMove();
			} else if (index == 2) {
				//即将上映接口
				url = 'https://api.douban.com/v2/movie/coming_soon';
				getMove();
			} else {
				//经典回忆
				url = 'http://api.douban.com/v2/movie/top250';
				getMove();
			}
		})
	}
	
	//收索
	function search(){
		$("#search").addEventListener('input',function(){
			//输入框值
			let search = $("#search").value;
			mui.getJSONP('http://api.douban.com/v2/movie/search',{
				start: 1, //数据的开始项
				count: 10, // 单页条数
				q:search // 关键字
			},function(res){
					render(res.subjects);
				}
			);
		})
	}


	//获取热映电影
	function getMove() {
		mui.getJSONP(url, {
			start: 1, //数据的开始项
			count: 10, // 单页条数
			city: "北京" // 城市
		}, function(res) {
			render(res.subjects);
		});
	}
	
	//渲染函数
	function render(data){
		var str = '';
		data.forEach(function(item) {
		
			let html = item.casts.map(function(file) {
				return `${file.name}`
			}).join("、");
		
			str +=
				`<div class="listBox">
				<div class="img"><img src="${item.images.large}" /></div>
				<div class="title">
					<ul>
						<li>名称：<span>${item.title}</span></li>
						<li>类型：<span>${item.genres}</span></li>
						<li>导演：<span>${item.directors.length ? item.directors[0].name : "无导演" }</span></li>
						<li>演员：<span>${html == "" ? "无演员" :  html  }</span></li>
						<li>年份：<span>${item.year}</span> 的作品</li>
					</ul>
					<div class="tils">${item.rating.average}</div>
				</div>
			</div>`
		})
		document.querySelector(".mainConter").innerHTML = str;
	}



	init();
})
