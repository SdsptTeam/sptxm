// Echarts 环形图
;
(function($){
	$.fn.resourceDataCharts = function(options){
		return $(this).each(function(){
			var domId = $(this).attr("id");
			var myChart = echarts.init(document.getElementById(domId));
			var mainData = options.mainData;
			var titleText = options.title;
			function createSeries(mainData){
			    var result = [];
			    var insideLabel = {
			        normal: {
			            position: 'center',
			            formatter: function(params) {
			                if (params.name == "other")
			                    return "";
			                return params.value + '\n' + params.name;
			            },
			            textStyle: {
			                fontStyle: 'normal',
			                fontWeight: 'normal',
			                fontSize: 18
			            }
			        }
			    };
			    var outsideLabel = {
			        normal: {
			            show: false
			        }
			    };
			    var itemOthers = {
			        normal: {
			            color: '#ccc'
			        }
			    };
			    for (var i = 0; i < mainData.length; i++) {
			    		var increase = mainData[i].value > mainData[i].prevalue;
			        result.push({
			            type: 'pie',
			            center: [i * 20 + 20 + '%', '50%'],
			            radius: ['30%', '18%'],
			            label: insideLabel,
			            data: [{
			                name: 'other',
			                value: mainData[i].hismax - mainData[i].value,
			                itemStyle: itemOthers
			            }, {
			                name: mainData[i].name,
			                value: mainData[i].value,
			                prevalue: mainData[i].prevalue
			            }],
			        
			        });
			    }
			    return result;
			}
			option = {
			    title: {
			        text: titleText,
			        //subtext: '',
			        x: 'left'
			    },
			    
			    series: createSeries(mainData)
			}
			
			myChart.setOption(option);
			window.addEventListener("resize",function(){
			 	 myChart.resize();   
			});
		});
	}
})(jQuery);