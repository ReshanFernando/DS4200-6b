// set the dimensions and margins of the graph
var svg = d3.select("#linechart"),
margin = {top: 10, right: 30, bottom: 30, left: 60},
width = +svg.attr("width") - margin.left - margin.right,
height = +svg.attr("height") - margin.top - margin.bottom;

//appends svg object to page
var svg = d3.select("#linechart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
var x = d3.scaleTime().range([0, width]);
  // Append the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
      
var y = d3.scaleLinear().range([height, 0]);

  // Append the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

// define the 1st line
var valueline = d3.line()
    .x(function(d) { return x(d.day); })
    .y(function(d) { return y(d.Parks); });

// define the 2nd line
var valueline2 = d3.line()
    .x(function(d) { return x(d.day); })
    .y(function(d) { return y(d.Inspectional); });




// Get the data
d3.csv("linechart.csv").then(function(data) {

  // format the data
  data.forEach(function(d) {
      d.day = parseTime(d.day);
      d.Parks = +d.Parks;
      d.Inspectional = +d.Inspectional;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) {
	  return Math.max(d.Parks, d.Inspectional); })]);

  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  // Add the valueline2 path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke", "red")
      .attr("d", valueline2);



});