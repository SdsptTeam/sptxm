// ECharts 饼状图
;
(function($) {
	$.fn.portalPieCharts = function(options) {
		return this.each(function() {
			var domId = $(this).attr("id");
			// 基于准备好的dom，初始化echarts图表
			var myChart = echarts.init(document.getElementById(domId));
			// 添加点击事件
			var fnChartClick = options.chartData.chartItemClick;
			if (fnChartClick && typeof fnChartClick == "function") {
				myChart.on("click", fnChartClick);
			}
			var chartTitle = options.title;
			var chartData = options.chartData;
			var radiusV = options.radius;
			if (!radiusV) {
				radiusV = "55%";
			}
			var colorArr = options.color;
			if (!colorArr) {
				colorArr = [ '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980',
						'#d87a80', '#8d98b3', '#e5cf0d', '#97b552', '#95706d',
						'#dc69aa', '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e',
						'#c05050', '#59678c', '#c9ab00', '#7eb00a', '#6f5553',
						'#c14089' ]
			}
			var seriesName = chartData.name;
			var dataArr = chartData.dataArr;
			var legendVisual = true;
			var legVisual = options.legendShow;
			var labelShow = false;
			if (legVisual && legVisual == "0") {
				legendVisual = false;
				labelShow = true; // 标签显示
			}
			var seriesDataArr = [];
			var legendArr = [];
			for ( var i = 0; i < dataArr.length; i++) {
				var pieObj = dataArr[i];
				var pieObjCode = pieObj.code;
				var seriesObj = {
					name : pieObj.name,
					value : pieObj.value
				};
				if (pieObjCode) {
					seriesObj = {
						name : pieObj.name,
						value : pieObj.value,
						code : pieObjCode
					};
				}
				seriesDataArr.push(seriesObj);
				legendArr.push(pieObj.name);
			}
			var option = {
				title : {
					text : chartTitle,
					x : 'center'
				},
				color : colorArr,
				tooltip : {
					show : true,
					showDelay : 1000,
					formatter : "{b} : {c} ({d}%)"
				},
				legend : {
					orient : 'vertical',
					x : 'left',
					data : legendArr,
					show : false
				/* legendVisual */
				},
				series : [ {
					name : seriesName,
					type : 'pie',
					radius : radiusV,
					center : [ '53%', '50%' ],
					itemStyle : {
						normal : {
							// label : {
							// show : labelShow,
							// position:'inner',
							// align:"center",
							// fontSize:8
							// },
							labelLine : {
								show : true,
								length : 0
							}
						}
					},
					data : seriesDataArr
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