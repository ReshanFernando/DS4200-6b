//scatter plot code from Aditeya's tutorial and from
// https://www.d3-graph-gallery.com/graph/scatter_basic.html

// set the dimensions and margins of the graph
var svg = d3.select("#scatter"),
margin = {top: 10, right: 30, bottom: 30, left: 60},
width = +svg.attr("width") - margin.left - margin.right,
height = +svg.attr("height") - margin.top - margin.bottom;

//appends svg object to page
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

// Add X axis
var x = d3.scaleLinear().domain([42.23, 42.4]).range([0, width]);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
// Add Y axis
var y = d3.scaleLinear().domain([-71.0, -71.20]).range([height, 0]);  
svg.append("g")
    .call(d3.axisLeft(y));

//Read the data
d3.csv(
    "scatter.csv"
  ).then((data) => {
    showVisMouseover(data, "scatter");
  });
  const colors = d3.scaleOrdinal()
  .range(d3.schemeCategory10);
  function showVisMouseover(data, id) {
    var svg = d3
      .select("#" + id)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    //Append X and Y axis
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
  
    svg.append("g").call(d3.axisLeft(y));
    svg.append("text") //text label for x axis
        .attr("transform", "translate(" + (width/ 2) + " ," + (height + margin.bottom) + ")")
        .style("text-anchor", "middle")
        .text("Longitude");

    svg.append("text")//text label for y axis
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Latitude");  

    // Add dots
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(d.latitude);
      })
      .attr("cy", function (d) {
        return y(d.longitude);
      })
      .attr("r", 7)
      .style("fill", d => colors(d.subject))
      .style("opacity", 1)
      .style("stroke", "white")
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);
  
      
    // A function that change this tooltip when the user hovers a point.
    function mouseover(event, d) {
      d3.select(this).style("fill", "red");
      tooltip
        .html("Subject: " + d.subject)
        .style("left", event.pageX + "px")
        .style("top", event.pageY + "px")
        .style("display", "");
    }
  
    // A function that change this tooltip when the mouse pointer leaves
    //Style display is set to "none" to hide the tooltip
    function mouseout() {
      d3.select(this).style("fill", d => colors(d.subject));
      tooltip.style("display", "none");
    }
  
    //tooltip div
    var tooltip = d3
      .select("#" + id)
      .append("div")
      .style("display", "none")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px");
  }  


