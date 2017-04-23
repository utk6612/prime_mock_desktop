import React from 'react';
import ReactDOM from 'react-dom';
import { WindowResizeListener } from 'react-window-resize-listener';
import * as links from '../commonComponents/app.config'
var BarStackHorizontalChart = require('react-d3-basic').BarStackHorizontalChart;
var Legend = require('react-d3-core').Legend;

class ChartComponent extends React.Component{

    constructor(props){
        super(props);
        this.width;
        this.legendWidth;
    }
    componentDidMount(){
        this.props.getOrders(links.orders);
    }


    changeWidth(windowSize){

         if(windowSize.windowWidth < 500){
            this.width = windowSize.windowWidth;
            this.legendWidth=this.width*0.35;
            
        }          
        else if (windowSize.windowWidth <= 768 && windowSize.windowWidth >= 500) {
            this.width = windowSize.windowWidth;
            this.legendWidth=this.width*0.237;
        }
        else if(windowSize.windowWidth < 998){
            this.width = windowSize.windowWidth-150;
            this.legendWidth=this.width;
            
        }
     
        else {
            this.width = windowSize.windowWidth;
            this.legendWidth=this.width*0.5;
            
        }
        this.setState({});
    }

    
  

    render(){
        var data=[];
        var count=0;
        var height=50;
        var chartData=this.props.orders.map((item,index)=>{

            var id=item.id;
            var qplaced=item.quantityPlaced-item.quantityExecuted;
            var Executed=(item.quantityExecuted/item.quantity);
            var Placed=(qplaced/item.quantity);
            var Total=1-Executed-Placed;
            data.push({id,Executed,Placed,Total});
            height+=50;
            count++;
        });

        var chartSeries  = [
            {
            color:'#FF8000',            
            field: 'Executed',
            name: 'Executed'            
           },
            {
            color:'#FEBB68',            
            field: 'Placed',
            name: 'Placed'            
            },
            {
            color:'#FFEFBF',            
            field: 'Total',
            name: 'Total Order'             
            }
        ];
        var y = function(d) {
            return d.id;
        },
        x = function(d) {
            return +d;
        },
        width=this.width,
        legendWidth=this.legendWidth,
        legendClassName = "test-legend",
        legendPosition = 'left',
        yScale = "ordinal",
        yLabel = 'Order Id',
        showYGrid = false,
        xOrient = 'top',
        xTickOrient = 'top',
        yOrient="right",
        legendOffset=0,
        xTickFormat = d3.format("%"),
        xTicks=[2,"%"],
        showLegend=false,
        yTicks=[y,"%"];
        if(this.props.orders.length)   
            return (
                
                <div>
                    <h1 className="text-center fontColor">Order Execution Status</h1>
                <WindowResizeListener onResize={this.changeWidth.bind(this)}/>
                    
                    <div className="container col-xs-12 chart">
                     <div className="col-md-6 col-xs-12">
                    <Legend
                        width= {legendWidth}
                        height= {150}
                        legendClassName= {legendClassName}
                        legendPosition= {legendPosition}
                        legendOffset= {legendOffset}
                        chartSeries = {chartSeries}
                    />
                    </div> 
                <div className="col-xs-12">
                    <BarStackHorizontalChart
                        title=''
                        data={data}
                        chartSeries={chartSeries}
                        width={width}
                        height={height}
                        showYGrid={showYGrid}
                        xOrient={xOrient}
                        yOrient={yOrient}
                        yScale={yScale}
                        yLabel={yLabel}
                        y={y}
                        x={x}
                        xTicks={xTicks}
                        yTicks={yTicks}
                        xTickFormat={xTickFormat}
                        legendClassName = {legendClassName}
                        legendPosition= {legendPosition}
                        showLegend={showLegend}
                    /></div>
                   
                    </div>
                </div>
        )
        else
        return(
            <div className="backgroundColor">
            <h1 className="text-center">
                There is no data to display!
                </h1></div>
        )
    }
};


export default ChartComponent;