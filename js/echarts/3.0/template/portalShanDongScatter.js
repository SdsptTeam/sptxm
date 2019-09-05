// ECharts 山东地图
;
var shandongMapUrl = "../static/js/echarts/3.0/map/shandong.js";
document.write('<script src="'+shandongMapUrl+'"><\/script>');

(function($) {
    $.fn.portalShanDongMap = function(options) {
        return this.each(function() {
            var domId = $(this).attr("id");		//获取jsp页面ID
            var myChart = echarts.init(document.getElementById(domId));  //创建echarts容器
            var data = []
            var toolTipData = [];

            var staticDate = options.staticDate;
            var applyingDate = options.applyingDate;
            var flashData = options.flashData;
            var outHosList = options.outHosList;

            var option = {
                legend: {
                    right: 'right',
                    data: ['未申请', '申请中', '已申请'],
                    show:true,
                    textStyle:{//图例文字的样式
                        color:['#cad1cd','#e5a729','#0ae547']
                    }
                },
                tooltip: {
//                    show: false //不显示提示标签
                    trigger: 'item',
                    formatter: '{b}', //提示标签格式
                    backgroundColor:"#c5f80e",//提示标签背景颜色
                    textStyle:{color:"#fff"} //提示标签字体颜色

                },
                geo: {
                    map: '山东',
                    label: {
                        normal: {
                            show: true,//显示省份标签
                            textStyle:{color:"#c5f80e"}//省份标签字体颜色
                        },
                        emphasis: {//对应的鼠标悬浮效果
                            show: true,
                            textStyle:{color:"#fff"}
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            borderWidth: 1,//区域边框宽度
                            borderColor: 'rgba(147, 235, 248, 1)',//区域边框颜色
                            areaColor: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(175,238,238, 0)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgba(47,79,79, .1)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            },
                            shadowColor: 'rgba(128, 217, 248, 1)',
                            shadowOffsetX: -2,
                            shadowOffsetY: 2,
                            shadowBlur: 10
                        },
                        emphasis: {
                            areaColor: '#389BB7',
                            borderWidth: 0
                        }
                    },
                    layoutCenter: ['46%', '50%'],
                    layoutSize: '80%'
                },
                series: [
                    {
                        type: 'effectScatter',
                        name: '未申请',
                        coordinateSystem: 'geo',
                        data: staticDate,
                        symbolSize: function (val) {
                            return val[2] / 100;
                        },
                        //roam:true,

                        itemStyle: {
                            normal: {
                                color: '#cad1cd',
                                shadowBlur: 10,
                                shadowColor: '#fff'
                            }
                        },
                        zlevel: 1
                    },{
                        type: 'effectScatter',
                        name: '申请中',
                        coordinateSystem: 'geo',
                        data: applyingDate,
                        symbolSize: function (val) {
                            return val[2] / 100;
                        },
                        //roam:true,

                        itemStyle: {
                            normal: {
                                color: '#e5a729',
                                shadowBlur: 10,
                                shadowColor: '#fff'
                            }
                        },
                        zlevel: 1
                    },{
                        type: 'effectScatter',
                        name: '已申请',
                        coordinateSystem: 'geo',
                        data: flashData,
                        symbolSize: function (val) {
                            return val[2] / 100;
                        },
                        //roam:true,

                        itemStyle: {
                            normal: {
                                color: '#0ae547',
                                shadowBlur: 10,
                                shadowColor: '#fff'
                            }
                        },
                        zlevel: 1
                    }
                ]

            };

            myChart.setOption(option);
            //自适应
          	window.onresize = function(){
                myChart.resize();
		  	}

            myChart.on('click', function (params) {//点击事件
                var pname = params.name;

                for(var i=0;i<outHosList.length;i++){
                    if(pname == outHosList[i].orgName){
                        pname = outHosList[i].cities;
                    }
                }

                if (params.componentType === 'series') {
                    var provinceName =params.name;

                    var outTrArr="";
                    var appSta = "";
                    for(var i=0;i<outHosList.length;i++){
                        if(provinceName == outHosList[i].orgName){
                            appSta = outHosList[i].applicationStatus;
                            if(appSta == 0){
                                div1=document.getElementById('chart_1');
                                div1.style.color='#cad1cd';
                            };
                            if(appSta == 1){
                                div1=document.getElementById('chart_1');
                                div1.style.color='#e5a729';
                            };
                            if(appSta == 2){
                                div1=document.getElementById('chart_1');
                                div1.style.color='#35e539';
                            };

                            outTrArr=outTrArr+"<tr><td width='60%'>"+outHosList[i].orgName+"</td><td width='5%'>：</td><td width='34%''><span class='infoFont'>"+100+"</span>人</td></tr>" +
                                "<tr><td width='60%'>"+'医院类别'+"</td><td width='5%'>：</td><td width='34%''><span class='infoFont'>"+(outHosList[i].orgCategory==undefined?"":outHosList[i].orgCategory)+"</span></td></tr>" +
                                "<tr><td width='60%'>"+'负责人'+"</td><td width='5%'>：</td><td width='34%''><span class='infoFont'>"+(outHosList[i].leaderName==undefined?"":outHosList[i].leaderName)+"</span></td></tr>" +
                                "<tr><td width='60%'>"+'负责人专业'+"</td><td width='5%'>：</td><td width='34%''><span class='infoFont'>"+(outHosList[i].leaderMajor==undefined?"":outHosList[i].leaderMajor)+"</span></td></tr>" +
                                "<tr><td width='60%'>"+'负责人院内任务'+"</td><td width='5%'>：</td><td width='34%''><span class='infoFont'>"+(outHosList[i].leaderTask==undefined?"":outHosList[i].leaderTask)+"</span></td></tr>" +
                                "<tr><td width='60%'>"+'联络员1'+"</td><td width='5%'>：</td><td width='34%''><span class='infoFont'>"+(outHosList[i].liaisononeName==undefined?"":outHosList[i].liaisononeName)+"</span></td></tr>" +
                                "<tr><td width='60%'>"+'联络员1专业'+"</td><td width='5%'>：</td><td width='34%''><span class='infoFont'>"+(outHosList[i].liaisononeMajor==undefined?"":outHosList[i].liaisononeMajor)+"</span></td></tr>" +
                                "<tr><td width='60%'>"+'联络员1院内任务'+"</td><td width='5%'>：</td><td width='34%''><span class='infoFont'>"+(outHosList[i].liaisononeTask==undefined?"":outHosList[i].liaisononeTask)+"</span></td></tr>";
                        }
                    }
                    $("#chart_1").html("").append(outTrArr);


                    var oh=$("#chart_1").height();
                    var ow=$("#chart_1").width();
                    $("#chart_1").css("margin-left",30).css("margin-top",8);

                }
                getCityContent(pname);
            });

        });
    }
})(jQuery);


function getRootPath() {
    var pathName = window.location.pathname.substring(1);
    var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
    return window.location.protocol + '//' + window.location.host + '/' + webName + '/';
}
