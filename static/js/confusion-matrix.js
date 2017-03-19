
var  margin = {top: 10, right: 5, bottom: 5, left: 5},
     width = 400,
     height = 190;

var berrySvg = d3.select("figure.berryClasses").append("svg")
  .attr("viewBox", 0 + " " + 0 + " " + (width + margin.left + margin.right) + " " + (height + margin.bottom + margin.top))
  .attr("preserveAspectRatio", "xMidYMid meet")
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var g = berrySvg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
    node = g.append("g").selectAll(".node");


var matMargin = {top:60, right:10, bottom:10, left:80},
    matWidth = 210;
    matHeight = 170;

var matSvg = d3.select("figure.berryMatrix").append("svg")
  .attr("viewBox", 0 + " " + 0 + " " + (matWidth + matMargin.left + matMargin.right) + " " + (matHeight + matMargin.bottom + matMargin.top))
  .attr("preserveAspectRatio", "xMidYMid meet")
  .append("g")
    .attr("transform",
          "translate(" + matMargin.left + "," + matMargin.top + ")");

var matRect = matSvg.append("rect")
  .attr("width", matWidth)
  .attr("height", matHeight)
  .attr("fill", "none")
  .attr("stroke", "black");

// Predicted labels
matSvg.append("text")
  .attr("transform", "translate(" + (matWidth / 2) + " ," + (- 2.5 * matMargin.top / 3) + ")")
  .style("text-anchor", "middle")
  .text("predicted");
matSvg.append("text")
  .attr("transform", "translate(" + (matWidth / 4) + "," + (- matMargin.top / 3) + ")")
  .style("text-anchor", "middle")
  .style("alignment-baseline", "middle")
  .style("font-weight", "bold")
  .text("+");
matSvg.append("text")
  .attr("transform", "translate(" + (3 * matWidth / 4) + "," + (- matMargin.top / 3) + ")")
  .style("text-anchor", "middle")
  .style("alignment-baseline", "middle")
  .style("font-weight", "bold")
  .text("−");

// Actual labels
matSvg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", - 2.5 * matMargin.left / 3)
  .attr("x", - matHeight / 2)
  .style("text-anchor", "middle")
  .text("actual");
matSvg.append("text")
  .attr("x", 0 - 1.1 * matMargin.left / 2)
  .attr("y", matHeight / 4)
  .style("text-anchor", "middle")
  .style("alignment-baseline", "middle")
  .style("font-weight", "bold")
  .text("+");
matSvg.append("text")
  .attr("x", 0 - 1.1 * matMargin.left / 2)
  .attr("y", 3 * matHeight / 4)
  .style("text-anchor", "middle")
  .style("alignment-baseline", "middle")
  .style("font-weight", "bold")
  .text("−");



// var matMargin = {top: 20, right: 20, bottom: 20, left: 60}
// var mat = berrySvg.append("g").attr("transform", "translate(" + matMargin.left + "," + (height / 2 + 20) + ")"); // 20px padding between berries and matrix
// var mat = mat.append("g").attr("transform", "translate(" + matMargin.left + "," + matMargin.top + ")");
// var mat2 = mat.append("g")
  // .attr("transform", "translate(20, 0)");


// Predicted labels
// mat.append("text")
//   .attr("transform", "translate(" + (width / 2 - matMargin.left) + " ," + (- 10) + ")")
//   .style("text-anchor", "middle")
//   .text("predicted");
// mat.append("text")
//   .attr("transform", "translate(" + (width / 4 - matMargin.left) + "," + 5 + ")")
//   .style("text-anchor", "middle")
//   .style("alignment-baseline", "middle")
//   .style("font-weight", "bold")
//   .text("+");
// mat.append("text")
//   .attr("transform", "translate(" + (3 * width / 4 - matMargin.left) + "," + 5 + ")")
//   .style("text-anchor", "middle")
//   .style("alignment-baseline", "middle")
//   .style("font-weight", "bold")
//   .text("−");

// Actual labels
// svg.append("text")
//   .attr("transform", "rotate(-90)")
//   .attr("y", - 2.5 * margin.left / 3)
//   .attr("x", - height / 2)
//   .style("text-anchor", "middle")
//   .text("actual");
// svg.append("text")
//   .attr("x", 0 - 1.1 * margin.left / 2)
//   .attr("y", 0)
//   .style("text-anchor", "middle")
//   .style("alignment-baseline", "middle")
//   .style("font-weight", "bold")
//   .text("+");
// svg.append("text")
//   .attr("x", 0 - 1.1 * margin.left / 2)
//   .attr("y", height)
//   .style("text-anchor", "middle")
//   .style("alignment-baseline", "middle")
//   .style("font-weight", "bold")
//   .text("−");

// mat.append("rect").attr("transform", "translate(0, 20)")
//   .attr("width", width - 60)
//   .attr("height", height / 2)
//   .attr("fill", "none")
//   .attr("stroke", "black");

berrySvg.append("text")
  .attr("x", width / 4)
  .attr("y", 0)
  .style("text-anchor", "middle")
  .style("alignment-baseline", "bottom")
  .text("blueberries");

berrySvg.append("text")
  .attr("x", 3 * width / 4)
  .attr("y", 0)
  .style("text-anchor", "middle")
  .text("raspberries");

function dragstarted(d) {
  d3.event.subject.fx = d3.event.subject.x;
  d3.event.subject.fy = d3.event.subject.y;
  d.label = d.label == "pos" ? "neg" : "pos";
  restart();
}

function dragged(d) {
  d3.event.subject.fx = d3.event.x;
  d3.event.subject.fy = d3.event.y;
}

function dragended(d) {
  d3.event.subject.fx = null;
  d3.event.subject.fy = null;
}

var nodes = [{"type" : "blueberry", "label" : "neg"}, 
             {"type" : "blueberry", "label" : "pos"}, 
             {"type" : "raspberry", "label" : "pos"}, 
             {"type" : "raspberry", "label" : "pos"}, 
             {"type" : "raspberry", "label" : "neg"},
             {"type" : "blueberry", "label" : "neg"}, 
             {"type" : "blueberry", "label" : "neg"}, 
             {"type" : "blueberry", "label" : "neg"}, 
             {"type" : "blueberry", "label" : "pos"}, 
             {"type" : "raspberry", "label" : "pos"}],
  clusters = [{x: (-width / 4), y: 0}, {x: (width / 4), y : 0}];

var forceX = d3.forceX((d) => clusters[d.label == "pos" ? 1 : 0].x).strength(0.02);
var forceY = d3.forceY((d) => clusters[d.label == "pos" ? 1 : 0].y).strength(0.02);

var simulation = d3.forceSimulation(nodes)
  .velocityDecay(0.1)
  .force("collide", d3.forceCollide(25).iterations(2))
  .force('x', forceX)
  .force('y', forceY)
  .alphaTarget(1)
  .on("tick", ticked)

function dragsubject() {
  return simulation.find(d3.event.x, d3.event.y);
}

function restart() { 
  // apply general update pattern to nodes
  node = node.data(nodes);
  node.exit().remove();
  node = node.enter().append("g").merge(node)
    .attr("class", "node")
    .call(d3.drag()
      .subject(dragsubject)
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  node.selectAll("circle").remove();
  node.append("circle").attr("r",  15).attr("class", function(d) {return d.type});
  node.append("circle").attr("r",  22).attr("class", function(d) {return d.label});

  // update and restart the simulation.
  simulation.nodes(nodes);
  simulation.alpha(1).restart();
}

function ticked() {
  node.attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"})
}

restart();

