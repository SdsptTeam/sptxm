// ECharts 时间趋势图
;
(function($) {
	$.fn.portalRealTimeLine = function(options) {
		return this.each(function() {
			var domId = $(this).attr("id");
			// 基于准备好的dom，初始化echarts图表
			var myChart = echarts.init(document.getElementById(domId),'dark');
			var data=options.dataArr;
			var titleStr=options.titleStr;
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
			 var yLabel = options.yLabel;
			 if(!yLabel){
				yLabel = "";
			 }
		     option = {
			    title: {
			        text:titleStr,
			        left:'center',
			        textStyle: {
			        	fontStyle: 'normal',
			        	fontWeight: 'normal',
			        	fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif',
			        	fontSize: 16
		        	}
			    },
			    toolbox: {
			        show: true,
			        feature: {
			            dataZoom: {
			                yAxisIndex: 'none'
			            },
			           
			            magicType: {type: ['line', 'bar']},
			            restore: {},
			         
			        },
			    },
			    grid:{
			    	top:'22%',
			    	left:'5%',
			    	right:'3%'
			    },
			 	dataZoom: {
								show: true,
								start : 0,
								end :100
						 },
				tooltip: {
					trigger: 'axis',
			        axisPointer: {
			            type: 'cross',
			            label: {
			                backgroundColor: '#6a7985'
			            }
			        }
		   		},	
	  			xAxis :{ 
	  				type: 'time',
	  				name:xLabel,
			        splitLine: {
			            show: false
			        },
					nameTextStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontSize : 14,
					}
	        	},
				yAxis : [{
							type : "value",
							name : yLabel,
							nameLocation : "end",
							position : "left",
							nameTextStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
								fontSize : 14,
							},
							splitLine: {
					            show: true,
					            lineStyle:{
					            	opacity:0.1
					            }
					        }
						}],
			    series: [{
			        name: '实时数据',
			        type: 'line',
			        showSymbol: false,
			        hoverAnimation: false,
			        data: data,
			        markPoint: {
		                data: [
		                    {type: 'max', name: '最大值',
		                    	itemStyle: {
		                    		normal: {color:'#759aa0'},
		                    	}
		                    },
		                    {type: 'min', name: '最小值',
		                    	itemStyle: {
		                    		normal: {color:'#dd6b66'},
		                    	}
		                    }
		                ],
		                label: {
		                	normal: {
		                		show: true,
		                	}
		                },
		                itemStyle: {
		                	normal: {
		                		color: 'blue'
		                	}
		                }
			        }
			    },
			    {
			        name:'.anchor',
			        type:'line', 
			        showSymbol:false, 
			        data:anchor,
			        itemStyle:{normal:{opacity:0,color:'#fff'}},
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
