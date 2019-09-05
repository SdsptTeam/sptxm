// ECharts 柱状图和折线图
;
(function($) {
	$.fn.portalBarLineCharts = function(options) {
		return this.each(function() {
			var domId = $(this).attr("id");
			// 基于准备好的dom，初始化echarts图表
			var myChart = echarts.init(document.getElementById(domId));
			var chartTitle = options.title;
			var chartData = options.chartData;
			var barColor = options.barColor;
			if (!barColor) {
				barColor = "#65c3f9";
			}
			var barData = chartData.bar;
			var lineData = chartData.line;
			var xAxisDataArr = chartData.xAxis;
			var dataArr = options.dataArr;
			var yAxisArr = [];
			var seriesArr = [];
			var gridY2 = 40;
			var gridY2V = options.gridY2;
			var yAxisIndex = 0;
			if(lineData){
				if(lineData.yAxisIndex){
					yAxisIndex = lineData.yAxisIndex;
				}
			}
			if (gridY2V) {
				gridY2 = gridY2V;
			}
			var xLabel = chartData.xAxisLabel;
			if (!xLabel) {
				xLabel = "";
			}
			var legendArr = [];
			if (barData) {
				yAxisArr.push({
					type : 'value',
					name : barData.yAxisLabel,
					nameTextStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontSize : 14,
						color : "black"
					},
					axisLine : {
						show:false
					},
					axisTick:{
						show:false
					}
				});
				seriesArr.push({
					name : barData.name,
					type : 'bar',
					barWidth: '40%',
					data : barData.dataArr,
					itemStyle : {
						normal: {
		                    //柱形图圆角，初始化效果
							color:barColor,
		                    barBorderRadius:[50, 50, 0, 0],
		                }
					}
				});
			}
			if (lineData) {
				yAxisArr.push({
					type : 'value',
					name : lineData.yAxisLabel,
					nameTextStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontSize : 14,
						color : "black"
					},
					splitLine : {
						show : false
					}
				});
				seriesArr.push({
					name : lineData.name,
					type : 'line',
					yAxisIndex : yAxisIndex,
					data : lineData.dataArr
				});
			}

			var option = {
				backgroundColor : "#ffffff",
				title : {
					text : chartTitle,
					x : "center",
					textStyle : {
						fontWeight : "500",
						fontSize : 14
					}
				},
				grid : {
					x : 50,
					x2 : 30,
					y : gridY2
				},
				tooltip : {
					trigger : 'axis'
				},
				/*
				 * grid:{ x2:40 },
				 */
				xAxis : [ {
					type : 'category',
					data : xAxisDataArr,
					name : xLabel,
					nameTextStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontSize : 14,
						color : "black"
					},
					axisLine : {
						show:false
					},
					axisTick:{
						show:false
					},
					splitLine : {
						show : false
					}
				} ],
				yAxis : yAxisArr,
				series : seriesArr
			};
			// 为echarts对象加载数据
			myChart.setOption(option);
			window.addEventListener("resize",function(){
				myChart.resize();
			});
		});
	}
})(jQuery);