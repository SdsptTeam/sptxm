function createGauge(divId,dataTemp){
	
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
            'echarts/chart/gauge'
        ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById(divId)); 
            myChart.setOption(option1); 
        }
    );
    
    var option1 = {
    tooltip : {
        formatter: "{a} <br/>{b} : {c}%"
    },
    series : [
        {
        	radius:[0,'100%'],
            name:'业务指标',
            type:'gauge',
            splitNumber: 10,       // 分割段数，默认为5
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[0.1, '#228b22'],[0.9, '#ff7f50'],[1, '#ff7f50']],  
                    width: 5
                }
            },
            axisTick: {            // 坐标轴小标记
                splitNumber: 10,   // 每份split细分多少段
                length :0,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto'
                }
            },
            splitLine: {           // 分隔线
                show: true,        // 默认显示，属性show控制显示与否
                length :10,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            pointer : {
                width : 3
            },
            title : {
                show : true,
                offsetCenter: [0, '-40%'],       // x, y，单位px
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder'
                }
            },
            detail : {
                formatter:'{value}',
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto',
                    fontWeight: 'bolder',
                    fontSize : 20
                }
            },
            data:[{name:"" ,value: 0}]
        }
    ]
};
    option1.series[0].data[0].value = dataTemp;
	if(divId == 'left2'){
		option1.series[0].detail.formatter='{value}%';
	}
	if(divId == 'right1'){
		option1.series[0].max = 500;
	}
	if(divId == 'right2'){
		option1.series[0].max = 5000;
	}
}		
	
	