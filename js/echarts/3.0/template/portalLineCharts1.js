// ECharts 趋势图
;
(function($) {
	$.fn.portalLineCharts1 = function(options) {
		return this
				.each(function() {
					var domId = $(this).attr("id");
					// 基于准备好的dom，初始化echarts图表
					var myChart = echarts.init(document.getElementById(domId));
					var chartTitle = options.title;
					var chartData = options.chartData;
					var xAxisData = chartData.xAxis;
					var yLabel = chartData.yLabel;
					var xLabel = chartData.xLabel;
					var legendX = 0;
					var legendXV = options.legendX;
					if (legendXV) {
						legendX = legendXV;
					}
					var legendY = 190;
					var legendYV = options.legendY;
					if (legendYV) {
						legendY = legendYV;
					}
					var legendArr = [];
					var name = chartData.name;
					var lineData = chartData.line;
					var seriesArr = [];
					if (name && lineData) {
						seriesArr.push({
							name : name,
							type : "line",
							itemStyle : {
								normal : {
									color : '#2ec7c9'
								}
							},
							data : lineData
						});
						legendArr.push(name);
					}
					var lastName = chartData.lastName;
					var lastLine = chartData.lastLine;
					if (lastName && lastLine) {
						seriesArr.push({
							name : lastName,
							type : "line",
							itemStyle : {
								normal : {
									color : '#cbbde6'
								}
							},
							data : lastLine
						});
						legendArr.push(lastName);
					}
					var option = {
						title : {
							text : chartTitle,
							x : "center"
						},
						legend : {
							data : legendArr,
							orient : 'vertical'
						},
						grid : {
							x : 40,
							y : 20,
							x2 : 30,
							y2 : 30
						},
						tooltip : {
							trigger : 'axis',
							padding : 10,
							backgroundColor : '#777',
							borderColor : '#111',
							color : '#fff',
							borderWidth : 1,
							formatter : function(params) {
								var yearObj = params[0];
								var htmlArr = [];
								htmlArr.push("<div style='border-bottom: 1px solid rgba(200,200,200,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px'>");
								if(yearObj){
									htmlArr.push('第'+Number(yearObj.axisValue) + xLabel
									+ '</div>');
									htmlArr.push(yearObj.seriesName
									+ '：'
									+ yearObj.value+yLabel);
								}
								var lastYearObj = params[1];
								if(lastYearObj){
									htmlArr.push('<br>'
									+ lastYearObj.seriesName
									+ '：'
									+ lastYearObj.value+yLabel);
								}

								return htmlArr.join("");

							}
						},
						xAxis : [ {
							type : "category",
							boundaryGap : false,
							data : xAxisData,
							name : xLabel,
							nameTextStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
								fontSize : 14,
								color : "black"
							}
						} ],
						yAxis : [ {
							type : "value",
							name : yLabel,
							nameLocation : "end",
							position : "left",
							nameTextStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
								fontSize : 14,
								color : "black"
							}
						} ],
						series : seriesArr
					}
					var caption = options.caption;
					if (caption) {
						option.title.text = caption;
					}
					// 为echarts对象加载数据
					myChart.setOption(option);
					window.addEventListener("resize",function(){
						myChart.resize();
					});
				});
	}
})(jQuery);