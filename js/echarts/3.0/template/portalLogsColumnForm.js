// ECharts 时间趋势图
;
(function($) {
	$.fn.portalLogsColumnForm = function(options) {
		return this.each(function() {
			var domId = $(this).attr("id");
			// 基于准备好的dom，初始化echarts图表
			var myChart = echarts.init(document.getElementById(domId),'dark');
			var functionName=options.functionName;
			var date1=options.date1;
			var date2=options.date2;
			option = {
					backgroundColor : '#eff9fc',//背景色
					title : {
						text : '委领导功能点击量总计（前十）',
						subtext : '',
						x : 'center'
					},
					tooltip : {
						trigger : 'axis',
						axisPointer : { // 坐标轴指示器，坐标轴触发有效
							type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						},
						formatter : function(params) {
							var tar = params[1];
							return tar.name + ' : '
									+ tar.value;
						}
					},
		            grid:{
		             x:80,
		             x2:70,
		             y2:80
		            },
					xAxis : [ {
						type : 'category',
						name : '功能名称',
						splitLine : {
							show : false
						},
					data : functionName,
						axisLabel:{
						interval:0,
						rotate:-30    //倾斜x轴的单位
						},
					} ],
					yAxis : [ {
						type : 'value',
						name : '功能点击量（次）',
							axisLabel:{
						interval:0,
					
						},
					} ],
					series : [ {
						name : '辅助',
						type : 'bar',
						stack : '总量',
						itemStyle : {
							normal : {
								barBorderColor : 'rgba(0,0,0,0)',
								color : 'rgba(0,0,0,0)'
							},

							emphasis : {
								barBorderColor : 'rgba(0,0,0,0)',
								color : 'rgba(0,0,0,0)'
							}
						},
						data :date2
					}, {
						name : '功能点击量',
						type : 'bar',
						stack : '总量',
						itemStyle : {
							normal : {
								color : '#FA7753',
								label : {
									show : true,
									position : 'inside'
								}
							}
						},
						data : date1
					} ]
				};
	
			// 为echarts对象加载数据 
			myChart.setOption(option);   
			window.addEventListener("resize",function(){
				myChart.resize(); 
			})
		});
	}
})(jQuery);
