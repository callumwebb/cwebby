

// dimensions and margins
// note that the width and height represent the dimensions of the plotting area.
// margins are added around the plotting area.
var  margin = {top: 5, right: 10, bottom: 50, left: 60},
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

// and axis labels
svg.append("text")
  .attr("transform", "translate(" + (width / 2) + " ," +
                      (height + 40) + ")")
  .style("text-anchor", "middle")
  .text("false positive rate");
svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", -40)
  .attr("x", 0 - (height / 2))
  .style("text-anchor", "middle")
  .text("true positive rate");