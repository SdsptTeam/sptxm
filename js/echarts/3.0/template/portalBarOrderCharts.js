// ECharts 排名条形图
;
(function($) {
	$.fn.portalBarOrderCharts = function(options) {
		return this.each(function() {
					var domId = $(this).attr("id");
					// 基于准备好的dom，初始化echarts图表
					var myChart = echarts.init(document
							.getElementById(domId));
					var chartTitle = options.title;
					var chartData = options.chartData;
					var barColor = options.barColor;
					if(!barColor){
						barColor = "#3498db";
					}
					var barData =  chartData.bar;
					var yAxisDataArr = chartData.yAxis;
					var xLabel = chartData.xLabel;
					if(!xLabel){
						xLabel = "";
					}
					var xMax=chartData.xMax;
					var xMin=chartData.xMin;
					
					var xaData;
					
					if(xMin && xMax){
						xaData={
								type : "value",
								boundaryGap : [0, 0.01],
								min:'70',
								max:'80',
								name:xLabel
						}								
					}else{									
						xaData={
								type : "value",
								boundaryGap : [0, 0.01],
								name:xLabel
						}
					}
					
					var option = {
						title : {
							text : chartTitle,
							x:"center"
						},
						tooltip : {
							trigger : "axis"
						},
						grid:{
							y:30,
							x:150
						},
						
						xAxis : [
									xaData
								],
								
						yAxis : [{
							type : "category",
							data : yAxisDataArr,
							position : "bottom"
						}],
						series : [{
							name : chartData.name,
							type : "bar",
							data : barData,
							itemStyle : {
								normal : {
									color : barColor
								}
							}
						}]
					}
					var caption = options.caption;
					if (caption) {
						option.title.text = caption;
					}
					// 为echarts对象加载数据 
					myChart.setOption(option);
				});
	}
})(jQuery);