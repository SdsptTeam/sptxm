// ECharts 时间趋势图
;
(function($) {
	$.fn.portalRealStackTimeLine = function(options) {
		return this.each(function() {
			var domId = $(this).attr("id");
			// 基于准备好的dom，初始化echarts图表
			var myChart = echarts.init(document.getElementById(domId),'dark');
			var dataArr=options.dataArr;
			var dataArr2=options.dataArr2;
			var dataArr2=options.dataArr2;
			var titleStr=options.titleStr;
			var target=options.target;
			var yLabel=options.yLabel;
	 		var myDate = new Date();
			//获取当前年
			var year=myDate.getFullYear();
			//获取当前月
			var month=myDate.getMonth()+1;
			if(month < 10){
				month = '0'+month;
			}
			//获取当前日
			var date=myDate.getDate();
			if(date < 10){
				date = '0'+date;
			}
			var now=year+"-"+month+"-"+date;
			var startDate = now + ' 00:00:00';
			var endDate = now + ' 23:59:59';
			var anchor = [
			    {name:startDate, value:[startDate, 0]},
			    {name:endDate, value:[endDate, 0]}
			 ];
			 var xLabel="时";
		 	 option = {
	 			  title: {
				        text:titleStr,
				        left:'center',
				        textStyle: {
				        	fontStyle: 'normal',
				        	fontWeight: 'normal',
				        	fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif',
				        	fontSize: 18
			        	}
	 			  },	
	 			 grid:{
				    	top:'22%',
				    	left:'5%',
				    	right:'3%'
				 },
			     toolbox: {
						        show: true,
						        feature: {
						            dataZoom: {
						                yAxisIndex: 'none'
						            },
						            magicType: {type: ['line', 'bar']},
						            restore: {},
						         
						        }
						    },
			 	dataZoom: {
								show: true,
								start : 0,
								end :100
						 },
			 	tooltip: {
			        trigger: 'axis', 
			        axisPointer: {
			            type: 'cross'
			        }
		
						 
			    },		 
			 	xAxis :{ 
			  			type: 'time',
			  			name:xLabel,
				        splitLine: {
				            show: false
				        }
			    },
				yAxis : [{
							type : "value",
							name : yLabel,
							nameLocation : "end",
							position : "left",
							nameTextStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
								fontSize : 14
							}
						}],
			    series: [{
			        name: '实际占用床位数',
			        type: 'line',
			        showSymbol: false,
			        areaStyle: {normal: {}},
			        hoverAnimation: false,
			        data: dataArr
		         
			        
			    },
			    {
			        name: '当前空床数',
			        type: 'line',
			        showSymbol: false,
			       
			        areaStyle: {normal: {}},
			        hoverAnimation: false,
			        data: dataArr2,
			        
			    },
			     {
			       	name : '编制床位数',
					type : 'line',
					symbol : 'none',
					itemStyle : {
						normal : {
							lineStyle : {
								width : 1,
								type : 'dashed'
							},
							color : '#2ec7c9'
						}
					},
					data : target
			        
			    },
			    {
			        name:'anchor',
			        type:'line', 
			        showSymbol:false, 
			        data:anchor,
			        itemStyle:{normal:{opacity:0}},
			        lineStyle:{normal:{opacity:0}}
			    }
			   ]
		}; 
		// 为echarts对象加载数据 
		myChart.setOption(option); 
		window.addEventListener("resize",function(){
				myChart.resize(); 
			})
		});
	}
})(jQuery);