// ECharts 山东地图
;
var shandongMapUrl = getRootPath()+"/static_resources/js/echarts/3.0/map/shandong.js";
document.write('<script src="'+shandongMapUrl+'"><\/script>');

(function($) {
    $.fn.portalHeZeMapScatterCharts = function(options) {
        return this.each(function() {
            var domId = $(this).attr("id");		//获取jsp页面ID
            var myChart = echarts.init(document.getElementById(domId));  //创建echarts容器
            //标题内容   如果不传默认为空
            var title=[];
            //标题颜色  默认为白色字体
            var titleColor='#ffffff';
            //提示框是否显示  默认不显示
            var tooltip=false;
            //背景颜色  默认颜色
            var areaColor='#4d8fe6'
            //地图边界颜色
            var borderColor='#7cecce';
            // 指标单位
            var indexUnit ='';
            //未申请
            var staticDate=options.staticDate;
            //已申请
            var flashDate=options.flashDate;
            //申请中
            var applyingDate=options.applyingDate;
            //数据
            var outHosList=options.outHosList;
            var nameData = [];

                nameData.push(staticDate[0].value[3]);

                nameData.push(applyingDate[0].value[3]);
            nameData.push(flashDate[0].value[3]);

 // alert(nameData);
 // console.info(nameData);
            var dataMaxV=200;
            var dataMinV=0;

            if(options.title){
                title=options.title;
            }
            if(options.titleColor){
                titleColor=options.titleColor;
            }
            if(options.tooltip){
                tooltip=true;
            }
            if(options.areaColor){
                areaColor=options.areaColor;
            }
            if(options.borderColor){
                borderColor=options.borderColor;
            }
            if(options.indexUnit){
                indexUnit=options.indexUnit;
            }
            //对静态数组 进行排序  最大值放在第一个
            if(staticDate){
                for(var x = 0; x < staticDate.length - 1; x++){
                    for(var y = x + 1; y < staticDate.length; y++){
                        if(staticDate[x].value[2] < staticDate[y].value[2]){
                            var temp = staticDate[x];
                            staticDate[x] = staticDate[y];
                            staticDate[y] = temp;
                        }
                    }
                }
            }else{
                staticDate=[];
            }
            //对动态数组 进行排序  最大值放在第一个
            if(flashDate){
                for(var x = 0; x < flashDate.length - 1; x++){
                    for(var y = x + 1; y < flashDate.length; y++){
                        if(flashDate[x].value[2] < flashDate[y].value[2]){
                            var temp = flashDate[x];
                            flashDate[x] = flashDate[y];
                            flashDate[y] = temp;
                        }
                    }
                }
            }else{
                flashDate=[];
            }
            //对申请中数组 进行排序  最大值放在第一个
            if(applyingDate){
                for(var x = 0; x < applyingDate.length - 1; x++){
                    for(var y = x + 1; y < applyingDate.length; y++){
                        if(applyingDate[x].value[2] < applyingDate[y].value[2]){
                            var temp = applyingDate[x];
                            applyingDate[x] = applyingDate[y];
                            applyingDate[y] = temp;
                        }
                    }
                }
            }else{
                applyingDate=[];
            }

            //获取动态数组中最大值
            if(flashDate.length>0){
                dataMaxV=flashDate[0].value[2];
            }

            //获取静态数组中最小值
            if(staticDate.length>0){
                dataMinV=staticDate[staticDate.length-1].value[2];
            }

            var option = {
                legend: {
                    right: 'right',
                    data: ['未申请', '申请中', '已申请'],
                    show:true
                },
                title:{							//标题设置
                    text : title,				//标题名称
                    left : "10%",				//标题位置
                    textStyle : {				//标题字体样式
                        color : titleColor,  	//标题字体颜色
                        fontStyle:'normal',		//标题字体风格   'normal'  'italic' 'oblique'
                        fontWeight:'bold',		//标题字体粗细
                        fontFamily:'sans-serif',//标题文字的字体系列
                        fontSize:22				//标题字体大小
                    }
                },
                tooltip : {						//提示框
                    trigger: 'item',  			//触发类型
                    show: tooltip		 		//提示框是否显示
                },
                geo: {							//新建一个坐标系geo
                    zoom: 1,
                    roam: true,
                    map: '山东',
                    itemStyle: {				// 定义样式
                        normal: {					// 普通状态下的样式
                            areaColor: areaColor,
                            borderColor: borderColor
                        },
                        emphasis: {
                            areaColor: '#359ff5'
                        }

                    },
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: '#2b5182',
                                fontSize : 12
                            }
                        }
                    },
                    layoutCenter: ['45%', '42%'],
                    layoutSize: 500
                },
//				dataRange: {					//图例显示
//					orient: 'vertical',   		//图例列表的布局朝向 水平/垂直
//					x: '10%',			  		//图例位置
//					y: 'bottom',
//			        min: dataMinV,				//显示最小值数值
//			        max: dataMaxV,			 	//显示最大值数值
//			        text:['高','低'],     		//图例文字描述
//			        textStyle:{          		//图例字体样式
//						color:"#ffffff"
//					},
//			        realtime: false,			//移动图例  界面是否
//			        calculable: true,			//最大值最小值 显示
//			        splitNumber: 0,
//			        show:false					//是否显示
//				},
                series: [
                    {
                        name:'未申请',
                        type: 'scatter',			//显示 出去Top之外的数据   数据点小  不闪烁
                        coordinateSystem: 'geo', //引入地图
                        data: staticDate,		// 最小值数据  信息
                        symbolSize: function (val) {  //设置散点大小
                            return val[2] / 80;
                        },
                        label: {
                            normal: {
                                formatter: function(params) {  //悬浮显示的内容
                                    var myseries = option.series;
                                    var res ='';
                                    for(var j=0;j<myseries[0].data.length;j++){
                                        if(myseries[0].data[j].name==params.name){
                                            res+='\n'+params.name ;
                                        }
                                    }
                                    return res;
                                },
                                position: 'top',		//悬浮内容显示的位置
                                show: false     		//鼠标未触摸是否显示
                            },
                            emphasis: {				//文本是否显示
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#cad1cd'
                            }
                        }
                    },
                    //数据量小的显示    格式
                    {
                        name:'申请中',
                        type: 'scatter',			//显示 出去Top之外的数据   数据点小  不闪烁
                        coordinateSystem: 'geo', //引入地图
                        data: applyingDate,		// 最小值数据  信息
                        symbolSize: function (val) {  //设置散点大小
                            return val[2] / 80;
                        },
                        label: {
                            normal: {
                                formatter: function(params) {  //悬浮显示的内容
                                    var myseries = option.series;
                                    var res ='';
                                    for(var j=0;j<myseries[0].data.length;j++){
                                        if(myseries[0].data[j].name==params.name){
                                            res+='\n'+params.name ;
                                        }
                                    }
                                    return res;
                                },
                                position: 'top',		//悬浮内容显示的位置
                                emphasis: {//对应的鼠标悬浮效果
                                    show: true,
                                    textStyle:{color:"#323232"}
                                },
                                show: true     		//鼠标未触摸是否显示
                            },
                            emphasis: {				//文本是否显示
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#d1b318'
                            }
                        }
                    },
                    {
                        name:'已申请',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: flashDate,			//闪烁点数据
                        symbolSize: function (val) {
                            if(val[2]<80){
                                return 1;
                            }else{
                                return val[2] / 80;
                            }

                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: function(params) {
                                    var myseries = option.series;
                                    var res ='';
                                    for(var j=0;j<myseries[1].data.length;j++){
                                        if(myseries[1].data[j].name==params.name){
                                            //res+='Top'+(j+1);
                                            //res+='\n'+params.name +':'+myseries[1].data[j].value[2]+indexUnit;
                                            res+=params.name;
                                        }
                                    }
                                    return res;
                                },
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize : 12
                                },
                                position: 'top',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#0ae547',
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        zlevel: 1
                    }
                ]
            }
            myChart.setOption(option);

            myChart.on('click', function (params) {//点击事件
                if (params.componentType === 'series') {
                    var provinceName =params.name;
                    var outTrArr="";
                    var cities = "";
                    for(var i=0;i<outHosList.length;i++){
                        if(provinceName == outHosList[i].orgName){
                            cities = outHosList[i].cities;
                            outTrArr=outTrArr+"<tr><td width='60%'>"+outHosList[i].orgName+"</td><td width='5%'>：</td><td width='34%''><span class='infoFont'>"+100+"</span>人</td></tr>" +
                                "<tr><td width='60%'>"+'医院类别'+"</td><td width='5%'>：</td><td width='34%''><span class='infoFont'>"+(outHosList[i].orgCategory==undefined?"":outHosList[i].orgCategory)+"</span></td></tr>" +
                                "<tr><td width='60%'>"+'负责人'+"</td><td width='5%'>：</td><td width='34%''><span class='infoFont'>"+(outHosList[i].leaderName==undefined?"":outHosList[i].leaderName)+"</span></td></tr>" +
                                "<tr><td width='60%'>"+'负责人专业'+"</td><td width='5%'>：</td><td width='34%''><span class='infoFont'>"+(outHosList[i].leaderMajor==undefined?"":outHosList[i].leaderMajor)+"</span></td></tr>" +
                                "<tr><td width='60%'>"+'负责人院内任务'+"</td><td width='5%'>：</td><td width='34%''><span class='infoFont'>"+(outHosList[i].leaderTask==undefined?"":outHosList[i].leaderTask)+"</span></td></tr>" +
                                "<tr><td width='60%'>"+'联络员1'+"</td><td width='5%'>：</td><td width='34%''><span class='infoFont'>"+(outHosList[i].liaisononeName==undefined?"":outHosList[i].liaisononeName)+"</span></td></tr>" +
                                "<tr><td width='60%'>"+'联络员1专业'+"</td><td width='5%'>：</td><td width='34%''><span class='infoFont'>"+(outHosList[i].liaisononeMajor==undefined?"":outHosList[i].liaisononeMajor)+"</span></td></tr>" +
                                "<tr><td width='60%'>"+'联络员1院内任务'+"</td><td width='5%'>：</td><td width='34%''><span class='infoFont'>"+(outHosList[i].liaisononeTask==undefined?"":outHosList[i].liaisononeTask)+"</span></td></tr>" +
                                "<tr><td width='60%'>"+'联络员2'+"</td><td width='5%'>：</td><td width='34%''><span class='infoFont'>"+(outHosList[i].liaisontwoName==undefined?"":outHosList[i].liaisontwoName)+"</span></td></tr>" +
                                "<tr><td width='60%'>"+'联络员2专业'+"</td><td width='5%'>：</td><td width='34%''><span class='infoFont'>"+(outHosList[i].liaisontwoMajor==undefined?"":outHosList[i].liaisontwoMajor)+"</span></td></tr>" +
                                "<tr><td width='60%'>"+'联络员2院内任务'+"</td><td width='5%'>：</td><td width='34%''><span class='infoFont'>"+(outHosList[i].liaisontwoTask==undefined?"":outHosList[i].liaisontwoTask)+"</span></td></tr>";
                        }
                    }
                    $("#outTable").html("").append(outTrArr);
                    /*getCityContent(cities);*/
                     getDownCity(cities);
                    var oh=$("#outTable").height();
                    var ow=$("#outTable").width();
                    $("#outTable").css("margin-left",-ow/2).css("margin-top",-120);

                }
            });

        });
    }
})(jQuery);


function getRootPath() {
    var pathName = window.location.pathname.substring(1);
    var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
    return window.location.protocol + '//' + window.location.host + '/' + webName + '/';
}
