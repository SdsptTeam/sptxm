// ECharts 三个仪表盘
;(function($) {
	$.fn.portalCompositeGaugeCharts = function(options) {
		return this
				.each(function() {
					var domId = $(this).attr("id");
					// 基于准备好的dom，初始化echarts图表
					var normalColor = "#50D198"; // 正常颜色
					var problemColor = "#FF9D9D"; // 异常数据颜色
					var myChart = echarts.init(document.getElementById(domId));
					// 刻度最大值
					var maxV = options.maxV;
					var maxValue = 100;
					if (maxV) {
						maxValue = maxV;
					}
					// 指针宽度
					var pointerW = options.pointerW;
					if (!pointerW) {
						pointerW = 4;
					}
					// 标题字体大小
					var titleFontSize = options.titleFontSize;
					if (!titleFontSize) {
						titleFontSize = 12;
					}
					var detailFontSize = options.detailFontSize;
					if (!detailFontSize) {
						detailFontSize = 16;
					}
					var axisLabelFontSize = options.axisLabelFontSize;
					if (!axisLabelFontSize) {
						axisLabelFontSize = 9;
					}
					var compositeGaugeData = options.chartData;
					// 中间仪表盘
					var centerGauge = compositeGaugeData.centerGauge;
					// left 距离
					var centerLeftX = centerGauge.xLeft;
					if (!centerLeftX) {
						centerLeftX = "50%";
					}
					// Top 距离
					var centerTopY = centerGauge.yTop;
					if (!centerTopY) {
						centerTopY = "50%";
					}
					// 坐标轴线宽
					var axisLineWCenter = centerGauge.axisLineW;
					if (!axisLineWCenter) {
						axisLineWCenter = 12;
					}
					// 坐标轴小标记长
					var axisTickLenCenter = centerGauge.axisTickLen;
					if (!axisTickLenCenter) {
						axisTickLenCenter = 16;
					}
					// 分隔线长度
					var splitLineLenCenter = centerGauge.splitLineLen;
					if (!splitLineLenCenter) {
						splitLineLenCenter = 20;
					}
					// 左仪表盘
					var leftGauge = compositeGaugeData.leftGauge;
					var leftLeftX = leftGauge.xLeft;
					var leftTopY = leftGauge.yTop;
					if (!leftLeftX) {
						leftLeftX = "27%";
					}
					if (!leftTopY) {
						leftTopY = "50%";
					}
					var axisLineWLeft = leftGauge.axisLineW;
					if (!axisLineWLeft) {
						axisLineWLeft = 6;
					}
					// 坐标轴小标记长
					var axisTickLenLeft = leftGauge.axisTickLen;
					if (!axisTickLenLeft) {
						axisTickLenLeft = 8;
					}
					// 分隔线长度
					var splitLineLenLeft = leftGauge.splitLineLen;
					if (!splitLineLenLeft) {
						splitLineLenLeft = 10;
					}
					// 右仪表盘
					var rightGauge = compositeGaugeData.rightGauge;
					var rightLeftX = rightGauge.xLeft;
					var rightTopY = rightGauge.yTop;
					if (!rightLeftX) {
						rightLeftX = "83%";

					}
					if (!rightTopY) {
						rightTopY = "50%";
					}
					var axisLineWRight = rightGauge.axisLineW;
					if (!axisLineWRight) {
						axisLineWRight = 6;
					}
					// 坐标轴小标记长
					var axisTickLenRight = rightGauge.axisTickLen;
					if (!axisTickLenRight) {
						axisTickLenRight = 8;
					}
					// 分隔线长度
					var splitLineLenRight = leftGauge.splitLineLen;
					if (!splitLineLenRight) {
						splitLineLenRight = 10;
					}
					var option = {
						backgroundColor : '#ffffff',
						tooltip : {
							formatter : "{a} <br/>{c}"
						},
						series : [
								{
									name : centerGauge.name,
									type : 'gauge',
									z : 3,
									min : 0,
									center : [ centerLeftX, centerTopY ], // 默认全局居中
									radius : '90%',
									max : maxValue,
									splitNumber : 5,
									axisLine : { // 坐标轴线
										lineStyle : { // 属性lineStyle控制线条样式
											color : [
													[
															(centerGauge.targetV / maxValue)
																	.toFixed(1),
															normalColor ],
													[ 0.8, problemColor ],
													[ 1, problemColor ] ],
											width : axisLineWCenter,
											opacity:0.8
										}
									},
									axisTick : { // 坐标轴小标记
										length : axisTickLenCenter, // 属性length控制线长
										lineStyle : { // 属性lineStyle控制线条样式
											color : 	'auto',
											opacity:0.8
										}
									},
									axisLabel : {
										textStyle : {
											fontSize : axisLabelFontSize
										}
									},
									splitLine : { // 分隔线
										length : splitLineLenCenter, // 属性length控制线长
										lineStyle : { // 属性lineStyle（详见lineStyle）控制线条样式
											color : 'auto',
											opacity:0.8
										}
									},
									pointer : {
										width : pointerW
									},
									title : {
										textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
											fontWeight : '500',
											fontSize : titleFontSize
										},
										offsetCenter : [ 0, '100%' ]
									},
									detail : {
										formatter : '{value}%',
										textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
											fontWeight : '500',
											fontSize : detailFontSize
										},
										offsetCenter : [ 0, '66%' ]
									},
									data : [ {
										value : centerGauge.value,
										name : centerGauge.name
									} ]
								},
								{
									name : leftGauge.name,
									type : 'gauge',
									center : [ leftLeftX, leftTopY ], // 默认全局居中
									radius : '60%',
									min : 0,
									max : maxValue,
									endAngle : 45,
									splitNumber : 3,
									axisLine : { // 坐标轴线
										lineStyle : { // 属性lineStyle控制线条样式
											color : [
													[
															(leftGauge.targetV / maxValue)
																	.toFixed(1),
															normalColor ],
													[ 0.8, problemColor ],
													[ 1, problemColor ] ],
											width : axisLineWLeft,
											opacity:0.8
										}
									},
									axisTick : { // 坐标轴小标记
										splitNumber : 5,
										length : axisTickLenLeft, // 属性length控制线长
										lineStyle : { // 属性lineStyle控制线条样式
											color :  'auto',
											opacity:0.8
										}
									},
									axisLabel : {
										textStyle : {
											fontSize : axisLabelFontSize
										}
									},
									splitLine : { // 分隔线
										length : splitLineLenLeft, // 属性length控制线长
										lineStyle : { // 属性lineStyle（详见lineStyle）控制线条样式
											color : 'auto',
											opacity:0.8
										}
									},
									pointer : {
										width : pointerW
									},
									title : {
										show : true,
										textStyle : {
											fontWeight : '500',
											fontSize : titleFontSize
										},
										offsetCenter : [ 0, '145%' ]
									},
									detail : {
										show : true,
										formatter : '{value}%',
										textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
											fontWeight : '500',
											fontSize : detailFontSize
										},
										offsetCenter : [ 0, '66%' ]
									},
									data : [ {
										value : leftGauge.value,
										name : leftGauge.name
									} ]
								},
								{
									name : rightGauge.name,
									type : 'gauge',
									center : [ rightLeftX, rightTopY ], // 默认全局居中
									radius : '60%',
									min : 0,
									max : maxValue,
									startAngle : 135,
									endAngle : -45,
									splitNumber : 3,
									axisLine : { // 坐标轴线
										lineStyle : { // 属性lineStyle控制线条样式
											color : [
													[
															(rightGauge.targetV / maxValue)
																	.toFixed(1),
															normalColor ],
													[ 0.8, problemColor ],
													[ 1, problemColor ] ],
											width : axisLineWRight,
											opacity:0.8//透明度
										}
									},
									axisTick : { // 坐标轴小标记
										splitNumber : 5,
										length : axisTickLenRight, // 属性length控制线长
										lineStyle : { // 属性lineStyle控制线条样式
											color :  'auto',
											opacity:0.8//透明度
										}
									},
									axisLabel : {
										textStyle : {
											fontSize : axisLabelFontSize
										}
									},
									splitLine : { // 分隔线
										length : splitLineLenRight, // 属性length控制线长
										lineStyle : { // 属性lineStyle（详见lineStyle）控制线条样式
											color :  'auto',
											opacity:0.8//透明度
										}
									},
									pointer : {
										width : pointerW
									},
									title : {
										show : true,
										textStyle : {
											fontSize : titleFontSize,
											fontWeight : '500'
										},
										offsetCenter : [ 0, '145%' ]
									},
									detail : {
										show : true,
										formatter : '{value}%',
										textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
											fontWeight : '500',
											fontSize : detailFontSize
										},
										offsetCenter : [ 0, '66%' ]
									},
									data : [ {
										value :rightGauge.value,
										name :rightGauge.name
									} ]
								} ]
					};
					// 为echarts对象加载数据
					myChart.setOption(option);
					window.addEventListener("resize",function(){
						myChart.resize();
					});
				});
	}
})(jQuery);