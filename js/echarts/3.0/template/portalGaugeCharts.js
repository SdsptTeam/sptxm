// ECharts仪表盘
;(function($) {
	$.fn.portalGaugeCharts = function(options) {
		return this.each(function() {
			var domId = $(this).attr("id");
						// 基于准备好的dom，初始化echarts图表
			var normalColor = "#50D198"; // 正常颜色
			var problemColor = "#FF9D9D"; // 异常数据颜色
						var myChart = echarts.init(document.getElementById(domId));
						var title = options.title;
						var dataArr = options.chartData;
						var greatTargetVGood = options.greatTargetVGood;
						if(greatTargetVGood && greatTargetVGood == 1){
							normalColor = "#ff4500";
							problemColor = "#228b22";
						}
						var formatLabelV = options.formatLabel;
						var maxV = options.maxV;
						var maxValue = 100;
						if(maxV){
							maxValue = maxV;
						}
						// 标题字体大小
						var titleFontSize = options.titleFontSize;
						if(!titleFontSize){
							titleFontSize = 12;
						}
						//仪表盘圆的宽度
						var axisLineW = options.axisLineW;
						if(!axisLineW){
							axisLineW = 12;
						}
						// 坐标轴小标记长
						var axisTickLen = options.axisTickLen;
						if(!axisTickLen){
							axisTickLen = 14;
						}
						// 分隔线长度
						var splitLineLen = options.splitLineLen;
						if(!splitLineLen){
							splitLineLen = 20;
						}
						//刻度字体大小
						var axisLabelFontSize = options.axisLabelFontSize;
						if(!axisLabelFontSize){
							axisLabelFontSize = 9;
						}
						var detailFontSize = options.detailFontSize;
						if(!detailFontSize){
							detailFontSize = 16;
						}
						var targetV = options.targetV;
						var option = {
							title : {
								x : 'center',
								y : 'bottom'
							},
							tooltip : {
								formatter : "{a} <br/>{b} : {c}"
							},
							series : [{
										radius : '100%',
										center : ['50%', '60%'],
										axisLine : {
											lineStyle : {
												color : [
																[targetV/maxValue, normalColor],
																[0.8, problemColor],
																[1, problemColor]
														],
												width : axisLineW,
												opacity:0.8//透明度
											}
										},
										axisTick : {
											length : axisTickLen,
											lineStyle : {
												color : "auto",
												opacity:0.8//透明度
											}
										},
										axisLabel:{
													textStyle:{
														fontSize:axisLabelFontSize
													}
										},
										splitNumber:5,
										
										splitLine : {
											show : true,
											length : splitLineLen,
											lineStyle : {
												color : "auto",
												opacity:0.8//透明度
											}
										},
										pointer : {
													width : 5
										},
										startAngle : 180,
										endAngle : 0,
										type : 'gauge',
										max:maxValue,
										detail : {
											formatter : formatLabelV,
											textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
														fontWeight : 'bolder',
														fontSize:detailFontSize
													},
											offsetCenter : [0, '20%']
										},
										data : dataArr,
										title : {
													textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
														fontWeight : '500',
														fontSize : 12
													},
													offsetCenter : [0, '65%']
										}
									}]
						};
						var caption = options.caption;
						if(caption){
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