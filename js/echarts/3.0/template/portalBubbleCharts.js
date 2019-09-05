	//气泡图
;
(function($){
	$.fn.portalBubbleCharts = function(options){
		return $(this).each(function(){
			var domId = $(this).attr("id");
			var myChart = echarts.init(document.getElementById(domId));
			var chartData = options.chartData;
			var nameArr = chartData.name;
			var data = chartData.data;
			var seriesArr = [];
			var colorArr1 = options.colorArr1;
			var colorArr2 = options.colorArr2;
			var yMax = options.yMax;
			if(!yMax){
				yMax = 80;
			}
			if(!colorArr1){
				colorArr1 = ['rgb(251, 118, 123)','rgb(129, 227, 238)','#ff00ff','#6600ff','#333366','#ff7f00','#EE0030A7','#595959','#0000ee','#00CD00'];
			}
			if(!colorArr2){
				colorArr2 = ['rgb(204, 46, 72)','rgb(25, 183, 207)','#ff99ff','#66ccff','#33cc66','#ff7f50','#E066FF','#607B8B','#009ACD','#00FF7F'];
			}
			for(var i=0;i<data.length;i++){
				seriesArr.push({
	 		        name: nameArr[i],
	 		        data: data[i],
	 		        type: 'scatter',
	 		        symbolSize: function (data) {
	 		            return Math.round(3 + data[2] * 40 / yMax);
	 		        },
	 		        label: {
	 		            emphasis: {
	 		                show: true,
	 		                formatter: function (param) {
	 		                    return param.data[3];
	 		                },
	 		                position: 'top'
	 		            }
	 		        },
	 		        itemStyle: {
	 		            normal: {
	 		                shadowBlur: 5,
	 		                shadowColor: 'rgba(120, 36, 50, 0.5)',
	 		                shadowOffsetY: 5,
	 		                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
	 		                    offset: 0,
	 		                    color: colorArr1[i]
	 		                }, {
	 		                    offset: 1,
	 		                    color: colorArr2[i]
	 		                }])
	 		            }
	 		        }
	 		    });
			}
		 	var	option = {
		 		    backgroundColor:"#ffffff",
		 		    title: {
		 		        text: ''
		 		    },
		 		    tooltip: {
				        formatter: '{a}: ({c})',
				        axisPointer: {
				            type: 'cross'
				        }
				    },
		 		    legend: {
		 		        right: 10,
		 		        data: nameArr
		 		    },
		 		    xAxis: {
		 		    	
		 		    	name:'月',
		 				
		 		        splitLine: {
		 		            lineStyle: {
		 		                type: 'dashed'
		 		            }
		 		        }
		 		      
		 		    },
		 		    yAxis: {
		 		    	name:'%',
		 		        splitLine: {
		 		            lineStyle: {
		 		                type: 'dashed'
		 		            }
		 		        },
		 		        scale: true
		 		    },
		 		    series: seriesArr
		 		};
			myChart.setOption(option);
			window.addEventListener("resize",function(){
			 	 myChart.resize();   
			});
		});
	}
})(jQuery);