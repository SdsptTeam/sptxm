var bean;
var legendTemp = [];
var chartType;

//分隔区域，直角系背景网格交替颜色等
var splitArea = {
                show: true,
                areaStyle:{
                    color:['rgba(0,0,0,0)','rgba(220,220,220,0.3)']
                }
            }

//设置标题
function setTitle(option){
	option.title = {
		        text: bean.title,//图像大标题
		        x: bean.titleX,
		        y: bean.titleY,
		        textStyle:{
        			color: bean.titleColor,
		        	fontSize: bean.titleFontSize,
		        	fontFamily: bean.titleFontFamily,
		        	fontStyle: bean.titleFontStyle,
		        	fontWeight: bean.titleFontWeight 
		        }
		    };
}

//设置提示框
function setTooltip(option){
	if(chartType == 'pie'){
	
		option.tooltip = {
			trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)",
	        position : ['140','135']
		};
	}else{
		option.tooltip = {
			    	show : bean.showTooltip,
			    	trigger : bean.tooltipTrigger,
					backgroundColor : bean.tooltipBackgroundColor,
					borderColor : bean.tooltipBorderColor,//提示边框颜色
					borderRadius : bean.tooltipBorderRadius,//提示边框圆角，单位px，默认为4
					borderWidth : bean.tooltipBorderWidth,
					formatter : bean.tooltipFormatter
			    };
	}
}

        
        
//填充数据
function setLineOrBarSeries(option){
	option.series = [];
	
	var lines = bean.lineOrBars;
	$.each(lines,function(i,n){
		//图例
		if(n.legend){
			legendTemp.push(n.legend);
		}
		var seriesDataArr = [];
//		alert(typeof(n.overDataColor)!=undefined);
//		alert(n.lowDataColor);
//		alert(n.overDataColor!=null);
//		alert(n.overDataColor!="");
//		alert(typeof(n.lowDataColor)!=undefined&&n.lowDataColor!=null);
//		alert(n.yData.length);
		if(typeof(n.overDataColor)!=undefined&&n.overDataColor!=null&&n.overDataColor!=""&&typeof(n.lowDataColor)!=undefined&&n.lowDataColor!=null&&n.lowDataColor!=""){
			
			for(var i = 0,len = n.yData.length; i < len; i++){
				var barDataV = n.yData[i];
				if(barDataV < 0){
					seriesDataArr.push({
						value:barDataV,
						itemStyle : {
							normal : {
							color : n.lowDataColor
							}
						}
					});
				}
				else{
					seriesDataArr.push({
						value:barDataV,
						itemStyle : {
							normal : {
							color : n.overDataColor
							}
						}
					});
				}
			}
		}else{
			seriesDataArr = n.yData
		}
			//折线
			var serie =  {
				            type:n.type,
				            data:seriesDataArr,
				            itemStyle: {
							    normal: {
				        			color : n.color,
				        			lineStyle:{
										type:'solid'
									}
							    }
							}
				        }
		
		if(n.itemStyleType){
			serie.itemStyle.normal.lineStyle.type = n.itemStyleType;
		}
		
		if(n.name){
			serie.name = n.name;
		}else{
			serie.name = legendTemp[i];
		}
		
		if(n.markPoint){
			serie.markPoint = {
	                data : [
	                    {type : 'max', name: '最大值'},
	                    {type : 'min', name: '最小值'}
	                ]
	            };
		};
		if(n.area){
			serie.itemStyle.normal.areaStyle = {type: 'default'};//堆积;
		};
		if(n.stack != undefined && n.stack != ""){
			serie.stack = n.stack;
		};
		if(n.symbol != undefined && n.symbol != ""){
			serie.symbol = n.symbol;
		};
		
		/*if(bean.barCategoryGap != undefined && bean.barCategoryGap != ""){
			serie.barCategoryGap = bean.barCategoryGap;
		};*/
		if(bean.barWidth != undefined && bean.barWidth != ""){
			serie.barWidth = bean.barWidth;
		};
		option.series.push(serie);
	});
	
}


//设置图例
function setLegend(option){
	if(bean.legendShow){
		option.legend = {
		        data: legendTemp,
		        x : bean.legendX,
	        	y : bean.legendY
		    };
		if(chartType == 'pie'){
			option.legend.x = 'left';
			option.legend.y = 'center';
			option.legend.orient = 'vertical';
		}
	}
}
//x轴
function setXAxis(option){
	option.xAxis = [];
	

	var xAxisList = bean.xAxisList;
	$.each(xAxisList,function(i,n){
		var xAxi =  {
	            type : n.type,
	            position: n.position
	        }
		if(n.data){
			xAxi.data = n.data;
		}
		
		if(n.name){
			xAxi.name = n.name;
			xAxi.nameTextStyle={
					fontSize:14,
					color:'black'
			}
		}
		if(n.max){
			xAxi.max = n.max;
		}
		
		if(n.type == 'value'){
			xAxi.axisLabel = {
	                formatter: '{value}'+n.labelformatter
	            }
			
			if(chartType == "bar"){
		        xAxi.splitArea = splitArea;
			}
		}else{
			xAxi.axisLabel = {
		        	//rotate : n.labelRotate, 
		        	//interval : n.labelInterval,
					interval:0,
				    rotate:45,
		        	textStyle:{
            			color: n.labelColor,
			        	fontSize: n.labelFontSize,
			        	fontFamily: n.labelFontFamily,
			        	fontStyle: n.labelFontStyle,
			        	fontWeight: n.labelFontWeight 
			        }
	            }
			
			if(chartType == "bar"){
			var boundaryGap = true;
            var axisLine = {    // 轴线
                show: true,
                lineStyle: {
                    color: 'green',
                    type: 'solid',
                    width: 2
                }
            };
            var axisTick = {    // 轴标记
                show:true,
                length: 10,
                lineStyle: {
                    color: 'black',
                    type: 'solid',
                    width: 2
                }
            };
           var splitLine = {
                show:true,
                lineStyle: {
                    color: '#483d8b',
                    type: 'dashed',
                    width: 1
                }
            };
            xAxi.boundaryGap = boundaryGap;
	        xAxi.axisLine  = axisLine;
	        xAxi.axisTick  = axisTick;
//	        xAxi.splitLine  = splitLine;
		}
		}
		
		
		
		option.xAxis.push(xAxi);
	});
}


//y轴
function setYAxis(option){
	option.yAxis = [];
	
	//y轴
	var yAxisList = bean.yAxisList;
	$.each(yAxisList,function(i,n){
		var yAxi =  {
	            type : n.type,
	            nameLocation:'start',
	            position: n.position
	        };
		if(n.data){
			yAxi.data = n.data;
		}
		
		if(n.max){
			yAxi.max = n.max;
		}
		
		if(n.name){
			yAxi.name = n.name;
			yAxi.nameTextStyle={
					fontSize:14,
					color:'black'
			}
		}
		
		if(n.nameLocation){
			yAxi.nameLocation = n.nameLocation;
		}
		
		if(n.type == 'value'){
			yAxi.axisLabel = {
	                formatter: '{value}'+n.labelformatter
	            }
			
			if(chartType == "bar"){
		        yAxi.splitArea = splitArea;
			}
		}else{
			yAxi.axisLabel = {
		        	rotate : n.labelRotate, 
		        	interval : n.labelInterval,
		        	textStyle:{
            			color: n.labelColor,
			        	fontSize: n.labelFontSize,
			        	fontFamily: n.labelFontFamily,
			        	fontStyle: n.labelFontStyle,
			        	fontWeight: n.labelFontWeight 
			        }
	            }
			
				if(chartType == "bar"){
				var boundaryGap = true;
	            var axisLine = {    // 轴线
	                show: true,
	                lineStyle: {
	                    color: 'green',
	                    type: 'solid',
	                    width: 2
	                }
	            };
	            var axisTick = {    // 轴标记
	                show:true,
	                length: 10,
	                lineStyle: {
	                    color: 'black',
	                    type: 'solid',
	                    width: 2
	                }
	            };
	           var splitLine = {
	                show:true,
	                lineStyle: {
	                    color: '#483d8b',
	                    type: 'dashed',
	                    width: 1
	                }
	            };
	            yAxi.boundaryGap = boundaryGap;
		        yAxi.axisLine  = axisLine;
		        yAxi.axisTick  = axisTick;
//		        yAxi.splitLine  = splitLine;
			}
		}
		
		option.yAxis.push(yAxi);
	});
}

//初始化Echarts，并出图
function initialize(option,divId,chartsType){
	 // 路径配置
        require.config({
            paths: {
                //echarts: 'http://echarts.baidu.com/build/dist'
                echarts: './js_new/echarts/dist'
                	
            }
        });
        
        // 使用
        require(
            [
                'echarts',
	            'echarts/chart/line',
	            'echarts/chart/bar',
	            'echarts/chart/pie'
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById(divId)); 
                myChart.setOption(option); 
            }
        );
}
				
//折线图/柱状图
function createChart(divId, beanTemp){
	legendTemp = [];
	bean = beanTemp;
	//创建一个出图对象
	var option = {};
    chartType = bean.chartsType;
    
    //填充对象
	if(chartType == "pie"){
		fillOptionOfPie(option);
	}else{
		fillOptionOfLineOrBar(option);
	}
    
    //初始化、出图
	initialize(option,divId,bean.chartsType);
}
 
//折线图/柱状图填充出图对象
function fillOptionOfLineOrBar(option){
	setTitle(option);
	setLegend(option);
	setTooltip(option);
    setLineOrBarSeries(option);
    setXAxis(option);
    setYAxis(option);
    setGridPosition(option);
}

//饼图填充出图对象
function fillOptionOfPie(option){
	setTitle(option);
	setLegend(option);
	setTooltip(option);
    setPieSeries(option);
}

function setPieSeries(option){
	//饼
	option.series = [];

	var pies = bean.pies;
	$.each(pies,function(i,n){
		$.each(n.data,function(i1,n1){
			//图例
		if(n1.name){
			legendTemp.push(n1.name);
		}
		})
		//折线
		var serie =  {center:['50%','55%'],
			            type:n.type,
			            name:n.name,
			            data:n.data,
			            itemStyle : {
			                normal : {
			                    label : {
			                        show : true,
			                        formatter: '{b} : {c} ({d}%)' 
			                    },
			                    labelLine : {
			                        show : true
			                    }
			                },
		                emphasis : {
		                    label : {
		                        show : true,
		                        position : 'center',
		                        textStyle : {
		                            fontSize : n.itemStyleEmphasisLabelFontSize,
		                            fontWeight : 'bold'
		                        }
		                    }
		                }
               		 }
		        };
		if(n.radius){
			serie.radius = n.radius;
		}
		
		option.series.push(serie);
	});
}

//设置网格位置
function setGridPosition(option){
	option.grid = {}
	
	if(bean.gridX){
		option.grid.x = bean.gridX;
	}
	if(bean.gridX2){
		option.grid.x2 = bean.gridX2;
	}
	if(bean.gridY){
		option.grid.y = bean.gridY;
	}
	if(bean.gridY2){
		option.grid.y2 = bean.gridY2;
	}
}