// ECharts 时间趋势图
;
(function($) {
	$.fn.portalLogsPieCharts = function(options) {
		return this.each(function() {
			var domId = $(this).attr("id");
			// 基于准备好的dom，初始化echarts图表
			var myChart = echarts.init(document.getElementById(domId),'dark');
			var functionName=options.functionName;
			var functionDate=options.functionDate;
			option = {
					backgroundColor : '#eff9fc',//背景色
					title : {
						text : '功能点击量分析（%）',
						subtext : '',
						x : 'center'
					},
					tooltip : {
						trigger : 'item',
						formatter : "{a} <br/>{b} : {c} ({d}%)"
					},
					legend : {
						orient : 'vertical',
						x : 'left',
						data :functionName,
					},
			
					calculable : true,
					series : [ {
					startAngle:50,
						name : '访问来源',
						x:'right',
						type : 'pie',
						radius : '55%',
						center : [ '60%', '50%' ],

						data :functionDate ,
					} 
			
					],
				
				};

			// 为echarts对象加载数据 
			myChart.setOption(option);   
			window.addEventListener("resize",function(){
				myChart.resize(); 
			})
		});
	}
})(jQuery);
