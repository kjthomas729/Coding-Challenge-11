// Sample data
const data = [100, 420, 230, 850, 560, 925];

// SVG dimensions
const width = 500;
const barHeight = 20;
const margin = 1;
const height = data.length * (barHeight + margin);

// Append SVG container
const svg = d3.select("#chart")
    .attr("width", width)
    .attr("height", height);

// X scale
const xScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, width]);

// Create bars
svg.selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(0, ${i * (barHeight + margin)})`)
    .append("rect")
    .attr("width", 0)
    .attr("height", barHeight)
    .transition()
    .duration(800)
    .attr("width", d => xScale(d))
    .attr("fill", "steelblue");

// Add labels
svg.selectAll("g")
    .append("text")
    .attr("x", d => xScale(d) - 5)
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .text(d => d);

// Hover effect
svg.selectAll("rect")
    .on("mouseover", function() {
        d3.select(this).attr("fill", "orange");
    })
    .on("mouseout", function() {
        d3.select(this).attr("fill", "steelblue");
    });