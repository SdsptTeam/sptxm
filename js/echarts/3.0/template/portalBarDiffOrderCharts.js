// ECharts 差值排名条形图
;
(function($) {
	$.fn.portalBarDiffOrderCharts = function(options) {
		return this.each(function() {
			var domId = $(this).attr("id");
			// 基于准备好的dom，初始化echarts图表
			var myChart = echarts.init(document.getElementById(domId));
			var chartTitle = options.title;

			var chartData = options.chartData;
			var barColor = options.barColor;
			if (!barColor) {
				barColor = "#6FD6FF";
			}
			var chartName = chartData.name;
			var yAxisDataArr = chartData.yAxis;
			var barDataArr = chartData.bar;
			var gridX = options.gridX;
			if (!gridX) {
				gridX = 87;
			}
			var xLabel = chartData.xLabel;
			if (!xLabel) {
				xLabel = "(%)";
			}
			// 小于目标值颜色
			var labelLowTarget = {
				normal : {
					color : 'green'
				}
			};
			// 大于目标值颜色
			var labelOverTarget = {
				normal : {
					color : barColor
				}
			};
			var seriesDataArr = [];
			for ( var i = 0, len = barDataArr.length; i < len; i++) {
				var barDataV = barDataArr[i];
				if (barDataV < 0) {
					seriesDataArr.push({
						value : barDataV,
						itemStyle : labelLowTarget
					});
				} else {
					seriesDataArr.push({
						value : barDataV,
						itemStyle : labelOverTarget
					});
				}
			}

			var option = {

			
				title : {
					text : chartTitle,
					top: '10%',
					x : 'center',
					     textStyle:{
					        //文字颜色
					        color:'#222222',
					        //字体风格,'normal','italic','oblique'
					        fontStyle:'normal',
					        //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
					        fontWeight:'normal',
					        //字体大小
					　　　　 fontSize:14

					    }
					
				},
				tooltip : {
					trigger : 'axis',
					axisPointer : { // 坐标轴指示器，坐标轴触发有效
						type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				xAxis : [ {
					type : 'value',
					position : 'top',
					name : xLabel,
					axisLine : {
						show : false
					},
			
					axisTick : {
						show : false
					},
					splitLine : {
						show : false
					},
					splitLine : {
						lineStyle : {
							type : 'dashed'
						}
					}
				} ],
				grid : {
					x : gridX,
					y:'30%',
				},
				yAxis : [ {
					type : 'category',
					axisLine : {
						show : false
					},
					axisLabel : {
						show : false,
			
						
					},
					axisTick : {
						show : false
					},
					splitLine : {
						show : false
					},
					data : yAxisDataArr
				} ],
				series : [ {
					name : chartName,
					type : 'bar',
					stack : '差值',
				  barWidth : 10,//柱图宽度
				  barCategoryGap:15,
					itemStyle : {
						  emphasis: {
			                    barBorderRadius:[0, 50, 50, 0]
			                },
						normal : {
							color : 'orange',
	
		                    barBorderRadius:[50, 50, 50, 50],
						  label: {
		                        show: true,//是否展示
		                    	position : 'left',
								formatter : '{b}',
								 textStyle:{
								        //文字颜色
								        color:'#222222',
								        //字体风格,'normal','italic','oblique'
								        fontStyle:'normal',
								        //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
								        fontWeight:'normal',
								       
								        //字体大小
								　　　　 fontSize:11

								    }
		                    }
						}
					},
					data : seriesDataArr
				} ]
			};
			var caption = options.caption;
			if (caption) {
				option.title.text = caption;
			}
			// 为echarts对象加载数据
			myChart.setOption(option);
		});
	}
})(jQuery);