//散点图
;
(function($){
	$.fn.portalScatterCharts = function(options){
		return $(this).each(function(){
			var domId = $(this).attr("id");
			var myChart = echarts.init(document.getElementById(domId));
			var chartData = options.chartData;
			var dataAll = chartData.data;
			var xMax=chartData.xMax;
			var yMax=chartData.yMax;
			var nameArr=chartData.nameArr;
			if(!xMax){
				xMax=15;
			}
			if(!yMax){
				yMax=250;
			}
			var seriesArr = [];
			for(var i=0;i<dataAll.length;i++){
				console.info(dataAll[i]);
				seriesArr.push(
			        {
			            name: nameArr[i],
			            type: 'scatter',
			            xAxisIndex: 0,
			            yAxisIndex: 0,
			            data:dataAll[i]
			        }
			    )
			}
			var option = {  
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
				    xAxis: [
				        {	name:'月',
				        	gridIndex: 0, min: 0, max: xMax,
				        
				             splitLine: {
				                 lineStyle: {
				                     type: 'dashed'
				                 }
				             },
				             splitNumber: xMax
				        } 
				    ],
				    yAxis: [
				        {	name:'万人次',
				        	gridIndex: 0, min: 0, max: yMax,
				        	type: 'value',
				             splitLine: {
				                 lineStyle: {
				                     type: 'dashed'
				                 }
				             }
				        } 
				    ],
				    series: seriesArr
				}; 
			myChart.setOption(option);
			window.addEventListener("resize",function(){
			 	 myChart.resize();   
			});
		});
	}
})(jQuery);