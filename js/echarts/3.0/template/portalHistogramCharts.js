// Echarts 双柱柱状图
;
(function($){
	$.fn.portalHistogramCharts = function(options){
		return $(this).each(function(){
			var domId = $(this).attr("id");
			var myChart = echarts.init(document.getElementById(domId));
			var chartData = options.chartData;
			var xLable = chartData.xLable;
			var legendData = chartData.legendData;
			var dataArr = chartData.dataArr;
			
			option = {
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: { // 坐标轴指示器，坐标轴触发有效
				            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				        },
				        formatter:function(params){// 添加%号
				        	var res="<p>"+params[0].name+"</p>";
				        	if(params.length == 1){
				        		if(legendData[0] == params[0].seriesName){
				        			res+='<p><canvas style="width:10px;height:10px;background-color:#C23531;border-radius:10px;"></canvas>&nbsp;'
				        				+params[0].seriesName+':'+params[0].data+'%</p>';
				        		}else if(legendData[1] == params[0].seriesName){
				        			res+='<p><canvas style="width:10px;height:10px;background-color:#2E4453;border-radius:10px;"></canvas>&nbsp;'
				        				+params[0].seriesName+':'+params[0].data+'%</p>';
				        		}
				        	}else{
				        		res+='<p><canvas style="width:10px;height:10px;background-color:#C23531;border-radius:10px;"></canvas>&nbsp;'
				        			+params[0].seriesName+':'+params[0].data+'%</p>';
				        		res+='<p><canvas style="width:10px;height:10px;background-color:#2E4453;border-radius:10px;"></canvas>&nbsp;'
				        			+params[1].seriesName+':'+params[1].data+'%</p>';
				        	}
				        	return res;
				        }
				    },
				    legend: {
				        data: legendData,
				        align: 'right',
				        right: 10
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis: [{
				        type: 'category',
				        axisLabel: { 
				        	show: true, 
				        	textStyle: { 
				        		fontSize:16
				        	}
				        },
				        data: xLable
				    }],
				    yAxis: [{
				        type: 'value',
				        name: '%',
				        axisLabel: {
				            formatter: '{value}',
				            textStyle: { 
				        		fontSize:14
				        	}
				        }
				    }],
				    series: dataArr
				};
			
			myChart.setOption(option);
			window.addEventListener("resize",function(){
			 	 myChart.resize();   
			});
		});
	}
})(jQuery);