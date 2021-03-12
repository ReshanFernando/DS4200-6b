// set the dimensions and margins of the graph
var svg = d3.select("#horizontal"),
margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 600 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#horizontal")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
 
// Add axes
  var x = d3.scaleLinear().range([0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  var y = d3.scaleBand().range([height, 0]);
  svg.append("g")
  .call(d3.axisLeft(y));


//read data
d3.csv("horizontal.csv", function(error, data) {
    if (error) {
        throw error;
    }
yScale.domain(data.map(function(d) {return d.Subject; }));
xScale.domain([0, d3.max(data, function(d) {return d.Incidents; })]);

    g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisLeft(yScale));

        g.append("g")
         .call(d3.axisBottom(xScale).tickFormat(function(d){
             return d;
         }).ticks(10));

  //Bars
  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", x(0))
    .attr("y", function(d) { return y(d.Subject); })
    .attr("width", function(d) { return x(d.Incidents); })
    .attr("height", y.bandwidth() )
    .attr("fill", "#69b3a2")

})