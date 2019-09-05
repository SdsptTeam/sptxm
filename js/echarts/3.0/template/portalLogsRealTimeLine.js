// ECharts 时间趋势图
;
(function($) {
	$.fn.portalLogsRealTimeLine = function(options) {
		return this.each(function() {
			var domId = $(this).attr("id");
			// 基于准备好的dom，初始化echarts图表
			var myChart = echarts.init(document.getElementById(domId),'dark');
			var timedate=options.timedate;
			var accountdate=options.accountdate;
				 option = {

							backgroundColor : '#eff9fc',//背景色
							title : {
								text : '过去一周人员访问量',

								x : 'center',
								y : 'top'
							},
							tooltip : {
								trigger : 'axis'
							},

							calculable : true,
							xAxis : [ {
								type : 'category',
								boundaryGap : false,
								data : timedate//["星期一","星期二"]
							} ],
							yAxis : [ {
								type : 'value',
								axisLabel : {
									formatter : '{value} '
								},
								name : '访问量(次)'
							} ],
							series : [ {
								name : '访问量',
								type : 'line',
								data :accountdate,
								itemStyle : {
									normal : {
										color : '#22B8DD',
										lineStyle : {
											color : '#22B8DD',
										}
									}
								},
								markPoint : {

									data : [ {
										type : 'max',
										name : '最大值'
									}, {
										type : 'min',
										name : '最小值'
									} ]
								},

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
