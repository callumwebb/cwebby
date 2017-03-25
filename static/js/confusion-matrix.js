
var  margin = {top: 15, right: 5, bottom: 5, left: 5},
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


var matMargin = {top:50, right:10, bottom:10, left:60},
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

var matLabels = matSvg.selectAll(".matLabel").append("text")

// Predicted labels
matSvg.append("text")
  .attr("transform", "translate(" + (matWidth / 2) + " ," + (- 2 * matMargin.top / 3) + ")")
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


// matrix contents
var matValue = matSvg.append("text").selectAll(".matValue")

matSvg.append("text")
  .attr("x", matWidth / 4.0)
  .attr("y", matHeight / 4.0)
  .style("text-anchor", "middle")
  .style("alignment-baseline", "middle")
  .text("tp");
matSvg.append("text")
  .attr("x", 3 * matWidth / 4.0)
  .attr("y", matHeight / 4.0)
  .style("text-anchor", "middle")
  .style("alignment-baseline", "middle")
  .text("fn");
matSvg.append("text")
  .attr("x", matWidth / 4.0)
  .attr("y", 3 * matHeight / 4.0)
  .style("text-anchor", "middle")
  .style("alignment-baseline", "middle")
  .text("foo");
matSvg.append("text")
  .attr("x", 3 * matWidth / 4.0)
  .attr("y", 3 * matHeight / 4.0)
  .style("text-anchor", "middle")
  .style("alignment-baseline", "middle")
  .text("tn");

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
  updateMatrix();
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
  clusters = [{x: (-width / 4), y: 0}, {x: (width / 4), y : 0}],
  matValues = {"tp" : null,
               "fp" : null,
               "tn" : null,
               "fn" : null};

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

function updateMatrix() {
  updateMatValues();

  matValue = matValue.data(matValues);
  matValue.exit().remove();
  matValue = matValue.enter().append("text").merge(matValue)
    .attr("class", "matValue")
    .attr("x", matWidth / 4.0)
    .attr("y", matHeight / 4.0)
    .style("text-anchor", "middle")
    .style("alignment-baseline", "middle")
    .text("weeee");
  // TODO: calculate membership of four categories from node data
  // TODO: update other quantities, like tp rate, specificity etc. Look into rendering of dynamic fractions
  // tp.text("a");
  // fp.text("a");
  // fn.text("a");
  // tn.text("a");
}

function updateMatValues() {
  matValues.tp = 0;
  matValues.fp = 0;
  matValues.tn = 0;
  matValues.fn = 0;

  for (var i = 0; i < nodes.length; i++) {
    switch (nodes[i].type) {
      case "raspberry": 
        nodes[i].label == "pos" ? matValues.tp++ : matValues.fn++;
        break;
      case "blueberry": 
        nodes[i].label == "neg" ? matValues.tn++ : matValues.fp++;
        break;
      default:
        console.log("unknown node type!");
        break;
    }
  }
  console.log(matValues)
}

restart();

