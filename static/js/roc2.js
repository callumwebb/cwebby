

// dimensions and margins
// note that the width and height represent the dimensions of the plotting area.
// margins are added around the plotting area.
var  margin = {top: 5, right: 10, bottom: 30, left: 30},
     width = 260,
     height = 260

// Example ROC plot
var svg = d3.select("figure.roc-example").append("svg")
  // .attr("viewBox", margin.left + " " + margin.left + " " + width + " " + height )
  // .attr("viewBox", 0 + " " + (-margin.top - margin.bottom) + " " + (width + margin.left + margin.right) + " " + (height + margin.bottom + margin.top))
  .attr("viewBox", 0 + " " + 0 + " " + (width + margin.left + margin.right) + " " + (height + margin.bottom + margin.top))
  .attr("preserveAspectRatio", "xMidYMid meet")
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// svg.append("circle")
//     .attr("r", 10)
//     .attr("cx", 0)
//     .attr("cy", height);

var xROC = d3.scaleLinear().domain([0, 1])
  .range([0, width]);

var yROC = d3.scaleLinear().domain([0, 1])
  .range([height, 0])
  // .range([height - margin.bottom - margin.top, height - margin.bottom - margin.top - width / 2]);

var yROCAxis = d3.axisLeft(yROC);

// add the ROC axes
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xROC));
svg.append("g")
  .call(yROCAxis);
