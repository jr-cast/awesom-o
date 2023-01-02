import React from 'react'
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

export function DonutChart(props) {

  let options = {...props.options };
  options.responsive = true;
  options.maintainAspectRatio = false;
  options.scales.yAxis.ticks.display = false; 
  options.scales.xAxis.ticks.display = false;
  options.scales.xAxis.display = false;
  options.scales.yAxis.display = false;

  return <Chart type='doughnut' data={ props.data } options={ options } />

}
