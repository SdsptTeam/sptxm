// ECharts 柱状堆积图
;
(function($) {
	$.fn.portalBarStackedPlotCharts = function(options) {
		return this.each(function() {
			var domId = $(this).attr("id");
			// 基于准备好的dom，初始化echarts图表
			var myChart = echarts.init(document.getElementById(domId));
			var chartTitle = options.title;
			var chartData = options.chartData;
			var xAxisData = chartData.xAxis;
			var yLabel = chartData.yLabel;
			var stackColorArr = options.stackColorArr;
			var xRotate=chartData.rotate;
			if(!xRotate){
				xRotate=0;
			}
			if (!yLabel) {
				yLabel = "万元";
			}
			var xLabel = chartData.xLabel;
			if (!xLabel) {
				xLabel = "";
			}
			var gridY = 50;
			var gridYV = options.gridY;
			if (gridYV) {
				gridY = gridYV;
			}
			var legendY = 'bottom';
			var legendYV = options.legendY;
			if (legendYV) {
				legendY = legendYV;
			}
			var legendX = 'left';
			var legendXV = options.legendX;
			if (legendXV) {
				legendX = legendXV;
			}
			var orient = 'vertical';
			var orientV = options.orient;
			if (orientV) {
				orient = orientV;
			}
			var barArr = chartData.bar;
			var seriesArr = [];
			var legendArr = [];
			if (barArr.name && barArr.data) {
				seriesArr.push({
					name : barArr.name,
					type : "bar",
					data : barArr.data
				});
				legendArr.push(barArr.name);
			}
			if (barArr.stack) {
				var stackArr = barArr.stack;
				if(!stackColorArr){
					stackColorArr = [ '#6FD6FF', '#B3EE3A', '#afd6dd' ];
				}
				seriesArr.push({
					name : stackArr[0].name,
					type : "bar",
					data : stackArr[0].data,
					stack : barArr.name,
					 barWidth : 10,//柱图宽度
				      itemStyle: {
			                //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
			                emphasis: {
			                    barBorderRadius:[0, 0, 0, 0]
			                },

			                normal: {
			                		color : stackColorArr[0],
			                    //柱形图圆角，初始化效果
			                    barBorderRadius:[0, 0, 0, 0],
			                    label: {
			                        show: false,//是否展示
			                        textStyle: {
			                            fontWeight:'bolder',
			                            fontSize : '12',
			                            fontFamily : '微软雅黑',
			                        }
			                    }
			                }
			            },
				});
				legendArr.push(stackArr[0].name);
				for ( var i = 1, len = stackArr.length; i < len; i++) {
					seriesArr.push({
						name : stackArr[i].name,
						type : "bar",
						data : stackArr[i].data,
						stack : barArr.name,
						 barWidth : 10,//柱图宽度
					      itemStyle: {
				                //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
				                emphasis: {
				                    barBorderRadius: 30
				                },

				                normal: {
				                    //柱形图圆角，初始化效果
				                    color : stackColorArr[i],
				                    barBorderRadius:[50, 50, 0, 0],
				                    label: {
				                        show: false,//是否展示
				                        textStyle: {
				                            fontWeight:'bolder',
				                            fontSize : '12',
				                            fontFamily : '微软雅黑',
				                        }
				                    }
				                }
				            },
					});
					legendArr.push(stackArr[i].name);
				}
			}
			var option = {
				backgroundColor : '#ffffff',
				tooltip : {
					trigger : 'axis',
					axisPointer : { // 坐标轴指示器，坐标轴触发有效
						type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid : {
					x : 60,
					x2 : 30,
					y : gridY
				},
				legend : {
					data : legendArr,
					orient : orient,
					y : legendY,
					x : legendX
				},
				xAxis : [ {
					type : 'category',
					data : xAxisData,
					name : xLabel,
					nameTextStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontSize : 14,
						color : "black"
					},
					axisLabel: {
						interval:0,//横轴信息全部显示  
                        rotate:xRotate//30度角倾斜显示  
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
				yAxis : [ {
					type : 'value',
					name : yLabel,
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
					
					
				} ],
				series : seriesArr
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