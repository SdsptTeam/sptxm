var ref = getRootPath();
require.config({
	paths : {
		echarts : './js_new/echarts/dist'
	}
});
var echartsProxy = function() {
	var proxy = new Object;
	return proxy;
};
function getRootPath() {
	// 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
	var curWwwPath = window.document.location.href;
	// 获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	// 获取主机地址，如： http://localhost:8083
	var localhostPaht = curWwwPath.substring(0, pos);
	// 获取带"/"的项目名，如：/uimcardprj
	var projectName = pathName
			.substring(0, pathName.substr(1).indexOf('/') + 1);
	return (localhostPaht + projectName);
}
var nodata = "<div class='nodata' style='width:100%;height:100%;line-height:100%;text-align:center;'>暂无数据</div>";
var noneData=function(id){
	var divId = document.getElementById(id);
	$(divId).html(nodata);
	$(".nodata").css("line-height",$(divId).height()+"px");
}
//仪表盘
var EcWatch = function() {
	this.title="";
	this.id = "";
	this.dataName = "";
	this.dataValue = "";
	this.suffix ="%";
	this.type="";
	//仪表盘预警范围
	this.colorRange = "";
	this.setColorRange= function(colorRangeArray){
		if(colorRangeArray){
			return this.colorRange = colorRangeArray;
		}
	}
	this.setsuffix = function (suffix){
	   return this.suffix = suffix;
	}
	// 设置 div容器的ID
	this.setId = function(id) {
		return this.id = id;
	}
	// 设置数据标题
	this.setdataName = function(dataName) {
		return this.dataName = dataName;
	}
	// 设置仪表盘的值
	this.setdataValue = function(dataValue) {
		return this.dataValue = dataValue;
	}
	//设置仪表盘种类
	this.setType=function(type){
		return this.type = type;
	}
	//设置仪表盘标题
	this.setTitle=function(title){
		return this.title= title;
	}
	this.create = function(e) {
		if (e.id == null || e.id == "") {
			alert("容器id不可为空");
		}
		
		if (e.dataValue == "" || e.dataValue == null||e.dataValue==0) {
			e.dataValue = "0.0";
		}
		if(!e.colorRange){
			e.colorRange =[[0.2, 'lightgreen'],[0.4, 'orange'],[0.8, 'skyblue'],[1,'#ff4500']];
		}
		require([ 'echarts', 'echarts/chart/line', 'echarts/chart/bar',
				'echarts/chart/gauge', 'echarts/chart/pie',
				'echarts/theme/macarons' ], function(ec) {
			// 基于准备好的dom初始化echarts图表
			var chart1 = ec.init(document.getElementById(e.id));
			option = {
				tooltip : {
					formatter : "{a} <br/>{b} : {c}"+e.suffix
				},
				toolbox : {
					show : false,
					feature : {
						mark : {
							show : true
						},
						restore : {
							show : true
						},
						saveAsImage : {
							show : true
						}
					}
				},
				series : [ {
					center : [ '50%', '62%' ],
					radius : [ '120%', '120%' ],
					axisLine : { // 坐标轴线
						lineStyle : { // 属性lineStyle控制线条样式
							width : 8,
							color: e.colorRange
							
						}
					},
					axisTick : { // 坐标轴小标记
						length : 12, // 属性length控制线长
						lineStyle : { // 属性lineStyle控制线条样式
							color : 'auto'
						}
					},
					axisLabel : { // 坐标轴文本标签，详见axis.axisLabel
						textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							color : 'auto'
						}
					},
					splitLine : { // 分隔线
						show : true, // 默认显示，属性show控制显示与否
						length : 30, // 属性length控制线长
						lineStyle : { // 属性lineStyle（详见lineStyle）控制线条样式
							color : 'auto'
						}
					},
					name : '业务指标',
					type : 'gauge',
					detail : {
						formatter : '{value}'+e.suffix
					},
					data : [ {
						value : e.dataValue,
						name : e.dataName
					} ]
				} ]
			};
			option2 = {
					title : {
						x: 'center',
						y:'20',
						text : e.title,
						textStyle : {
							fontSize : 13,
							fontWeight : 'bolder',
							color : '#2BC6C8'
						}
					},
				    tooltip : {
				        formatter: "{a} <br/>{b} : {c}%"
				    },
				   
				    series : [
				        {
				        	center : [ '50%', '80%' ],
							radius : [ '100%', '120%' ],
							axisLine : { // 坐标轴线
								lineStyle : { // 属性lineStyle控制线条样式
									color: e.colorRange
									
								}
							},
				            name:'业务指标',
				            type:'gauge',
				            detail : {formatter:'{value}'+e.suffix,
				            	 offsetCenter: [5, 30],
				            	 height: 0
				            	},
				            data:[{value: e.dataValue, name: e.dataName}],
				            startAngle: 180,
				            endAngle: 0
				        }
				       
				        
				    ]
				    
				};
			// 为echarts对象加载数据
			if(e.dataValue=="0.0"||e.dataValue==0){
//				chart1.showLoading(
//						{
//							text:'暂无数据',
//							effect:'bubble'
//						
//						}
//				);  
				//替代动画效果
				noneData(e.id);
			}else{
				if(e.type==""){
					chart1.setOption(option);
				}else{
					chart1.setOption(option2);
				}
				
			}
			window.onresize = chart1.resize;
		});
	}

}
//水平条形图
var EcBar_x = function() {
	this.id = "";
	this.title = "";
	this.ydata = "";
	this.seriesData = "";
	this.grid=null;
	this.TitleX ="left";
	this.formatter = "";

	this.setFormatter=function(formatter){
		return this.formatter=formatter
	}
	
	this.setTitleX=function(TitleX){
		return this.TitleX=TitleX
	}
	// 设置 div容器的ID
	this.setId = function(id) {
		return this.id = id;
	}
	// 设置图表标题
	this.setTitle = function(title) {
		return this.title = title;
	}
	// 设置y轴数据
	this.setYdata = function(ydata) {
		return this.ydata = ydata;
	}
	// 设置x轴数据
	this.setSeriesData = function(seriesData) {
		return this.seriesData = seriesData;
	}
	this.option = "";
	this.setOption = function(option) {
		return this.option = option;
	}
	this.setGrid=function(gd){
		if(!gd){
			gd=new grid();
		}
		return this.grid = gd;
	}
	this.create = function(e) {
		require(
				[ 'echarts', 'echarts/chart/line', 'echarts/chart/bar',
						'echarts/chart/gauge', 'echarts/chart/pie' ],
				function(ec) {
					// 基于准备好的dom初始化echarts图表
					var myChart = ec.init(document.getElementById(e.id));
					
					option = {
						title : {
							text : e.title,
							x:e.TitleX,
							textStyle : {
								fontSize : 20,
								fontWeight : 'normal'//,
								//color : '#2BC6C8'
							}
						},
						tooltip : {
							trigger : 'axis',
							formatter: e.formatter,
							position : function(p) {
					            // 位置回调
					            // console.log && console.log(p);
					            return [p[0] + 11, p[1] - 11];
					        }
						},
						grid : e.grid,
						legend : {
							data : [ '' ]
						},
						toolbox : {
							show : false,
							feature : {
								mark : {
									show : true
								},
								dataView : {
									show : true,
									readOnly : false
								},
								magicType : {
									show : true,
									type : [ 'line', 'bar' ]
								},
								restore : {
									show : true
								},
								saveAsImage : {
									show : true
								}
							}
						},
						calculable : true,
						xAxis : [ {
							type : 'value',
							boundaryGap : [ 0, 0 ],
							splitLine: {
								show:true
							}
						} ],
						yAxis : [ {
							type : 'category',
							splitLine: {
								show:true
							},
							data : eval(e.ydata)
						} ],
						series : [ {
							center : [ '50%', '50%' ],
							splitLine : { // 分隔线
								show : true
							// 默认显示，属性show控制显示与否
							},
							barGap : '100px',
							type : 'bar',
							itemStyle : {
								normal : {
//									color : function() {
//										return "#"
//												+ ("00000" + ((Math.random() * 16777215 + 0.5) >> 0)
//														.toString(16))
//														.slice(-6);
//									},
									borderWidth : 0, // 标注边线线宽，单位px，默认为1
									label : {
										textStyle : {
											fontSize : 10
										},
										show : false
									},
									lineStyle : {
										width : 2
									}

								}
							},
							//barWidth : 5,
							data : eval(e.seriesData)
						} ]
					};

					// 为echarts对象加载数据
					if(eval(e.seriesData)!=""){
						myChart.setOption(option);
					}else{
						//替代动画效果
						noneData(e.id);
					}
					window.onresize = myChart.resize;
				});

	}

}
//折线图
var EcLine = function() {
	this.targetSeries="";
	this.option = "";
	this.grid=null;
	this.legendY="";
	this.id = "";
	this.title = "";
	this.seriesName = "";
	this.ysuffix = "";
	this.TitleX ="left";
	this.xdata = "";
	this.seriesData = "";
	this.legendName = "";
	this.dataZoom=false;
	this.legendY="10%";
	this.formatter = "";
	this.xName="";
	this.yName="";
	this.setXName=function(xName){
		return this.xName=xName
	}
	
	this.setYName=function(yName){
		return this.yName=yName
	}

	this.setFormatter=function(formatter){
		return this.formatter=formatter
	}
	this.setTargetSeries=function(Series){
		return this.targetSeries = Series;
	}
	this.setDataZoom=function(zoom){
		this.dataZoom = zoom;
	}
	this.setLegendName = function(legendName) {
		return this.legendName = legendName;
	}
	this.setId = function(id) {
		return this.id = id;
	}
	this.setTitle = function(title) {
		return this.title = title;
	}
	this.setSeriesName = function(seriesName) {
		return this.seriesName = seriesName;
	}
	this.setTitleX=function(TitleX){
		return this.TitleX=TitleX
	}
	this.setYsuffix = function(ysuffix) {
		return this.ysuffix = ysuffix;
	}
	this.setXdata = function(xdata) {
		return this.xdata = xdata;
	}
	this.setSeriesData = function(seriesData) {
		return this.seriesData = seriesData;
	}
	this.setOption=function(option){
		return this.option = option;
	}
	this.setGrid=function(gd){
		if(!gd){
			gd=new grid();
		}
		return this.grid = gd;
	}
	this.setLegendY=function(y){
		return this.legendY=y;
	}
	this.create = function(e) {
		require([ 'echarts', 'echarts/chart/line', 'echarts/chart/bar',
				'echarts/chart/gauge', 'echarts/chart/pie' ], function(ec) {
			// 基于准备好的dom初始化echarts图表
			var myChart = ec.init(document.getElementById(e.id));
			option2 = e.option;
			option = {
				title : {
					text : e.title,
					x:e.TitleX,
					textStyle : {
						fontSize : 20,
						fontWeight : 'normal'//,
						//color : '#2BC6C8'
					}

				},
				tooltip : {					
					trigger : 'axis'
				},
				grid : e.grid,
				legend : {
					data : [ e.legendName ],
					y:e.legendY
				},
				calculable : true,
				dataZoom : {
			        show : e.dataZoom,
			        realtime : true,
			        start : 0,
			        end : 100
			    },
			    xAxis : [
			             {
			                 type : 'category',
			                 name : e.xName,
			                 nameTextStyle:{
			     					fontSize:14,
			     					color:'black'
			     			 },
			                 data : eval(e.xdata)
			             }
			         ],
			         yAxis : [
			             {
			                 type : 'value',
			                 name : e.yName,
			                 nameTextStyle:{
				     					fontSize:14,
				     					color:'black'
				     			 },
			                 axisLabel : {
									formatter : '{value}' + e.ysuffix
								}
			                	 
			             }
			         ],
				series : [ {
					name : e.seriesName,
					type : 'line',
					data : eval(e.seriesData),
					symbolSize : 1,
					itemStyle:{
						normal: {
							color:'skyblue'
						}

					}

				}
				]
			};
			// 为echarts对象加载数据
			if ((eval(e.seriesData) == null || eval(e.seriesData) == "")&&(eval(option2)==""||eval(option2)==null||(option2.xAxis[0].data==undefined&&option.xAxis[0].data==undefined))) {

				//替代动画效果
				noneData(e.id);
			}else if(eval(e.seriesData) == null || eval(e.seriesData) == ""&&(eval(option2)!=""||eval(option2)!=null)){
				if(option2){
					myChart.setOption(option2);
				}else{
					//替代动画效果
					noneData(e.id);
				}
			}else{
			    if(e.targetSeries){
			    	for ( var i = 0; i < e.targetSeries.length; i++) {
						option.series.push(e.targetSeries[i]);
					}
			    	option.tooltip.formatter = function (params){
			    		 return params[0].name + ' : '+'<br/>'
		                   + params[0].seriesName + ' : ' + params[0].value + '<br/>'
		                   + params[1].seriesName + ' : ' + params[1].value + '<br/>'
		        }
			    }
				myChart.setOption(option);
			}
		});
	}
}

//饼图
var EcPie = function() {
    this.week=null;
	this.id = "";
	this.option="";
	// 设置 div容器的ID
	this.setId = function(id) {
		return this.id = id;
	}
	this.setWeek=function(weekDate){
		return this.week = weekDate;
	}
	//设置option
	this.setOption=function(option){
		return this.option = eval(option);
	}
	this.create = function(e) {
		require([ 'echarts', 'echarts/chart/line', 'echarts/chart/bar',
				'echarts/chart/gauge', 'echarts/chart/pie' ], function(ec) {
			// 基于准备好的dom初始化echarts图表
			var myChart = ec.init(document.getElementById(e.id));
             option=e.option;
			// 为echarts对象加载数据
             var sum = 0;
             if(option.series!=undefined){
            	 for ( var i = 0; i < option.series.length; i++) {
     				for ( var j = 0; j < option.series[i].data.length; j++) {
     					sum+=option.series[i].data[j].value;
     				 }		
     			}
             }else if(option.options!=undefined){
            	 sum=100;
             }
            
			if(JSON.stringify(option)!='{}'&& JSON.stringify(option)!="null"&&sum!=0){
				if(e.week){
					option.timeline.label.formatter=function(s){
				  	  return getWeek(s);
					}
				}
				myChart.setOption(option);
			}else{
//				myChart.showLoading(
//						{
//							text:'暂无数据',
//							effect:'bubble'
//						
//						}
//				);  
				//替代动画效果
				noneData(e.id);
				
			}
		});
	}
}
//垂直柱状图
var EcBar_y = function() {
	this.TitleX ="left";
	this.id = "";
	this.title = "";
	this.legend = "";
	this.seriesDataKV = "";
	this.xdata = "";
	this.option="";
	this.grid=null;
	//外部自定义option
	this.setOption= function(option) {
		return this.option =option;
	}
	// 设置 div容器的ID
	this.setId = function(id) {
		return this.id = id;
	}
	// 设置图表标题
	this.setTitle = function(title) {
		return this.title = title;
	}
	// 图例集合
	this.setLegend = function(legend) {
		return this.legend = legend;
	}
	// x轴json
	this.setXdata = function(xdata) {
		return this.xdata = xdata;
	}
	// 设置series
	this.setSeriesDataKV = function(seriesDataKV) {
		return this.seriesDataKV = seriesDataKV;
	}
	this.setTitleX=function(TitleX){
		return this.TitleX=TitleX
	}
	this.setGrid=function(gd){
		if(!gd){
			gd=new grid();
		}
		return this.grid = gd;
	}
	this.create = function(e) {
		//alert(eval(e.seriesDataKV));
		require([ 'echarts', 'echarts/chart/line', 'echarts/chart/bar',
				'echarts/chart/radar', 'echarts/chart/pie' ], function(ec) {
			// 基于准备好的dom初始化echarts图表
			var myChart = ec.init(document.getElementById(e.id));
			option2=e.option;
			option1 = {
				title : {
					text : e.title,
					x:e.TitleX,
					textStyle : {
						fontSize : 20,
						fontWeight : 'normal'//,
						//color : '#2BC6C8'
					}
				},
				tooltip : {
					trigger : 'axis'
				},
				grid : e.grid,
				legend : {
					y:'10%',
					data : eval(e.legend)
				},
				toolbox : {
					show : false,
					feature : {
						mark : {
							show : true
						},
						dataView : {
							show : true,
							readOnly : false
						},
						magicType : {
							show : true,
							type : [ 'line', 'bar' ]
						},
						restore : {
							show : true
						},
						saveAsImage : {
							show : true
						}
					}
				},
				calculable : true,
				xAxis : [ {
					type : 'category',
					data : eval(e.xdata)
				} ],
				yAxis : [ {
					type : 'value'
				} ],
				series : eval(e.seriesDataKV)
			};
			// 为echarts对象加载数据
			if(JSON.stringify(option2)==""||option2==""||JSON.stringify(option2)=='undefined'||option2=="''"){
				if(option1.series){
					myChart.setOption(option1);
				}else{
					myChart.showLoading(
							{
								text:'暂无数据',
								effect:'bubble'
							
							}
					);  
				}
			}else{
				if(option2){
					myChart.setOption(option2);
				}else{
					myChart.showLoading(
							{
								text:'暂无数据',
								effect:'bubble'
							
							}
					);  
				}
			}
			 window.onresize = myChart.resize;
		});
	}

}
//雷达图
var EcRadar = function() {
	this.id = "";
	this.RadarSeries = "";
	this.PolarData="";
	this.title = "";
	var legendData = "";
	// 设置 div容器的ID
	this.setId = function(id) {
		return this.id = id;
	}
	this.setPolarData = function(PolarData) {
		return this.PolarData = PolarData;
	}
	this.setTitle = function(title) {
		return this.title = title;
	}
	this.setLegendData = function(legendData) {
		return this.legendData = legendData;
	}
	this.setRadarSeries = function(RadarSeries) {
		return this.RadarSeries = RadarSeries;
	}
	this.create = function(e) {
		require([ 'echarts', 'echarts/chart/line', 'echarts/chart/bar',
				'echarts/chart/radar', 'echarts/chart/pie' ], function(ec) {
			// 基于准备好的dom初始化echarts图表
			var myChart = ec.init(document.getElementById(e.id));
			option = {
				title : {
					text : e.title,
					textStyle : {
						fontSize : 13,
						fontWeight : 'bolder',
						color : '#2BC6C8'
					}
				},
				tooltip : {
					trigger : 'axis'
				},
				legend : {
					orient : 'vertical',
					x : 'right',
					y : 'bottom',
					data : eval(e.legendData)
				},
				toolbox : {
					show : false,
					feature : {
						mark : {
							show : true
						},
						dataView : {
							show : true,
							readOnly : false
						},
						restore : {
							show : true
						},
						saveAsImage : {
							show : true
						}
					}
				},
				polar : [ eval(e.PolarData)],
				calculable : true,
				series : [ 
				          	eval(e.RadarSeries)
				        ]
			};

			// 为echarts对象加载数据
			myChart.setOption(option);
			//window.onresize = myChart.resize;
		});
	}
}
//多维条形图
var EcbarMulti = function(){
   //设置图表标题
	this.title="";
	this.setTitle= function(title){
		return this.title=title;
	}
	//设置图表容器id
	this.id = "";
	this.setId = function(id){
		return this.id = id;
	}
    //设置图例
	this.legendData = "";
	this.setLegendData = function(legendData){
		return this.legendData = legendData;
	}
	//设置y轴
	this.ydata = "";
	this.setYdata = function(ydata){
		return this.ydata = ydata;
	}
	//设置数据
	this.series="";
	this.setSeries = function(series){
		return this.series = series;
	}
	//'{b}<br/>{a0}:{c0}%<br/>{a2}:{c2}%<br/>{a4}:{c4}%<br/>{a6}:{c6}%';
	this.create = function(e) {
		var fmt = '{b}<br/>';
		for ( var i = 0; i <(e.legendData.length)*2; i=i+2) {
			fmt+='{a'+i+'}:{c'+i+'}%<br/>';
		}
		require([ 'echarts', 'echarts/chart/line', 'echarts/chart/bar',
				'echarts/chart/radar', 'echarts/chart/pie' ], function(ec) {
			// 基于准备好的dom初始化echarts图表
			var myChart = ec.init(document.getElementById(e.id));
			// 为echarts对象加载数据
			this.series = e.series;
				option = {
				    title: {
				        text: e.text,
				    	textStyle : {
							fontSize : 13,
							fontWeight : 'bolder',
							color : '#2BC6C8'
						}
				    },
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' |
													// 'shadow'
				        },
				        formatter : fmt
				    },
				    legend: {
				        y: 0,
				        itemGap : document.getElementById(e.id).offsetWidth /7.7,
				        data:e.legendData
				    },
				    grid: {
				        y: 30,
				        y2:3
				    },
				    xAxis : [
				        {
				            type : 'value',
				            position: 'top',
				            splitLine: {show: false},
				            axisLabel: {show: false}
				        }
				    ],
				    yAxis : [
				        {
				            type : 'category',
				            splitLine: {show: false},
				            data :e.ydata
				        }
				    ],
				    series :e.series
				};
				if(null==eval(this.series)||""==eval(this.series)){
					myChart.showLoading(
							{
								text:'暂无数据',
								effect:'bubble'
							
							}
					);  
				}else{
					myChart.setOption(option);
				}	                    
			
			
			
			window.onresize = myChart.resize;
		});
	}
}
//矩阵图
var EcTreemap = function(){
	this.id="";
	this.setId=function(id){
		return this.id = id;
	}
	this.seriesData = "";
	this.setSeries = function (data){
		this.seriesData = data;
	}
	this.create = function(e) {
		require([ 'echarts', 'echarts/chart/line', 'echarts/chart/bar',
				'echarts/chart/radar', 'echarts/chart/pie','echarts/chart/treemap' ], function(ec) {
			// 基于准备好的dom初始化echarts图表
			var myChart = ec.init(document.getElementById(e.id));
			// 为echarts对象加载数据
			option = {
				    title : {
				        text: '就诊患者分布矩阵',
				        textStyle:{
				        	fontSize:13
				        }
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{b}: {c}"
				    },
				    grid : {
						x : 10,
						y : 10,
						x2 : 10,
						y2 : 10
					},
					xAxis : [ {
						type : 'value',
						boundaryGap : [ 0, 0 ],
						axisLine: {
							show: true,
							onZero: true,
							lineStyle: {
							
							type: 'solid',
							width: '100%',
							shadowColor: 'rgba(0,0,0,0)',
							shadowBlur: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
							}
							}
					} ],
				    calculable : false,
				    series : [
				        {
				            name:'',
				            type:'treemap',
				            itemStyle: {
				                normal: {
				                    label: {
				                        show: true,
				                        formatter: "{b}"
				                    },
				                    borderWidth: 1
				                },
				                emphasis: {
				                    label: {
				                        show: true
				                    }
				                }
				            },
				            data:e.seriesData
				        }
				    ]
				};
				                    
				myChart.setOption(option);
			 window.onresize = myChart.resize;
		});
	}
}

var Ecsimulation = function(){
	this.id = "";
	this.option="";
	// 设置 div容器的ID
	this.setId = function(id) {
		return this.id = id;
	}
	//设置option
	this.setOption=function(option){
		return this.option = eval(option);
	}
	this.create = function(e) {
		require([ 'echarts', 'echarts/chart/line', 'echarts/chart/bar'
				 ], function(ec) {
			// 基于准备好的dom初始化echarts图表
			var myChart = ec.init(document.getElementById(e.id));
             //option=e.option;
			// 为echarts对象加载数据
			option = {
				    title :{
				        text : '住院费用随住院天数趋势变化',
				        textStyle : {
							fontSize : 13,
							fontWeight : 'bolder',
							color : '#2BC6C8'
						},
						x:15,
						y:7
				    },
				    tooltip : {
				        trigger: 'axis',
				        formatter: function (params){
				            return params[0].name+ ' : '
				                   + (params[2].value - params[1].value > 0 ? '+' : '-') 
				                   + params[0].value + '<br/>'
				                   + params[2].seriesName + ' : ' + params[2].value + '<br/>'
				                   + params[3].seriesName + ' : ' + params[3].value + '<br/>'
				        }
				    },
					grid : {
						x : 70,
						y : 40,
						x2 : 40,
						y2 : 30
					},
				    legend: {
				    	y:20,
				        data:['原住院费用', '预测后住院费用'],
				        selectedMode:false
				    },
				    xAxis : [
				        {
				            type : 'category',
				            data : ['周一','周二','周三','周四','周五','周六','周日'],
				            splitLine: {
								show:false
							}
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value',
				            min : 200,
				            max : 450,
				            splitLine: {
								show:false
							}
				        }
				    ],
				    series : [
				        {
				            name:'原住院费用',
				            type:'line',
				            data:[400, 374, 251, 300, 420, 400, 440]
				        },
				        {
				            name:'预测后住院费用',
				            type:'line',
				            symbol:'none',
				            itemStyle:{
				                normal:{
				                  lineStyle: {
				                    width:1,
				                    type:'dashed'
				                  }
				                }
				            },
				            data:[320, 332, 301, 334, 360, 330, 350]
				        },
				        {
				            name:'原住院费用2',
				            type:'bar',
				            stack: '1',
				            barWidth: 6,
				            itemStyle:{
				                normal:{
				                    color:'rgba(0,0,0,0)'
				                },
				                emphasis:{
				                    color:'rgba(0,0,0,0)'
				                }
				            },
				            data:[320, 332, 251, 300, 360, 330, 350]
				        },
				        {
				            name:'变化',
				            type:'bar',
				            stack: '1',
				            data:[
				              80, 42, 
				              {value : 50, itemStyle:{ normal:{color:'red'}}},
				              {value : 34, itemStyle:{ normal:{color:'red'}}}, 
				              60, 70, 90
				            ]
				        }
				    ]
				};
				myChart.setOption(option);
			
		});
	}
}
	var grid = function(){
	this.x = '10%',
	this.y = 30,
	this.x2 = '10%',
	this.y2 = 20
	this.setX=function(x){
		return this.x = x;
	}
	this.setX2=function(x2){
		return this.x2 = x2;
	}
	this.setY=function(y){
		return this.y = y;
	}
	this.setY2=function(y2){
		return this.y2 = y2;
	}
	
}

	var weekArr =['周日','周一','周二','周三','周四','周五','周六'];
	function getWeek(s){
  		return weekArr[new Date(s.replace(/-/g,"/")).getDay()];
	}


