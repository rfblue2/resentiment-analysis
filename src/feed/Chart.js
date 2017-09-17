import React, { Component } from 'react';
import * as d3 from "d3";

class Chart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  shouldComponentUpdate() {
    return false;
  }

  drawChart() {
    const data = this.props.data;
    var svg = d3.select(this.svg),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var x = d3.scaleLinear()
        .domain([30, 110])
        .range([0, width]);

    var y = d3.scaleLinear()
        .domain([0, 0.1])
        .range([height, 0]);

    var density = kernelDensityEstimator(kernelEpanechnikov(5), x.ticks(40))(data);

    svg.append("path")
        .datum(density)
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("d",  d3.line()
            .curve(d3.curveBasis)
            .x(function(d) { return x(d[0]); })
            .y(function(d) { return y(d[1]); }));

    function kernelDensityEstimator(kernel, X) {
      return function(V) {
        return X.map(function(x) {
          return [x, d3.mean(V, function(v) { return kernel(x - v); })];
        });
      };
    }

    function kernelEpanechnikov(k) {
      return function(v) {
        return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
      };
    }
  }

  render() {
    return (
      <svg ref={(elem) => { this.svg = elem; }} width={this.props.chartWidth || "200"} height={this.props.chartHeight || "200"} />
    );
  }
}

export default Chart;
