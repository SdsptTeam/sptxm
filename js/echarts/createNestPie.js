function createNestPie(divId,dataTemp){
	var option1 = {
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient : 'vertical',
		        x : 'left',
		        data:dataTemp.legendData
		    },
		    calculable : false,
		    series : [
		        {
		            name:dataTemp.pies[0].name,
		            type:'pie',
		            selectedMode: 'single',
		            radius : dataTemp.pies[0].radius,
		            
		            // for funnel
		            x: '20%',
		            width: '40%',
		            funnelAlign: 'right',
		            max: 1548,
		            
		            itemStyle : {
		                normal : {
		                    label : {
		                        position : 'inner'
		                    },
		                    labelLine : {
		                        show : false
		                    }
		                }
		            },
		            data:dataTemp.pies[0].data
		        },
		        {
		            name:dataTemp.pies[1].name,
		            type:'pie',
		            radius : dataTemp.pies[1].radius,
		            
		            // for funnel
		            x: '60%',
		            width: '35%',
		            funnelAlign: 'left',
		            max: 1048,
		            
		            data:dataTemp.pies[1].data
		        }
		    ]
		};
	
	// 路径配置
    require.config({
        paths: {
            echarts: './js/echarts/dist'
        }
    });
    
    
    // 使用
    require(
        [
            'echarts',
            'echarts/chart/pie'
        ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById(divId)); 
            myChart.setOption(option1); 
        }
    );
    
                    
}		
	
	