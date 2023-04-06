import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';


export default function BarChart(dataChart) {
    const svgRef = useRef(null);
    const { chartData } = dataChart
    const data = chartData

    useEffect(() => {
        const margin = { top: 20, right: 20, bottom: 40, left: 80 };
        const width = 1000 - margin.left - margin.right;
        const height = 650 - margin.top - margin.bottom;

        const x = d3.scaleBand()
            .range([0, width])
            .padding(0.1)
            .domain(data.map(d => d.year));
    
        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(data, d => d.payout)]);
    
        const svg = d3.select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
    
        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.year))
            .attr('y', d => y(d.payout))
            .attr('width', x.bandwidth())
            .attr('height', d => height - y(d.payout));

        const yAxis = d3.axisLeft(y);
        svg.append('g')
            .attr('class', 'y-axis')
            .call(yAxis);

        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -(height / 2))
            .attr('y', -margin.left)
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text('Value');

        const xAxis = d3.axisBottom(x);
        svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${height})`)
            .call(xAxis);

        svg.append('text')
            .attr('x', width / 2)
            .attr('y', height + margin.bottom / 2)
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text('Payout');
    
        // svg.append('g')
        // .attr('transform', `translate(0,${height})`)
        // .call(d3.axisBottom(x));

    }, [chartData]);
  
    return (
        data.length > 0 ?<svg ref={svgRef}></svg> : <></>
    );
}
