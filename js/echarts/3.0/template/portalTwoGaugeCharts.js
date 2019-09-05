// ECharts 两个仪表盘
;
(function($) {
	$.fn.portalTwoGaugeCharts = function(options) {
		return this
				.each(function() {
					var domId = $(this).attr("id");
					// 基于准备好的dom，初始化echarts图表
					var normalColor = "#228b22"; // 正常颜色
					var problemColor = "#ff4500"; // 异常数据颜色
					var greatTargetVGood = options.greatTargetVGood;
					if (greatTargetVGood && greatTargetVGood == 1) {
						normalColor = "#ff4500";
						problemColor = "#228b22";
					}
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
						pointerW = 2;
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
						axisLabelFontSize = 14;
					}
					var compositeGaugeData = options.chartData;
					// 左仪表盘
					var leftGauge = compositeGaugeData.leftGauge;
					var leftUnit = leftGauge.unit;

					var formatterContentLeft;
					if (leftUnit) {
						formatterContentLeft = '{value}' + leftUnit;
					} else {
						formatterContentLeft = '{value}%'
					}

					var leftLeftX = leftGauge.xLeft;
					var leftTopY = leftGauge.yTop;
					if (!leftLeftX) {
						leftLeftX = "28%";
					}
					if (!leftTopY) {
						leftTopY = "60%";
					}

					var axisLineWLeft = leftGauge.axisLineW;
					if (!axisLineWLeft) {
						axisLineWLeft = 4;
					}
					// 坐标轴小标记长
					var axisTickLenLeft = leftGauge.axisTickLen;
					if (!axisTickLenLeft) {
						axisTickLenLeft = 6;
					}
					// 分隔线长度
					var splitLineLenLeft = leftGauge.splitLineLen;
					if (!splitLineLenLeft) {
						splitLineLenLeft = 10;
					}
					// 右仪表盘
					var rightGauge = compositeGaugeData.rightGauge;
					var rightUnit = rightGauge.unit;

					var formatterContentRight;
					if (rightUnit) {
						formatterContentRight = '{value}' + rightUnit;
					} else {
						formatterContentRight = '{value}%'
					}

					var rightLeftX = rightGauge.xLeft;
					var rightTopY = rightGauge.yTop;
					if (!rightLeftX) {
						rightLeftX = "72%";

					}
					if (!rightTopY) {
						rightTopY = "60%";
					}
					var axisLineWRight = rightGauge.axisLineW;
					if (!axisLineWRight) {
						axisLineWRight = 4;
					}
					// 坐标轴小标记长
					var axisTickLenRight = rightGauge.axisTickLen;
					if (!axisTickLenRight) {
						axisTickLenRight = 6;
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
									name : compositeGaugeData.leftGauge.name,
									type : 'gauge',
									center : [ leftLeftX, leftTopY ], // 默认全局居中
									radius : '90%',
									min : 0,
									max : maxValue,
									startAngle : 180,
									endAngle : 0,
									splitNumber : 5,
									axisLine : { // 坐标轴线
										lineStyle : { // 属性lineStyle控制线条样式
											color : [
													[
															compositeGaugeData.leftGauge.targetV
																	/ maxValue,
															normalColor ],
													[ 0.8, problemColor ],
													[ 1, problemColor ] ],
											width : axisLineWLeft
										}
									},
									axisTick : { // 坐标轴小标记
										splitNumber : 5,
										length : axisTickLenLeft, // 属性length控制线长
										lineStyle : { // 属性lineStyle控制线条样式
											color : 'auto'
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
											color : 'auto'
										}
									},
									pointer : {
										width : pointerW
									},
									title : {
										show : true,
										textStyle : {
											fontWeight : 'bolder',
											fontSize : titleFontSize
										},
										offsetCenter : [ 0, '70%' ]
									},
									detail : {
										show : true,
										formatter : formatterContentLeft,
										textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
											fontWeight : 'bolder',
											fontSize : detailFontSize
										},
										offsetCenter : [ 0, '10%' ]
									},
									data : [ {
										value : compositeGaugeData.leftGauge.value,
										name : compositeGaugeData.leftGauge.name
									} ]
								},
								{
									name : compositeGaugeData.rightGauge.name,
									type : 'gauge',
									center : [ rightLeftX, rightTopY ], // 默认全局居中
									radius : '90%',
									min : 0,
									max : maxValue,
									startAngle : 180,
									endAngle : 0,
									splitNumber : 5,
									axisLine : { // 坐标轴线
										lineStyle : { // 属性lineStyle控制线条样式
											color : [
													[
															compositeGaugeData.rightGauge.targetV
																	/ maxValue,
															normalColor ],
													[ 0.8, problemColor ],
													[ 1, problemColor ] ],
											width : axisLineWRight
										}
									},
									axisTick : { // 坐标轴小标记
										splitNumber : 5,
										length : axisTickLenRight, // 属性length控制线长
										lineStyle : { // 属性lineStyle控制线条样式
											color : 'auto'
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
											color : 'auto'
										}
									},
									pointer : {
										width : pointerW
									},
									title : {
										show : true,
										textStyle : {
											fontSize : titleFontSize,
											fontWeight : 'bolder'
										},
										offsetCenter : [ 0, '70%' ]
									},
									detail : {
										show : true,
										formatter : formatterContentRight,
										textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
											fontWeight : 'bolder',
											fontSize : detailFontSize
										},
										offsetCenter : [ 0, '10%' ]
									},
									data : [ {
										value : compositeGaugeData.rightGauge.value,
										name : compositeGaugeData.rightGauge.name
									} ]
								} ]
					};
					// 为echarts对象加载数据
					myChart.setOption(option);
				});
	}
})(jQuery);