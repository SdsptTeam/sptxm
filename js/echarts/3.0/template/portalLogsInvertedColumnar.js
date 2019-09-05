// ECharts 时间趋势图
;
(function($) {
	$.fn.portalLogsInvertedColumnar  = function(options) {
		return this.each(function() {
			var domId = $(this).attr("id");
			// 基于准备好的dom，初始化echarts图表
			var myChart = echarts.init(document.getElementById(domId),'dark');
			var functionName=options.functionName;
			var date=options.date;

			option = {
					backgroundColor : '#eff9fc',//背景色
					title : {
						text : '各机关单位功能总点击量排名',

					},
					tooltip : {
						trigger : 'axis'
					},
					legend : {
						data : [ '访问量' ]
					},
		            grid:{
		             x:80,
		             x2:70
		            },
					calculable : true,
					xAxis : [ {
						type : 'value',
						name : '总点击量',
						boundaryGap : [ 0, 0.01 ],
							axisLabel:{
						interval:0,
						//rotate:-30    //倾斜x轴的单位
						},
					} ],
					yAxis : [ {
						

						data : functionName
					} ],
					series : [ {
						name : '访问量',
						type : 'bar',
						itemStyle : {
							normal : {

								color : '#00868B',

							}
						},
						data :date
					},

					]
				};
	
			// 为echarts对象加载数据 
			myChart.setOption(option);   
			window.addEventListener("resize",function(){
				myChart.resize(); 
			})
		});
	}
})(jQuery);
