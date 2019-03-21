require.config({
	paths: {
		"mui": "libs/mui.min"
	}
})

require(["mui"], function(mui) {


	//全局变量
	let uid = localStorage.getItem("id");

	function init() {
		getUserDetailt();
		// update();
	}

	///api/getUserDetailt
	function getUserDetailt() {
		mui.ajax('/api/getUserDetailt', {
			data: {
				id: uid
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(res) {
				var str = "";
				res.data.forEach(function(item) {
					str =
						`
					<form class="mui-input-group">
						<div class="mui-input-row">
							<label>用户名</label>
							<input type="text" class="mui-input-clear name" placeholder="${item.name}">
						</div>
						<div class="mui-input-row">
							<label>性别</label>
							<input type="text" class="mui-input-clear" placeholder="${item.sex}">
						</div>
						<div class="mui-input-row">
							<label>年龄</label>
							<input type="text" class="mui-input-clear" placeholder="${item.age}">
						</div>
						<div class="mui-input-row">
							<label>地址</label>
							<input type="text" class="mui-input-clear" placeholder="${item.address}">
						</div>
						<div class="mui-input-row">
							<label>电话</label>
							<input type="text" class="mui-input-clear" placeholder="${item.tell}">
						</div>
						<div class="mui-button-row">
							<button type="button" class="mui-btn mui-btn-primary btn-yes">确认</button>
							<button type="button" class="mui-btn mui-btn-danger">取消</button>
						</div>
					</form>`
				})
				document.querySelector('.tab').innerHTML = str;
				update(); //
			}
		});
	}
	//详情的业务逻辑
	function update() {
		document.querySelector('.btn-yes').addEventListener('tap', function() {
			var allInput = document.querySelectorAll(".mui-input-clear");
			mui.ajax('/api/updateUser', {
				data: {
					id: uid,
					name:allInput[0].value || allInput[0].placeholder, 
					sex: allInput[1].value || allInput[1].placeholder,
					age: allInput[2].value || allInput[2].placeholder,
					address: allInput[3].value || allInput[3].placeholder,
					tell: allInput[4].value || allInput[4].placeholder,
				},
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；
				success: function(res) {
					mui.alert(res.msg,function () {
						window.location.href = "../index.html"
					})
				},
				error: function(xhr, type, errorThrown) {

				}
			});
		})


	}




	init();
})
