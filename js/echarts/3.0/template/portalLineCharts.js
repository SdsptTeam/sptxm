// ECharts 趋势图
;
(function($) {
	$.fn.portalLineCharts = function(options) {
		return this.each(function() {
			var domId = $(this).attr("id");
				// 基于准备好的dom，初始化echarts图表
				var myChart = echarts.init(document.getElementById(domId));
				var chartTitle = options.title;
				var chartData = options.chartData;
				var xAxisData = chartData.xAxis;
				/*var gridY2 = 50;*/
				var gridY2 = 80;
				var gridX2 = 70;
				var gridY2V = options.gridY2;
				var gridX2V = options.gridX2;
				if(gridY2V){
					gridY2 = gridY2V;
				}
				if(gridX2V){
					gridX2 = gridX2V;
				}
				var legendX = '45%';
				var legendXV = options.legendX;
				if(legendXV){
					legendX = legendXV;
				}
				var legendY = '10%';
				var legendYV = options.legendY;
				if(legendYV){
					legendY = legendYV;
				}
				var yLabel = chartData.yLabel;
				var xLabel = chartData.xLabel;
				var legendArr = [];
				var name = chartData.name;
				var lineData = chartData.line;
				var seriesArr = [];
				if (name && lineData) {
					seriesArr.push({
						/*symbol: 'circle',*/
						name : name,
						type : "line",
						itemStyle : {
							normal : {
								color : '#49bbff'
							}
						},
						data : lineData
					});
					legendArr.push(name);
				}
				var lastName = chartData.lastName;
				var lastLine = chartData.lastLine;
				if (lastName && lastLine) {
					seriesArr.push({
						/*symbol: 'circle',*/
						name : lastName,
						type : "line",
						itemStyle : {
							normal : {
								color : '#ff5f49'
							}
						},
						data : lastLine
					});
					legendArr.push(lastName);
				}
				var option = {
						title : {
							text : chartTitle,
							x : 'center',
							     textStyle:{
							        //文字颜色
							        color:'#222222',
							        //字体风格,'normal','italic','oblique'
							        fontStyle:'normal',
							        //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
							        fontWeight:'normal',
							        fontFamily:'Microsoft YaHei',
                                    fontSize:17
							    }
							
						},
					legend : {
						
						data : legendArr,
						icon : 'bar',
//						orient : 'vertical',
						y : legendY,
						x : legendX,
					    fontSize:9
					},
					grid:{
						x:gridX2,y:gridY2, x2:50
					}, 
				/*	toolbox: {
				        show:true,
				        feature: {
				            dataZoom: {
				                show:true,
				                title:{
				                	yAxisIndex:'none'
				                }
				            }
				        }
				    },*/
					tooltip : {
						trigger: 'axis',
						padding : 10,
						backgroundColor : '#777',
						borderColor : '#111',
						color : '#fff',
						borderWidth : 1,
						formatter:function(params){
							var yearObj = params[0];
							var htmlArr = [];
							htmlArr.push("<div style='border-bottom: 1px solid rgba(200,200,200,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px'>");
							if(yearObj){
								htmlArr.push('第'+Number(yearObj.axisValue) + xLabel
								+ '</div>');
								htmlArr.push(yearObj.seriesName
								+ '：'
								+ yearObj.value+yLabel);
							}
							var lastYearObj = params[1];
							if(lastYearObj){
								htmlArr.push('<br>'
								+ lastYearObj.seriesName
								+ '：'
								+ lastYearObj.value+yLabel);
							}
							
							return htmlArr.join("");
								
						}
					},
					xAxis : [{
								type : "category",
								boundaryGap : false,
								data : xAxisData,
								name : xLabel,
								nameTextStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
									fontSize : 14,
									color : "black"
								},
								axisLabel: {
				                    show: true,
				                    interval: 'auto'
					            },
					            axisTick: {
					            	show: false
					            },
					            axisLine: {
					            	show: false
					            },
					            splitLine: {
					            	show: false
					            }
							}],
					yAxis : [{
								type : "value",
								name : yLabel,
								nameLocation : "end",
								position : "left",
								nameTextStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
									fontSize : 14,
									color : "black"
								},
								axisTick: {
					            	show: false
					            },
					            axisLine: {
					            	show: false
					            },
					            splitLine: {
					            	show: true,
					            	lineStyle: {
					            		color: ['#ccc']
					            	}
					            }
							}],
					series : seriesArr
				}
				var caption = options.caption;
				if (caption) {
					option.title.text = caption;
				}
				// 为echarts对象加载数据 
				myChart.setOption(option);
				//表格数据拼接
				myChart.on('dataZoom', function (param) {
				 	var series1 = myChart.getModel().getSeries()[0];
				 	var dataArr = series1.getData();
				 	var indices = dataArr.indices;//选中的x轴位置数据列表
				 	var tableData = "";
					var tableId = options.tableId;
					$("#"+tableId).html("");
					 
				 	var tableColumn = options.tableColumn;
				 	tableData += "<tr><th>"+xLabel+"</th><th>"+name+"</th></tr>";
				 	for(var i=0;i<indices.length;i++){
				 		var j = indices[i];
				 		tableData += "<tr><td>"+xAxisData[j]+"</td><td>"+lineData[j]+"</td></tr>";
				 	}
					$("#"+tableId).append(tableData);
					decorateTable();
				});
				//图表大小自适应
				window.addEventListener("resize",function(){
					myChart.resize();
				});
		});
	}
})(jQuery);