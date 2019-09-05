// ECharts 山东地图
var shandongMapUrl = "js/echarts/3.0/map/shandong.js";
document.write('<script src="' + shandongMapUrl + '"><\/script>');
$(function() {
	//地图
	var dataArr = [];
	//左侧柱状图数据
	var sheng = [];
	var yljgxg;

	//地图数据相关
	var valArr = []; // 数组最大值
	var dataMaxV = 200;
	$.ajax({
		url: "js/json/hospitalReg.json",

		dataType: "json",
		async: false,
		success: function(result) {

			dataArr = result;

		}
	});
	for (var i = 0; i < dataArr.length; i++) {
		valArr.push(dataArr[i].value);
	}
	dataMaxV = Math.max.apply(null, valArr);

	//end


	$.ajax({
		url: "js/json/sheng.json",

		dataType: "json",
		async: false,
		success: function(result) {

			sheng = result;

		}
	});
	$.ajax({
		url: "js/json/yljgxg.json",

		dataType: "json",
		async: false,
		success: function(result) {

			yljgxg = result;

		}
	});
	$("#hospitalNum").text(yljgxg.hospitalNum);
	$("#jiuzhinengli").text(yljgxg.jiuzhinengli);
	$("#zcwqd").text(yljgxg.zcwqd);
	$("#zqdjsl").text(yljgxg.zqdjsl);
	$("#yjzcl").text(yljgxg.yjzcl);
	$("#yjqdjsl").text(yljgxg.yjqdjsl);
	var cityName = [];
	var zhuNum = [];
	for (var i = 0; i < sheng.length; i++) {
		cityName.push(sheng[i].city);
		zhuNum.push(sheng[i].num);
	}




	zhu();
	bing();

	function bing() {

		var myChart = echarts.init(document.getElementById('bingmain'));
		option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},

			color: ['#ac4ed3', '#00af6d', '#0e6de9'],
			legend: {
				orient: 'vertical',
				x: 'left',
				data: ['一级医院', '二级医院', '三级医院'],
				top:'21%',
				textStyle: {
					color: '#43d4ff',
					
				}


			},
			series: [{
				name: '访问来源',
				type: 'pie',
				radius: ['43%', '60%'],
				center: ['55%', '56%'],
				avoidLabelOverlap: false,
				label: {
					normal: {
						show: false,
						position: 'center'
					},
					emphasis: {
						show: true,
						textStyle: {
							fontSize: '20',
							fontWeight: 'bold'

						}
					}
				},
				labelLine: {
					normal: {
						show: false
					}
				},
				data: [{
						value: 335,
						name: '一级医院'
					},
					{
						value: 310,
						name: '二级医院'
					},
					{
						value: 234,
						name: '三级医院'
					}

				]
			}]
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		//自适应
		window.addEventListener("resize", function() {
			myChart.resize();
		});
	}
$("#level3").text("234"+" 家");
$("#level2").text("310"+" 家");
$("#level1").text("335"+" 家");

	function zhu() {
		//柱状图
		var myChart = echarts.init(document.getElementById('zhumain'));

		option = {

			grid: {
				bottom: '1%',
				containLabel: true
			},
			xAxis: {

				show: false
			},
			yAxis: {
				data: cityName,
				axisTick: {
					show: false
				},
				axisLine: {
					show: false,

				},
				axisLabel: {

					fontSize: 15,
					color: '#43d4ff'

				},


			},
			series: [{
				name: '',
				type: 'bar',
				barWidth: '40%',
				data: zhuNum,
				itemStyle: {

					emphasis: {
						barBorderRadius: 7
					},
					normal: {
						barBorderRadius: 15,
						color: new echarts.graphic.LinearGradient(
							0, 0, 1, 0,
							[{
									offset: 0,
									color: '#3977E6'
								},
								{
									offset: 1,
									color: '#37BBF8'
								}

							]
						),
						label: {
							show: true, //开启显示
							position: 'right', //在右方显示
							textStyle: { //数值样式
								color: 'aqua',
								fontSize: 15
							}
						}
					},


				}
			}]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		//自适应
		window.addEventListener("resize", function() {
			myChart.resize();
		});
	}
	$.fn.strokerShandongMapCharts = function(options) {
		var myChart = echarts.init(document.getElementById('mapmain'));
		//存储切换的每一级地图信息
		var mapStack = [];
		var cityMap = {
			"济南市": "370100",
			"青岛市": "370200",
			"淄博市": "370300",
			"枣庄市": "370400",
			"东营市": "370500",
			"烟台市": "370600",
			"潍坊市": "370700",
			"济宁市": "370800",
			"泰安市": "370900",
			"威海市": "371000",
			"日照市": "371100",
			"莱芜市": "371200",
			"临沂市": "371300",
			"德州市": "371400",
			"聊城市": "371500",
			"滨州市": "371600",
			"菏泽市": "371700"
		};
		var timeFn = null;
		var curMap = {};
		//初始化为中国地图
		fristloadMap();
		//loadMap('shandong', '山东');
		/**
		   绑定用户切换地图区域事件
		   cityMap对象存储着地图区域名称和区域的信息(name-code)
		   当mapCode有值,说明可以切换到下级地图
		   同时保存上级地图的编号和名称  
		*/
		myChart.on('click', function(params) {

			clearTimeout(timeFn);
			//由于单击事件和双击事件冲突，故单击的响应事件延迟250毫秒执行
			timeFn = setTimeout(function() {
				var name = params.name;
				var mapCode = cityMap[name];
				if (!mapCode) {
					alert('无此区域地图显示');
					return;
				}
				//打开一个新的页面根据code显示地图
				//window.location.href = ("sdNewDiTu.action?method=getShi&cityId="+mapCode+"&cityName="+$.encodeUTF8(name));
				//window.location.href = ("sdNewDiTu.action?method=getShi&cityId="+mapCode+"&cityName="+name);
				myChart.clear();
				loadMap(mapCode, name);
				//将上一级地图信息压入mapStack
				mapStack.push({
					mapCode: curMap.mapCode,
					mapName: curMap.mapName
				});
			}, 250);
		});
		/**
		   绑定双击事件，并加载上一级地图
		*/
		myChart.on('dblclick', function(params) {
			//当双击事件发生时，清除单击事件，仅响应双击事件
			clearTimeout(timeFn);
			var map = mapStack.pop();
			if (!mapStack.length && !map) {
				alert('已经到达最上一级地图了');
				return;
			}
			myChart.clear();
			fristloadMap();
		});
		/**
		   加载地图：根据地图所在省市的行政编号，
		   获取对应的json地图数据，然后向echarts注册该区域的地图
		   最后加载地图信息
		   @params {String} mapCode:地图行政编号,for example['中国':'100000', '湖南': '430000']
		   @params {String} mapName: 地图名称
		*/
		function loadMap(mapCode, mapName) {

			$.getJSON("js/echarts/3.0/map/" + mapCode + '.json', function(data) {
				if (data) {
					echarts.registerMap(mapName, data);
					var option = {

						tooltip: {
							trigger: 'item',
							formatter: '{b}'
						},
						series: [{
							name: '',
							type: 'map',
							mapType: mapName,
							selectedMode: 'multiple',

							label: {

								normal: {
									show: true,
									color: '#fff',
									fontSize: 15,
								},
								emphasis: {
									show: true
								}
							},
							itemStyle: {
								areaColor: '#0033cb',
								borderColor: '#7EA1FA',
								borderWidth: '2',

							},
							data: []
						}]
					};
					myChart.setOption(option);
					curMap = {
						mapCode: mapCode,
						mapName: mapName
					};
				} else {
					alert('无法加载该地图');
				}
			});
		}


		//var chart = echarts.init(document.getElementById(domId));
		function fristloadMap() {
			// $.getJSON("js/echarts/3.0/map/shandong.json", function(data) {
			myChart.setOption({
				tooltip: {
					show: true,
					formatter: "{b}:{c}（个）"
				},
				visualMap: {
					min: 0,
					max: dataMaxV,
					left: '80%',

					bottom: "2%",
					text: ['High', 'Low'],
					color: '#fff',
					textStyle: {
						color: ["#33DD39"]
					},
					inRange: {
						color: ['#5c02a2', '#062bc1', '#2869f9', '#1b9bfe', '#04c5fe', '#05eeb7']
					},
					calculable: true,
					show: true
				},
				geo: {
					map: '山东',
					left: '5.6%',
					top: '10%',
					right: 'auto',
					bottom: 'auto',
					aspectScale: 0.8,
					zoom: 1.12,
					label: {
						normal: {
							show: true,
							color: '#fff'

						}
					},
					itemStyle: {
						normal: {
							color: '#4EDEBD',
							borderWidth: 1,
							borderColor: '#fff'
						},
						emphasis: {
							areaColor: '#51AEFA',
							shadowOffsetX: 0,
							shadowOffsetY: 0,
							shadowBlur: 20,
							borderWidth: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					},
					layoutCenter: ['45%', '50%'],
					layoutSize: '80%'
				},
				series: [{
					type: 'map',
					geoIndex: 0,
					label: {
						normal: {
							show: true,
							textStyle: {
								color: ["#000"]
							},
							borderWidth: 1,
							borderColor: '#83AAF0',
							color: '#FFA584'
						},
						emphasis: {
							show: true
						}
					},
					data: dataArr
				}]
			});

			// });
		}



		//自适应
		window.addEventListener("resize", function() {
			myChart.resize();
		});
	}
})
