import React, { Component } from 'react';
import * as d3 from "d3";

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

class Chart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.svg = d3.select(this.svgElem);
    const width = +this.svg.attr("width");
    const height = +this.svg.attr("height");

    let margin = 5;
    this.x = d3.scaleLinear()
        .domain([0, 100])
        .range([margin, width - margin]);
    this.y = d3.scaleLinear()
        .domain([0, 0.04])
        .range([height - margin, margin]);
    this.path = this.svg.append("path");

    this.drawChart();
  }

  componentWillReceiveProps(nextProps) {
    this.drawChart();
  }

  shouldComponentUpdate() {
    return false;
  }

  getDensity() {
    return kernelDensityEstimator(kernelEpanechnikov(5), this.x.ticks(40))(this.props.data);
  }

  drawChart() {
    this.line = d3.line()
        .curve(d3.curveBasis)
        .x((d) => { return this.x(d[0]); })
        .y((d) => { return this.y(d[1]); });

    this.path
        .datum(this.getDensity())
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("d", this.line);
  }

  render() {
    return (
      <svg ref={(elem) => { this.svgElem = elem; }} width="300" height="100" viewBox="0 0 300 100" />
    );
  }
}

export default Chart;
