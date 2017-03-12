

var  margin = {top: 80, right: 40, bottom: 40, left: 80},
     width = 70,
     height = 70;

var svg = d3.select("figure.berryLabels").append("svg")
  .attr("viewBox", 0 + " " + 0 + " " + (width + margin.left + margin.right) + " " + (height + margin.bottom + margin.top))
  .attr("preserveAspectRatio", "xMidYMid meet")
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Predicted labels
svg.append("text")
  .attr("transform", "translate(" + (width / 2) + " ," + (- 2.5 * margin.top / 3) + ")")
  .style("text-anchor", "middle")
  .text("predicted");
svg.append("text")
  .attr("transform", "translate(0," + (-1.1 * margin.top / 2) + ")")
  .style("text-anchor", "middle")
  .style("alignment-baseline", "middle")
  .style("font-weight", "bold")
  .text("+");
svg.append("text")
  .attr("transform", "translate(" + width + "," + (-1.1 * margin.top / 2) + ")")
  .style("text-anchor", "middle")
  .style("alignment-baseline", "middle")
  .style("font-weight", "bold")
  .text("−");

// Actual labels
svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", - 2.5 * margin.left / 3)
  .attr("x", - height / 2)
  .style("text-anchor", "middle")
  .text("actual");
svg.append("text")
  .attr("x", 0 - 1.1 * margin.left / 2)
  .attr("y", 0)
  .style("text-anchor", "middle")
  .style("alignment-baseline", "middle")
  .style("font-weight", "bold")
  .text("+");
svg.append("text")
  .attr("x", 0 - 1.1 * margin.left / 2)
  .attr("y", height)
  .style("text-anchor", "middle")
  .style("alignment-baseline", "middle")
  .style("font-weight", "bold")
  .text("−");

// svg.selectAll("text")
//   .data([1, 1, 0, 0]) // 1s for '+'
//   .enter().append("text")
//   .attr("transform", function(d, i) {
//     return("translate(")
//   })

// svg.append("text")
//   .attr("transform", "translate(")
// svg.append("text")
//   .attr("transform", "rotate(-90)")
//   .attr("y", -40)
//   .attr("x", 0 - (height / 2))
//   .style("text-anchor", "middle")
//   .text("true positive rate");


var berryGroup = svg.selectAll("g")
  .data([1, 1, 0, 0]) // 1s for raspberries
  .enter().append("g")
    .attr("transform", function(d, i) {
      return ("translate(" + ((i % 2) * width) + ", " + ((1 - d) * height) + ")");
    })
  
berryGroup.append("circle") // the berry
    .attr("r", 15)
    .attr("class", function(d) {return (d == 1 ? "raspberry" : "blueberry")});

berryGroup.append("circle") // the label (perimeter circle)
    .attr("r", 22)
    .attr("class", function(d, i) {return ((i % 2) == 0 ? "pos" : "neg")});
