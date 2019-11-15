import React from 'react';
import * as d3 from “d3”
export class BarChart extends React.Component {
    componentDidMount() {
      this.drawChart();
    }
      
    drawChart() {
      const data = [12, 5, 6, 6, 9, 10];
      const w = 500;
      const h = 100;
      const svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style("margin-left", 100);
                    
      svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", 25)
        .attr("height", (d)=>{
            return d
        })
    }
          
    render(){
      return <div></div>
    }
  }
    